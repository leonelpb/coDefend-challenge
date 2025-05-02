import { Component, forwardRef, Input } from '@angular/core';
import {
  FormsModule,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

// Define el proveedor para el ControlValueAccessor
const CUSTOM_INPUT_SCANNER_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputScannerComponent),
  multi: true,
};

@Component({
  selector: 'app-input-scanner',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './input-scanner.component.html',
  styleUrl: './input-scanner.component.scss',
  providers: [CUSTOM_INPUT_SCANNER_CONTROL_VALUE_ACCESSOR],
})
export class InputScannerComponent implements ControlValueAccessor {
  @Input() placeholder: string = '';
  @Input() name!: string;
  @Input() id?: string; 

  private _value: any = ''; 
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  // --- Lógica de Autocompletar ---
  allSuggestions: string[] = [
    'mercadolibre.com',
    'api.mercadolibre.com',
    'cerbero.mercadolibre.com',
    'citiportal.mercadolibre.com',
    'correo.mercadolibre.com',
    'crmla.mercadolibre.com',
  ];
  // Lista de sugerencias filtradas a mostrar
  filteredSuggestions: string[] = [];
  showSuggestions: boolean = false;

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


  get value(): any {
    return this._value;
  }

  set value(val: any) {
    if (val !== this._value) {
      this._value = val;
      this.onChange(val);
    }
  }

  onInput(event: Event): void {
    this.value = (event.target as HTMLInputElement).value;
    this.filterSuggestions();
    this.showSuggestions = true;
  }

  onBlur(): void {
    setTimeout(() => {
      this.onTouched();
      this.showSuggestions = true;
    }, 100); 
  }

    onClickInput(): void {
      console.log('Input clickeado. Mostrando todas las sugerencias.');
      this.filteredSuggestions = [...this.allSuggestions]; 
      this.showSuggestions = true; 
      this.onTouched(); 
  }

  // Método para filtrar las sugerencias
  filterSuggestions(): void {
    if (!this.value || this.value.length < 1) {
      this.showSuggestions = this.value.length > 0 || this.filteredSuggestions.length > 0; // Ejemplo

    }else{
      const filterValue = this.value.toLowerCase();
      this.filteredSuggestions = this.allSuggestions.filter(suggestion =>
          suggestion.toLowerCase().includes(filterValue)
      );
      this.showSuggestions = this.filteredSuggestions.length > 0;
    }
  }

  // Método llamado cuando se selecciona una sugerencia
  selectSuggestion(suggestion: string): void {
    this.value = suggestion; 
    this.showSuggestions = false; 
  }

  onIconClick(): void {
    console.log('Icono de scanner clickeado');
  }
}
