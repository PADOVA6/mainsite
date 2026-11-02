import fs from 'node:fs';
import path from 'node:path';
import { exec } from 'node:child_process';

function _exec(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout) => {
      if (error) {
        reject(error);
      }
      resolve(stdout);
    });
  });
}

(async function () {
  try {
    const currentDir = process.cwd();
    console.log('Current directory:', currentDir);

    console.log('Building project...');
    await _exec('ng build --output-path docs --base-href /');
    console.log('Built, ready to deploy');
    // Con la pre-renderizzazione la 404 deve essere la pagina "non trovata", non la home:
    // altrimenti l'HTML servito non corrisponde alla pagina che Angular idrata.
    const notFoundPage = 'docs/browser/page-not-found/index.html';
    fs.copyFileSync(
      fs.existsSync(notFoundPage) ? notFoundPage : 'docs/browser/index.html',
      'docs/browser/404.html',
    );
    console.log('Files copied');
    const targetDocsDir = path.join(currentDir, '..', 'docs');
    if (fs.existsSync(targetDocsDir)) {
      fs.rmSync(targetDocsDir, { recursive: true, force: true });
    }
    console.log('Removed old deployment');
    fs.cpSync('docs/browser', targetDocsDir, {
      recursive: true,
    });
    console.log('Successfully moved new deployment to root');
  } catch (err) {
    console.error('Errore durante il deploy:', err);
    process.exit(1);
  }
})();
