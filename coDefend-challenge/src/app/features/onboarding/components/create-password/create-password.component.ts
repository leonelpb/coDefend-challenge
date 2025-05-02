import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputFieldComponent } from '../../../../shared/components/input-field/input-field.component';

@Component({
  selector: 'app-create-password',
  standalone: true,
  imports: [ FormsModule, InputFieldComponent],
  templateUrl: './create-password.component.html',
  styleUrl: './create-password.component.scss'
})
export class CreatePasswordComponent {
  password: string = '';
  confirmPassword: string ='';
}
