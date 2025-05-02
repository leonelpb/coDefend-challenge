import { Component } from '@angular/core';
import { MenuItem, MenuSection } from './../models/interfaces'
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss'
})
export class SideMenuComponent {
   
  menuSections: MenuSection[] = [
      {
        title: 'Main',
        items: [
          { label: 'Dashboard', route: '/dashboard' },
          { label: 'Team members', route: '/dashboard/team-members' }, 
          { label: 'Orders and payments', route: '/dashboard/orders-payments' },
          { label: 'User profile', route: '/dashboard/user-profile' },
        ]
      },
      {
        title: 'Attack surface',
        items: [
          { label: 'Web software', route: '/dashboard/attack-surface/web-software' },
          { label: 'Mobile software', route: '/dashboard/attack-surface/mobile-software' },
          { label: 'Network infrastructure', route: '/dashboard/attack-surface/network' },
          { label: 'Social attacks', route: '/dashboard/attack-surface/social' },
        ]
      },
      {
        title: 'Issues',
        items: [
          { label: 'Generate informs', route: '/dashboard/issues/generate' },
          { label: 'Open issues', route: '/dashboard/issues/open' },
          { label: 'Fixed issues', route: '/dashboard/issues/fixed' },
          { label: 'Accepted risks', route: '/dashboard/issues/accepted' },
        ]
      },
      {
        title: 'Toolset',
        items: [
          { label: 'Automated web scans', route: '/dashboard/toolset/scans' },
          { label: 'Dataleaks explorer', route: '/dashboard/toolset/dataleaks' },
          { label: 'Talk to a hacker', route: '/dashboard/toolset/talk-hacker' },
        ]
      }
    ];
  
    // Método para manejar el clic en un ítem
    onMenuItemClick(item: MenuItem): void {
      console.log('Clicked:', item.label, 'Navigating to:', item.route);
    }
  
}
