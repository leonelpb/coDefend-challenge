import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { RadarComponent } from "../radar/radar.component";

@Component({
  selector: 'app-section-radar-card',
  standalone: true,
  imports: [ButtonComponent, RadarComponent],
  templateUrl: './section-radar-card.component.html',
  styleUrl: './section-radar-card.component.scss'
})
export class SectionRadarCardComponent {
  @Input() title: string = '';
  @Input() buttonText: string = 'Learn More';
  @Input() imageUrl?: string; 

  @Output() buttonClick = new EventEmitter<void>(); 

  onButtonClick(): void {
    this.buttonClick.emit();
  }
}
