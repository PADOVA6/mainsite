import { Component } from '@angular/core';
import { TranslocoDirective } from '@jsverse/transloco';
import { RevealOnScroll } from '../../shared/reveal-on-scroll';

// Valori dell'AGESCI. I testi di Legge, Promessa e motti seguono il Regolamento metodologico
// (aggiornato al Consiglio generale 2026); scopo e tre scelte vengono dal Patto associativo.
@Component({
  selector: 'app-mission-page',
  imports: [TranslocoDirective, RevealOnScroll],
  templateUrl: './mission-page.html',
  styleUrl: './mission-page.css',
})
export class MissionPage {
  protected readonly choices = ['scout', 'christian', 'political'];
  protected readonly law = ['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8', 'a9', 'a10'];
  protected readonly promise = ['p1', 'p2', 'p3'];
  protected readonly mottos = ['pack', 'troop', 'clan'];
  protected readonly rulesUrl =
    'https://www.agesci.it/download/statuto_patto_associativo_e_regolamenti/Regolamento-metodologico-2026.pdf';
}
