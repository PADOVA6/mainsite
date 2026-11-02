# Sito AGESCI Padova 6

Applicazione Angular standalone con PrimeNG. Eseguire i comandi da questa cartella:

```bash
npm ci
npm start
npm run build
```

Il server di sviluppo risponde su `http://localhost:4200`.
La build di produzione viene generata in `dist/client/browser`: le pagine sono pre-renderizzate
(`outputMode: "static"`) e lo script `postbuild` crea `404.html` dalla pagina "non trovata".
Non serve fare il build prima di committare: lo esegue Cloudflare a ogni push
(vedi il [README principale](../README.md)).
Non sono ancora configurati runner per test unitari o end-to-end.

## Struttura

- [Home](src/app/pages/home/home.ts): testata ([SiteHero](src/app/pages/home/site-hero/site-hero.ts))
  e [HomeIntro](src/app/pages/home/home-intro/home-intro.ts), con presentazione, numeri del gruppo
  e schede che portano alle pagine interne.
- [AboutPage](src/app/pages/about/about-page.ts): storia, metodo scout, capi.
- [PathPage](src/app/pages/path/path-page.ts): tappe del cammino
  ([ScoutPath](src/app/pages/path/scout-path/scout-path.ts), con il tracciato SVG decorativo),
  unità, orari e invito a contattarci.
- [ContactPage](src/app/pages/contact/contact-page.ts): dove ci troviamo, scrivici, seguici.
  I profili social sono un elenco nel componente.
- [RevealOnScroll](src/app/pages/path/scout-path/reveal-on-scroll.ts) gestisce
  l'animazione del percorso con cleanup dell'observer e rispetto del movimento ridotto.
- [SiteFooter](src/app/layout/site-footer/site-footer.ts) appartiene al layout comune:
  mantiene testi italiani, collegamenti e stili del footer HTML originale, anche nelle altre lingue.
- [SiteNavbar](src/app/layout/site-navbar/site-navbar.ts) offre link alle pagine Chi siamo, Il cammino e Contatti,
  il solo logo, un pulsante lingua che mostra la destinazione EN/IT
  e un pulsante con la sola icona sole/luna per il tema chiaro/scuro.
  Entrambi hanno etichette accessibili e tooltip che descrivono l'azione.
  Sotto 960 px il menu si espande con un pulsante;
  Escape lo chiude e riporta il focus al pulsante.

Le preferenze sono salvate in `localStorage` (`user-lang` e `user-theme`).
Alla prima visita la lingua segue quella del browser (italiano come fallback) e il tema
segue la preferenza di sistema, anche quando cambia a pagina aperta.
Al primo clic il pulsante inverte il tema corrente e salva la scelta chiaro/scuro:
da quel momento prevale sul sistema, senza scadenza, anche alle visite successive.
In assenza di una scelta salvata (o rimuovendo `user-theme` dallo storage) torna a seguire il sistema.
Se lo storage non e' disponibile, i controlli restano funzionanti per la sessione
e viene emesso un avviso in console. Il tema applica `.my-app-dark` alla radice,
sincronizzando i colori del sito con quelli dei componenti PrimeNG.

I testi della home seguono il sistema Transloco esistente:
[italiano](public/i18n/it.json) e [inglese](public/i18n/en.json).
Logo, favicon e font Roboto sono locali in [public](public), insieme alla licenza dei font.
La [foto di Cristo Re](public/cristo-re-padova.jpg) e' di Cmcmcm1, da
[Wikimedia Commons](<https://commons.wikimedia.org/wiki/File:Padova,_Cristo_Re_e_Sant%27Osvaldo,_exterior_(1).jpg>),
con licenza [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
La copia locale e' la versione ridimensionata a 960 x 960 px fornita da Commons,
senza ulteriori modifiche; autore, fonte e licenza sono indicati nella didascalia sotto la foto.
Colori e regole condivise sono in [styles.css](src/styles.css); il tema PrimeNG
usa la stessa palette viola in [app.config.ts](src/app/app.config.ts).

Mantenere ogni file di codice entro 200 righe: separare per responsabilità,
con template e stili vicini al componente.
