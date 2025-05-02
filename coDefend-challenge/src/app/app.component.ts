import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OnboardingLayoutComponent } from "./features/onboarding/onboarding-layout/onboarding-layout.component";
import { ScanLayoutComponent } from "./features/scan-analysis/scan-layout/scan-layout.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, OnboardingLayoutComponent, ScanLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'coDefend-challenge';
    // Propiedad para controlar si el modal de onboarding está visible
    showOnboardingModal: boolean = true; 
    showScanModal: boolean = false;

    // Método llamado para cerrar el modal de onboarding
    closeOnboardingModal(): void {
      this.showOnboardingModal = false;
      console.log('Modal de onboarding cerrado.');
      this.showScanModal = true;
    // Método llamado para cerrar el modal de analysis/scan
    }
    closeScanModal(): void {
      this.showScanModal = false;
      console.log('Modal de onboarding cerrado.');
    }

}
