import { Component, } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputFieldComponent } from '../../../../shared/components/input-field/input-field.component'; 

@Component({
  selector: 'app-business-details',
  standalone: true,
  imports: [InputFieldComponent,FormsModule,],
  templateUrl: './business-details.component.html',
  styleUrl: './business-details.component.scss'
})
export class BusinessDetailsComponent {
  nombreEmpresa: string = '';
  webEmpresa: string = '';
  tamanioEmpresa: string = '';
  prefIdioma: string = ''; 
}
