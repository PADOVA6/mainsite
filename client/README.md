# Sito AGESCI Padova 6

Applicazione Angular standalone con PrimeNG. Eseguire i comandi da questa cartella:

```bash
npm ci
npm start
npm run build
```

Il server di sviluppo risponde su `http://localhost:4200`.
La build di produzione viene generata in `dist/client/browser`.
Non sono ancora configurati runner per test unitari o end-to-end.

## Struttura

- [Home](src/app/pages/home/home.ts) compone le sezioni, senza logica di presentazione duplicata.
- [SiteHero](src/app/pages/home/site-hero/site-hero.ts) mostra identità, email e indirizzo
  già in apertura. Le azioni usano link nativi con direttive Button di PrimeNG.
- [ContactSection](src/app/pages/home/contact-section/contact-section.ts) raccoglie sede,
  mappa, sito della parrocchia, email e PEC in Card PrimeNG subito dopo la testata.
- [AboutSection](src/app/pages/home/about-section/about-section.ts) descrive il gruppo.
- [ScoutPath](src/app/pages/home/scout-path/scout-path.ts) presenta le tre fasce di età
  come lista ordinata; il tracciato SVG originale resta decorativo.
- [RevealOnScroll](src/app/pages/home/scout-path/reveal-on-scroll.ts) gestisce
  l'animazione del percorso con cleanup dell'observer e rispetto del movimento ridotto.
- [SiteFooter](src/app/layout/site-footer/site-footer.ts) appartiene al layout comune:
  mantiene testi italiani, collegamenti e stili del footer HTML originale, anche nelle altre lingue.

I testi della home seguono il sistema Transloco esistente:
[italiano](public/i18n/it.json) e [inglese](public/i18n/en.json).
Logo, favicon e font Overpass sono locali in [public](public), insieme alla licenza dei font.
Colori e regole condivise sono in [styles.css](src/styles.css); il tema PrimeNG
usa la stessa palette viola in [app.config.ts](src/app/app.config.ts).

Mantenere ogni file di codice entro 200 righe: separare per responsabilità,
con template e stili vicini al componente.
