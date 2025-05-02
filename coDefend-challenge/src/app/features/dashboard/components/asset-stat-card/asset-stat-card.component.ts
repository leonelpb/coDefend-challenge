import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-asset-stat-card',
  standalone: true,
  imports: [],
  templateUrl: './asset-stat-card.component.html',
  styleUrl: './asset-stat-card.component.scss'
})
export class AssetStatCardComponent {
  @Input() label :string='';
  @Input() count : number=0;
}
