import { Component } from '@angular/core';
import { Collaborator } from '../../../../shared/models/interfaces';

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.scss',
})
export class MemberListComponent {
  // Lista de colaboradores hardcodeada por ahora
  collaborators: Collaborator[] = [
    { id:1,email: 'chris@codefend.com', role: 'Founder' },
    { id:2, email: 'edd@codefend.com', role: 'Collaborator' },
    { id:3, email: 'hernan@codefend.com', role: 'Collaborator' },
    { id:4, email: 'nacho@codefend.com', role: 'Collaborator' },
  ];


  trackByEmail(id: number, collaborator: Collaborator): string {
    return collaborator.email;
  }
}
