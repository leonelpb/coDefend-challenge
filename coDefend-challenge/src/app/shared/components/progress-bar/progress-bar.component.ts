import {
  Component,
  ElementRef,
  Input,
  QueryList,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewChildren,
} from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss',
})
export class ProgressBarComponent {
  @Input() currentStep: number = 1;
  @Input() totalSteps: number = 4;

  steps: number[] = [];
  @ViewChild('container') container!: ElementRef;
  @ViewChild('lineElement') lineElement!: ElementRef;
  @ViewChildren('stepElements') stepElements!: QueryList<ElementRef>;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.steps = Array.from({ length: this.totalSteps }, (_, i) => i + 1);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentStep']) {
       console.log('ngOnChanges: currentStep cambió a:', this.currentStep); 
       setTimeout(() => {
          console.log('setTimeout(0) disparado, llamando a updateProgressLine'); // Debugging
          this.updateProgressLine();
       }, 0);
    }

  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit disparado'); // Debugging
     setTimeout(() => {
        console.log('setTimeout(0) en ngAfterViewInit, llamando a updateProgressLine'); 
        this.updateProgressLine();
     }, 0);
    this.stepElements.changes.subscribe(() => {
       console.log('stepElements QueryList cambió'); // Debugging
       setTimeout(() => {
           this.updateProgressLine();
       }, 0);
    });
  }

  updateProgressLine(): void {
    console.log('Ejecutando updateProgressLine...'); // Debugging

    if (!this.lineElement || !this.container || !this.stepElements || this.stepElements.length === 0) {
      console.warn('updateProgressLine: Elementos del DOM no listos.'); // Debugging
      return;
    }
    const activeStepElement = this.stepElements.find(el =>
      el.nativeElement.classList.contains('step-indicator__step--active')
    );

    if (activeStepElement) {
      console.log('updateProgressLine: Paso activo encontrado en el DOM.'); // Debugging
      const containerRect = this.container.nativeElement.getBoundingClientRect();
      const activeStepRect = activeStepElement.nativeElement.getBoundingClientRect();

      const activeStepCenterRelativeToContainer = (activeStepRect.left - containerRect.left) + (activeStepRect.width / 2);

      console.log(`updateProgressLine: Calculando ancho hasta pos ${activeStepCenterRelativeToContainer}px`); // Debugging

      // Establecer el ancho de la línea
      this.renderer.setStyle(this.lineElement.nativeElement, 'width', activeStepCenterRelativeToContainer + 'px');

    } else {
      console.log('updateProgressLine: No se encontró paso activo en el DOM (clase --active).'); // Debugging
       this.renderer.setStyle(this.lineElement.nativeElement, 'width', '0px');
    }
  }

  // Método de ejemplo para cambiar el paso
  goToStep(stepValue: number): void {
      if (stepValue >= 1 && stepValue <= this.totalSteps) {
          this.currentStep = stepValue; 
      }
  }
}
