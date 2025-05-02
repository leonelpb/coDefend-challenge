import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import(
        './features/dashboard/dashboard-layout/dashboard-layout.component'
      ).then((m) => m.DashboardLayoutComponent),
  },
  {
    path: '',
    redirectTo: '/onboarding',
    pathMatch: 'full',
  },
];
