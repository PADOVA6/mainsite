# Note per chi lavora sul sito con Claude

Contesto e regole di lavoro per le sessioni di Claude (e utili a chiunque). I dettagli tecnici
sono nel [README](README.md); qui c'è quello che serve ricordare tra una sessione e l'altra.

## Il progetto

- Sito di AGESCI Gruppo Padova 6 APS su https://pd6.it, repository pubblico `PADOVA6/mainsite`.
- Angular 21 con PrimeNG, Tailwind e Transloco (it/en), pre-renderizzato in HTML statico e servito
  da Cloudflare Workers (static assets). Cloudflare fa il build a ogni push (`wrangler.jsonc`).
- Pagine: `/`, `/chi-siamo`, `/missione`, `/cammino`, `/contatti`, più la pagina "non trovata".
- Il responsabile del progetto è Fabio; Davide Chigliaro contribuisce.
- Il sito serve anche per l'attivazione di Google Workspace for Nonprofits: Google ha chiesto un
  sito con più pagine complete. Niente pagine "in costruzione" né testi segnaposto (lorem ipsum).

## Flusso di lavoro

- `main` è protetto: ogni modifica passa da una pull request, che Fabio rivede e unisce.
- Si parte sempre da un branch nuovo creato da `origin/main` aggiornato.
- **Prima di aggiungere commit a una PR esistente, controllare che sia ancora aperta**
  (`gh api repos/PADOVA6/mainsite/pulls/<numero> --jq .state`). Se è già stata unita o chiusa,
  si apre una PR nuova da `main`.
- Descrizioni delle PR in italiano. Ogni PR genera un'anteprima su Cloudflare: il link è nei
  dettagli del controllo "Workers Builds: mainsite".
- Prima di aprire la PR: `npm run build` in `client/`, poi verifica in tema chiaro, tema scuro e
  su mobile, anche in inglese (per esempio con Playwright su `npx wrangler dev`).

## Aggiungere una pagina

1. Componente in `client/src/app/pages/`, route con `title` in `client/src/app/app.routes.ts`.
2. **Indirizzo in `client/public/sitemap.xml`, con la barra finale** (`https://pd6.it/pagina/`).
3. Link nella navbar (`layout/site-navbar`) e, se ha senso, scheda nella home (`home-intro`).
4. Testi in `client/public/i18n/it.json` e `en.json`, con le stesse chiavi.

## Contenuti

- Non inventare fatti sul gruppo. Le fonti usate finora: quello che dice Fabio, la
  [pagina del gruppo su ScoutWiki](https://it.scoutwiki.org/Padova_6_AGESCI) per storia, sestiglie
  e squadriglie, il Regolamento metodologico e il Patto associativo AGESCI per valori, Legge,
  Promessa e motti. Se un'informazione manca (per esempio come funzionano le iscrizioni), resta
  fuori dal sito.
- Per ora niente sezione foto: in futuro ci sarà una bacheca dove gli admin fissano le foto.
- Il footer (dati legali) resta in italiano anche nella versione inglese.

## Stile e codice

- Identità visiva AGESCI: font Roboto (400 e 700); colori in variabili CSS in
  `client/src/styles.css`, con le versioni per il tema scuro. La "corda" usa i colori del gruppo
  (`--giallo-gruppo`, `--blu-gruppo`).
- Pagine interne: testata `testata-pagina` (h1 e `lead`), poi la corda, poi le sezioni
  (`sezione`, alternate con `sezione--lavanda`), schede `scheda` e `griglia`.
- Animazioni: `appRevealOnScroll` con le classi `anima` o `anima-figli` (vedi README). Il
  contenuto deve restare visibile senza JavaScript e con il movimento ridotto.
- Il codice gira anche durante la pre-renderizzazione: niente `window`, `localStorage` o
  `matchMedia` diretti (vedi README, "Pre-renderizzazione").
- Repository pubblico: mai segreti o chiavi nel codice.
