import {  Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressBarComponent } from '../../../shared/components/progress-bar/progress-bar.component';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { PersonalDetailsComponent } from '../components/personal-details/personal-details.component';
import { BusinessDetailsComponent } from '../components/business-details/business-details.component';
import { ConfirmEmailComponent } from '../components/confirm-email/confirm-email.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { CreatePasswordComponent } from '../components/create-password/create-password.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-onboarding-layout',
  standalone: true,
  imports: [
    CommonModule,
    ProgressBarComponent,
    HeaderComponent,
    PersonalDetailsComponent,
    BusinessDetailsComponent,
    ConfirmEmailComponent,
    CreatePasswordComponent,
    ButtonComponent,
    FormsModule,
  ],
  templateUrl: './onboarding-layout.component.html',
  styleUrl: './onboarding-layout.component.scss',
})
export class OnboardingLayoutComponent {
  // Variable para controlar qué paso mostrar. Inicializa en 1 para el primer paso.
  currentStep: number = 1;
  totalSteps: number = 4; 

  @Output() onboardingComplete = new EventEmitter<void>();

  constructor() {}

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
  handleOnboardingComplete() {
    console.log("Onboarding Completado!");
    this.onboardingComplete.emit();
  }
}
