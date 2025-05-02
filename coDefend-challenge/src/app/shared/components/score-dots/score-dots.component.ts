import { Component, Input, OnChanges, SimpleChanges  } from '@angular/core';

@Component({
  selector: 'app-score-dots',
  standalone: true,
  imports: [],
  templateUrl: './score-dots.component.html',
  styleUrl: './score-dots.component.scss'
})
export class ScoreDotsComponent implements OnChanges {
  @Input() score: number = 0; 
  @Input() maxScore: number = 5; 

  // Array de puntos para iterar en el template 
  dots: boolean[] = [];

  ngOnChanges(changes: SimpleChanges): void {
      this.generateDots();
  }

  private generateDots(): void {
      this.dots = [];
      for (let i = 0; i < this.maxScore; i++) {
          this.dots.push(i < this.score);
      }
  }
}
