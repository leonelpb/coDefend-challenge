import { Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputFieldComponent } from '../../../../shared/components/input-field/input-field.component';
@Component({
  selector: 'app-personal-details',
  standalone: true,
  imports: [FormsModule, InputFieldComponent],
  templateUrl: './personal-details.component.html',
  styleUrl: './personal-details.component.scss'
})
export class PersonalDetailsComponent {

  firstName: string = '';
  lastName: string = '';
  phoneNumber: string = ''; 
  email: string = '';

}
