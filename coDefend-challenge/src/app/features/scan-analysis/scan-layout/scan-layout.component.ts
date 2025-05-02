import { Component, EventEmitter, Output } from '@angular/core';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { InputScannerComponent } from "../components/input-scanner/input-scanner.component";
import { ConfirmAnalysisComponent } from "../components/confirm-analysis/confirm-analysis.component";
import { AnalysisProgressComponent } from "../components/analysis-progress/analysis-progress.component";
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-scan-layout',
  standalone: true,
  imports: [FormsModule,HeaderComponent, ButtonComponent, InputScannerComponent, ConfirmAnalysisComponent, AnalysisProgressComponent],
  templateUrl: './scan-layout.component.html',
  styleUrl: './scan-layout.component.scss'
})
export class ScanLayoutComponent {
  currentStep: number = 1;
  totalSteps: number = 3;
  scannerSurface: string ='';

  @Output() scanComplete= new EventEmitter<void>();

  goToNextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  goToPreviousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }
  handleFinish() {
    console.log('Enviando mensaje al finalizar');
  }
  handleScanComplete() {
    console.log("Onboarding Completado!");
    this.scanComplete.emit();
  }
}
