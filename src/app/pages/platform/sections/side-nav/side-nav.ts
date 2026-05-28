import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MockContentService } from '../../../../services/mocks/content.service.mock';

export type PlatformNavItem = {
  label: string;
  icon: string;
  route: string;
  badge?: {
    label: string;
    tone?: 'default' | 'highlight';
  };
};

@Component({
  selector: 'app-side-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-nav.html',
  styleUrl: './side-nav.scss',
})
export class SideNav {
  mockContentService = inject(MockContentService);

  readonly navItems: PlatformNavItem[] = this.mockContentService.SideNavItems;
}
