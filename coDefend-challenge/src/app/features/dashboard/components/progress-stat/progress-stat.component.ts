import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-stat',
  standalone: true,
  imports: [],
  templateUrl: './progress-stat.component.html',
  styleUrl: './progress-stat.component.scss'
})
export class ProgressStatComponent {
  @Input() title: string = 'Scanneo en curso';
  @Input() description: string = 'Los scanners automaticos están analizando uno de sus recursos web:';
  @Input() domain: string = 'www.lanacion.com';
  @Input() progress: number = 50; // Valor de progreso (0-100) - Estático por ahora


}
