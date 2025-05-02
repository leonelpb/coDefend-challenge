import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-add-resources',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './add-resources.component.html',
  styleUrl: './add-resources.component.scss'
})
export class AddResourcesComponent {
  @Input() title: string = '';
  @Input() buttonText: string = 'Learn More';
  onButtonClick(): void {
    console.log('Console: click desde Ir a recursos')
  }
}
