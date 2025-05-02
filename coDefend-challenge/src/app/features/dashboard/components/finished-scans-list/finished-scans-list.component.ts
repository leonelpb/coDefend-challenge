import { Component, Input } from '@angular/core';
import { FinishedScanItem } from '../../../../shared/models/interfaces';

@Component({
  selector: 'app-finished-scans-list',
  standalone: true,
  imports: [],
  templateUrl: './finished-scans-list.component.html',
  styleUrl: './finished-scans-list.component.scss'
})
export class FinishedScansListComponent {

  @Input() scans: FinishedScanItem[] = [
    { id:1, date: '29-06-2022', domain: 'lanacion.com', totalIssues: 20 },
    { id:2,date: '24-06-2022', domain: 'infobae.com', totalIssues: 30 },
    { id:3,date: '23-06-2022', domain: 'clarin.com', totalIssues: 40 },
    // Añade más ítems si es necesario
  ];

  trackByScan(index: number, scan: FinishedScanItem): string {
    return scan.date + scan.domain;
  }
}
