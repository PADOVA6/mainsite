// Eseguito automaticamente dopo `npm run build`.
// Usa la pagina "non trovata" pre-renderizzata come 404.html, che Cloudflare serve
// per gli indirizzi inesistenti (wrangler.jsonc: "not_found_handling": "404-page").
import { copyFileSync } from 'node:fs';

const out = 'dist/client/browser';
copyFileSync(`${out}/page-not-found/index.html`, `${out}/404.html`);
console.log(`404.html creato in ${out}`);
