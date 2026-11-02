# pd6.it

Sito del gruppo scout AGESCI Padova 6 (AGESCI Gruppo Padova 6 APS), pubblicato su
[pd6.it](https://pd6.it).

- **Applicazione:** Angular 21 con componenti standalone, PrimeNG, Tailwind CSS 4 e Transloco
  per le traduzioni (italiano e inglese).
- **Rendering:** le pagine sono pre-renderizzate in fase di build. Il visitatore riceve HTML già
  completo, che Angular poi "idrata" nel browser per renderlo interattivo.
- **Hosting:** Cloudflare Workers (static assets). Cloudflare compila e pubblica il sito a ogni
  push su `main` e crea un'anteprima per ogni pull request.

Nel repository c'è solo il codice sorgente: il sito compilato non va mai committato.

## Indice

- [Struttura del repository](#struttura-del-repository)
- [Struttura del sito](#struttura-del-sito)
- [Sviluppo in locale](#sviluppo-in-locale)
- [Build](#build)
- [Come contribuire](#come-contribuire)
- [Testi e traduzioni](#testi-e-traduzioni)
- [Pubblicazione](#pubblicazione)
- [Pre-renderizzazione: cosa tenere presente](#pre-renderizzazione-cosa-tenere-presente)
- [Segreti e chiavi API](#segreti-e-chiavi-api)
- [Licenza](#licenza)

## Struttura del repository

```text
mainsite/
├── wrangler.jsonc            Configurazione Cloudflare: comando di build, cartella pubblicata, 404, anteprime
├── LICENSE                   GPL-3.0
└── client/                   Applicazione Angular
    ├── angular.json          Configurazione di build (output statico pre-renderizzato)
    ├── package.json          Dipendenze e script npm
    ├── scripts/
    │   └── postbuild.mjs     Crea 404.html dopo ogni build
    ├── public/               File copiati così come sono nel sito
    │   ├── i18n/             Testi del sito: it.json, en.json
    │   ├── fonts/            Font Overpass (licenza OFL)
    │   └── *.png, *.jpg      Logo, icone, foto
    └── src/
        ├── index.html        Pagina base: titolo, meta tag, favicon
        ├── styles.css        Stili globali e variabili di colore (tema chiaro e scuro)
        ├── main.ts           Avvio nel browser
        ├── main.server.ts    Avvio in fase di pre-renderizzazione
        └── app/
            ├── app.ts                  Componente radice: navbar, pagina corrente, footer
            ├── app.config.ts           Router, traduzioni, tema PrimeNG, idratazione
            ├── app.config.server.ts    Configurazione aggiuntiva per la pre-renderizzazione
            ├── app.routes.ts           Pagine del sito
            ├── app.routes.server.ts    Quali pagine pre-renderizzare
            ├── transloco-loader.ts     Caricamento delle traduzioni
            ├── layout/                 Navbar e footer, comuni a tutte le pagine
            ├── pages/                  Pagine e relative sezioni
            └── services/               Lingua, tema, preferenze salvate
```

## Struttura del sito

### Pagine

| Indirizzo | Contenuto |
|---|---|
| `/` | Home, composta da quattro sezioni (vedi sotto) |
| `/page-not-found` | Pagina "non trovata" |
| qualsiasi altro indirizzo | Risposta 404 con la pagina "non trovata" |

### Sezioni della home

Nell'ordine in cui compaiono:

| Componente | Ancora | Contenuto |
|---|---|---|
| `SiteHero` | | Nome del gruppo, sottotitolo, email, indirizzo, foto della parrocchia |
| `ContactSection` | `#contatti` | Sede, mappa, pagina sul sito della parrocchia, email e PEC |
| `AboutSection` | `#chi-siamo` | Presentazione del gruppo |
| `ScoutPath` | `#cammino` | Le tre fasce d'età: Branco, Reparto, Noviziato e Clan |

I link della navbar portano alle ancore, che si possono usare anche da fuori, per esempio
`https://pd6.it/#contatti`.

### Parti comuni

- **`SiteNavbar`**: logo, collegamenti alle sezioni, pulsante per il tema chiaro/scuro e pulsante
  per la lingua. Sotto i 960 px diventa un menu a scomparsa.
- **`SiteFooter`**: dati legali dell'associazione (codice fiscale, iscrizione al RUNTS, sede
  legale). Restano in italiano anche quando il sito è in inglese.

### Lingua e tema

- **Lingua** (`LanguageService`): alla prima visita segue la lingua del browser, con l'italiano
  come lingua predefinita. La scelta viene salvata nel browser come `user-lang`.
- **Tema** (`ThemeService`): alla prima visita segue l'impostazione del sistema operativo. La
  scelta viene salvata come `user-theme`. Il tema scuro aggiunge la classe `my-app-dark`
  all'elemento `<html>`, e i colori sono definiti come variabili CSS in `src/styles.css`.

Dettagli sui singoli componenti in [client/README.md](client/README.md).

## Sviluppo in locale

Requisiti:

- **Node.js** `^20.19`, `^22.12` oppure `24` o successivo. Cloudflare usa la 24.
- **npm**, incluso in Node.js.
- **git**.

```bash
git clone https://github.com/PADOVA6/mainsite.git
cd mainsite/client
npm ci          # installa le dipendenze esattamente come da package-lock.json
npm start       # server di sviluppo su http://localhost:4200
```

Il server di sviluppo ricarica la pagina a ogni modifica. In questa modalità il sito non è
pre-renderizzato. Per vederlo come sarà online, vedi la sezione successiva.

Per formattare il codice prima di un commit:

```bash
npx prettier --write src
```

## Build

```bash
cd client
npm run build
```

Il build:

1. compila l'applicazione in `client/dist/client/browser`;
2. pre-renderizza le pagine `/` e `/page-not-found`, che finiscono come HTML completo in
   `index.html` e `page-not-found/index.html`;
3. con lo script `postbuild` copia la pagina "non trovata" in `404.html`.

L'avviso `bundle initial exceeded maximum budget` è atteso: il pacchetto iniziale supera di poco
la soglia di avviso di 500 kB impostata in `angular.json`. Il build fallisce solo oltre 1 MB.

Per provare il sito esattamente come lo pubblica Cloudflare, con la gestione dei 404, si lancia
dalla radice del repository:

```bash
npx wrangler dev
```

Wrangler esegue il build definito in `wrangler.jsonc` e serve il risultato su
`http://localhost:8787`. Non serve un account Cloudflare.

## Come contribuire

Il branch `main` è protetto:

- ogni modifica passa da una pull request;
- serve un'approvazione di una persona diversa dall'autore;
- un nuovo commit dopo l'approvazione la annulla;
- force push e cancellazione del branch non sono permessi.

### Flusso di lavoro

```bash
git switch main
git pull
git switch -c descrizione-breve        # per esempio: testo-iscrizioni, fix-menu-mobile

# modifiche, poi:
git add <file modificati>
git commit -m "Aggiorna i testi della sezione iscrizioni"
git push -u origin descrizione-breve
```

1. Su GitHub apri una pull request verso `main` e spiega cosa cambia e perché.
2. Cloudflare compila il branch e pubblica un'anteprima. Il link compare nel commento automatico
   di Cloudflare nella pull request. Ogni nuovo push aggiorna l'anteprima.
3. Chi revisiona controlla il codice e l'anteprima, poi approva oppure chiede modifiche.
4. Dopo l'approvazione si fa il merge, e Cloudflare pubblica pd6.it in un paio di minuti.

### Buone regole

- **Una pull request per argomento**, piccola quando possibile, perché è più facile da
  revisionare.
- **Non committare il sito compilato** (`client/dist/`): lo genera Cloudflare. Il `.gitignore`
  lo esclude già.
- **Controlla sempre l'anteprima** prima di chiedere la revisione, anche su mobile.
- **Messaggi di commit descrittivi**, all'imperativo: "Aggiungi pagina iscrizioni", non "fix".

### Modifiche ai soli testi, direttamente da GitHub

Per correggere un testo non serve installare niente:

1. apri `client/public/i18n/it.json` (e `en.json`) su GitHub;
2. modifica con l'icona della matita;
3. scegli **Create a new branch for this commit and start a pull request**.

Cloudflare compila e mostra l'anteprima come per qualsiasi altra pull request.

## Testi e traduzioni

Tutti i testi dell'interfaccia stanno in due file con la stessa struttura di chiavi:

- `client/public/i18n/it.json`
- `client/public/i18n/en.json`

Nei template i testi si usano con la direttiva di Transloco:

```html
<section *transloco="let t; prefix: 'home.about'">
  <h2>{{ t('title') }}</h2>
</section>
```

Per aggiungere un testo, aggiungi la stessa chiave in **entrambi** i file. Se una chiave manca in
una lingua, al suo posto compare la chiave stessa.

Le traduzioni vengono incluse nel codice al momento del build, invece di essere scaricate dal
browser: è necessario per la pre-renderizzazione (vedi `transloco-loader.ts`). Per questo una
modifica ai testi va online solo dopo un nuovo build, cioè dopo il merge.

## Pubblicazione

Il sito è un Worker Cloudflare di soli file statici, chiamato `mainsite`, nell'account Cloudflare
del gruppo e collegato al dominio `pd6.it`. Tutta la configurazione sta in
[wrangler.jsonc](wrangler.jsonc):

| Campo | A cosa serve |
|---|---|
| `build.command` | Compila Angular prima di ogni pubblicazione: `cd client && npm ci && npm run build` |
| `assets.directory` | La cartella pubblicata: `client/dist/client/browser` |
| `assets.not_found_handling` | Per gli indirizzi inesistenti serve `404.html` con stato 404 |
| `previews` | Abilita le anteprime delle pull request (può restare vuoto) |

Cosa succede a ogni push:

| Branch | Comando eseguito da Cloudflare | Risultato |
|---|---|---|
| `main` | `npx wrangler deploy` | Build e pubblicazione su pd6.it |
| qualsiasi altro | `npx wrangler preview` | Build e anteprima su un indirizzo separato |

Nella dashboard Cloudflare (Worker `mainsite`, Settings, Build) il campo "Build command" resta
vuoto, perché il build è definito in `wrangler.jsonc`. Lo stato e i log di ogni build si vedono
nei controlli della pull request o del commit, alla voce "Workers Builds: mainsite".

### Tornare indietro

- **Strada normale:** su GitHub apri la pull request da annullare e usa **Revert**. Si crea una
  nuova pull request che annulla le modifiche, e dopo il merge il sito torna com'era.
- **Emergenza:** nella dashboard Cloudflare, sezione Deployments del Worker `mainsite`, puoi
  tornare a una versione precedente senza passare da GitHub. Poi va comunque sistemato il codice
  su `main`, altrimenti il deploy successivo ripubblica la versione con il problema.

## Pre-renderizzazione: cosa tenere presente

Durante il build il codice gira in Node.js, non in un browser, quindi oggetti come `window`,
`localStorage`, `navigator` e `matchMedia` non esistono. Usarli direttamente fa fallire il build
con un errore del tipo `An error occurred while prerendering route '/'`.

Ci sono tre modi per evitarlo, già usati nel progetto:

- verificare di essere nel browser con `isPlatformBrowser(inject(PLATFORM_ID))`, come in
  `LanguageService` e `ThemeService`;
- eseguire il codice dopo il primo rendering nel browser con `afterNextRender(...)`, come in
  `RevealOnScroll`;
- accedere al documento con `inject(DOCUMENT)` invece della variabile globale `document`.

La pagina pre-renderizzata è sempre in italiano e con tema chiaro. La lingua del visitatore viene
applicata da Angular, appena caricato. Il tema invece viene applicato prima che la pagina compaia,
per evitare un lampo chiaro in modalità scura. Ci pensano due accorgimenti:

- lo script in `<head>` di `src/index.html`, che aggiunge `my-app-dark` prima del primo
  disegno, con la stessa logica di `ThemeService`;
- in `angular.json`, `optimization.styles.inlineCritical: false` nella configurazione
  `production`. Con l'impostazione predefinita Angular inserisce nella pagina solo il CSS
  "critico", calcolato sull'HTML pre-renderizzato (cioè chiaro). Il resto del CSS lo carica in
  ritardo, comprese le regole del tema scuro e del font di riserva. Così il primo disegno avviene
  con colori chiari e font di sistema. Con `false` il foglio di stile è uno solo e la pagina
  compare solo quando è caricato: pesa circa 6 kB compresso.

### Aggiungere una pagina

1. Crea il componente in `client/src/app/pages/`.
2. Aggiungi la route in `client/src/app/app.routes.ts`.
3. Non serve altro: `app.routes.server.ts` pre-renderizza tutte le route. Le route con parametri,
   per esempio `/eventi/:id`, richiedono invece `getPrerenderParams` per elencare i valori da
   generare.

## Segreti e chiavi API

Il repository è pubblico: password, token e chiavi API non vanno mai committati, nemmeno
temporaneamente, perché restano nella storia di git.

- I segreti si inseriscono nella dashboard Cloudflare, in Worker `mainsite`, Settings, Variables
  and Secrets, oppure con `npx wrangler secret put NOME`.
- Tutto il codice Angular gira nel browser del visitatore ed è leggibile da chiunque. Una chiave
  inclusa nel codice dell'applicazione, anche al momento del build, è pubblica.
- Per usare un servizio che richiede una chiave serve una funzione lato server nel Worker, che
  legge il segreto e fa la chiamata. Il sito chiama quella funzione e non vede mai la chiave.
- Per lo sviluppo in locale i segreti vanno in un file `.dev.vars` nella radice, già escluso dal
  `.gitignore`.

## Licenza

Il codice è distribuito con licenza [GPL-3.0](LICENSE). I font Overpass sono distribuiti con
licenza SIL Open Font License (`client/public/fonts/OFL.txt`). Il logo AGESCI, il logo del gruppo
e le fotografie appartengono ai rispettivi titolari e non sono coperti dalla licenza del codice.

Per contatti: [padova6@veneto.agesci.it](mailto:padova6@veneto.agesci.it).
