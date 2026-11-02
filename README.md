# mainsite
Sito pd6.it

L'applicazione Angular si trova in [client](client). Per avvio, build e
organizzazione dei componenti consultare la [documentazione del client](client/README.md).

## Pubblicazione

Il sito è pubblicato su Cloudflare Workers (static assets) e viene compilato da Cloudflare:
nel repository c'è solo il codice sorgente, l'output del build non va committato.

- Ogni modifica passa da una pull request verso `main`. Cloudflare compila il branch e
  pubblica un'anteprima, il cui link compare nei controlli della PR.
- Dopo il merge su `main`, Cloudflare compila e pubblica pd6.it automaticamente.
- Build command (impostato nella dashboard Cloudflare, Settings → Build):
  `cd client && npm ci && npm run build`. Il deploy usa [wrangler.jsonc](wrangler.jsonc).
- Chiavi API e altri segreti vanno nelle variabili/segreti di Cloudflare, mai nel repository.
