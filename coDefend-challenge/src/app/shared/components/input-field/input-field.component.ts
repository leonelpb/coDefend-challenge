import { Component, Input, forwardRef  } from '@angular/core';
import { FormsModule,ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'; 

const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputFieldComponent), 
  multi: true 
};

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [ FormsModule],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.scss',
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class InputFieldComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type: string = 'text'; 


  private _value: any = ''; 

  // Métodos registrados por ngModel para comunicar los cambios de valor y estado
  private onChange = (value: any) => {};
  private onTouched = () => {};


  // --- Implementación de ControlValueAccessor ---


  writeValue(value: any): void {
    this._value = value;
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn; 
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn; 
  }

  setDisabledState?(isDisabled: boolean): void {

  }

  // --- Métodos para manejar los eventos del input nativo y comunicarlos a ngModel ---

  get value(): any {
    return this._value;
  }

  set value(val: any) {
    if (val !== this._value) {
      this._value = val; 
      this.onChange(val); 
    }
  }
  // Método a llamar cuando el input nativo cambia 
  onInput(event: Event): void {
    this.value = (event.target as HTMLInputElement).value; 
  }

  // Método a llamar cuando el input nativo pierde el foco
  onBlur(): void {
    this.onTouched(); 
  }
}
