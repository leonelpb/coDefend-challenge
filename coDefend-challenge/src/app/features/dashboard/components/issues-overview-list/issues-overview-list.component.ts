import { Component, Input } from '@angular/core';
import { ScoreDotsComponent } from '../../../../shared/components/score-dots/score-dots.component';
import { IssueItem } from '../../../../shared/models/interfaces';

@Component({
  selector: 'app-issues-overview-list',
  standalone: true,
  imports: [ScoreDotsComponent],
  templateUrl: './issues-overview-list.component.html',
  styleUrl: './issues-overview-list.component.scss'
})
export class IssuesOverviewListComponent {

  // @Input(): Recibe la lista de issues desde el componente padre
  // Inicializa con datos de ejemplo hardcodeados por ahora
  @Input() issues: IssueItem[] = [
    { id:1, published: '29-06-2022', title: 'Frameable response, weaponization', score: 4 },
    {  id:2, published: '24-06-2022', title: 'Observable response discrepancy, user enumeration', score: 3 },
    { id:3, published: '23-06-2022', title: 'Uncontrolled resource consumption', score: 2 },
    { id:4, published: '23-06-2022', title: 'information disclosure on error message', score: 2 },
    { id:5, published: '23-06-2022', title: 'Access information / credentials', score: 1 },
    { id:6, published: '23-06-2022', title: 'Modification of assumable-immutable data, maid', score: 4 },
    { id:7, published: '20-06-2022', title: 'User enumeration: blacklisted', score: 1 },
  ];

  trackByTitle(index: number, issue: IssueItem): string {
    return issue.title + issue.published; 
  }

  maxScore: number = 5;
}
