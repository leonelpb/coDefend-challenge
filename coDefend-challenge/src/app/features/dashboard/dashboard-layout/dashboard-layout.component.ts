import { Component } from '@angular/core';
import { SideMenuComponent } from '../../../shared/side-menu/side-menu.component';
import { SectionRadarCardComponent } from '../components/section-radar-card/section-radar-card.component';
import { AssetStatCardComponent } from '../components/asset-stat-card/asset-stat-card.component';
import { IssueChartComponent } from '../components/issue-chart/issue-chart.component';
import { AddResourcesComponent } from '../components/add-resources/add-resources.component';
import { ProgressStatComponent } from '../components/progress-stat/progress-stat.component';
import { AddMemberComponent } from '../components/add-member/add-member.component';
import { MemberListComponent } from '../components/member-list/member-list.component';
import { IssuesOverviewListComponent } from '../components/issues-overview-list/issues-overview-list.component';
import { FinishedScanItem } from '../../../shared/models/interfaces';
import { FinishedScansListComponent } from '../components/finished-scans-list/finished-scans-list.component';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    SideMenuComponent,
    SectionRadarCardComponent,
    AssetStatCardComponent,
    IssueChartComponent,
    AddResourcesComponent,
    ProgressStatComponent,
    AddMemberComponent,
    MemberListComponent,
    IssuesOverviewListComponent,
    FinishedScansListComponent,
  ],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss',
})
export class DashboardLayoutComponent {
  showRadarExploreCard: boolean = true;
  handleExploreIssuesClick(): void {
    console.log('Botón "Ir hacia la sección de issues" clickeado.');
    this.showRadarExploreCard = false;
  }

  // Propiedades para manejar el estado del escaneo
  showScanInProgressCard: boolean = true;
  scanProgressValue: number = 50;
  currentScanDomain: string = 'www.lanacion.com';

  // Propiedad para la lista de escaneos finalizados (hardcodeada por ahora)
  finishedScansData: FinishedScanItem[] = [
    { id: 1, date: '29-06-2022', domain: 'lanacion.com', totalIssues: 20 },
    { id: 2, date: '24-06-2022', domain: 'infobae.com', totalIssues: 30 },
    { id: 3, date: '23-06-2022', domain: 'clarin.com', totalIssues: 40 },
  ];
}
