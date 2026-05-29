import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MockContentService } from '../../../../services/mocks/content.service.mock';
import { StatCard } from '../../shared-components/stat-card/stat-card';
import { CollaboratorData, CollaboratorRole, CollaboratorStatus } from './collaborator.model';

type RoleFilter = 'all' | CollaboratorRole;
type StatusFilter = 'all' | CollaboratorStatus;

@Component({
  selector: 'app-collaborators-page',
  imports: [StatCard],
  templateUrl: './collaborators-page.html',
  styleUrl: './collaborators-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollaboratorsPage {
  private readonly svc = inject(MockContentService);
  readonly statCards = this.svc.CollaboratorsStatCards;
  readonly collaborators = this.svc.CollaboratorsData;

  protected readonly roleFilter = signal<RoleFilter>('all');
  protected readonly statusFilter = signal<StatusFilter>('all');
  protected readonly searchQuery = signal('');

  protected readonly filtered = computed<CollaboratorData[]>(() => {
    const query = this.searchQuery().trim().toLowerCase();
    const role = this.roleFilter();
    const status = this.statusFilter();
    return this.collaborators.filter(c => {
      if (role !== 'all' && c.role !== role) return false;
      if (status !== 'all' && c.status !== status) return false;
      if (query && !c.name.toLowerCase().includes(query) && !c.institution.toLowerCase().includes(query)) return false;
      return true;
    });
  });

  protected readonly ROLE_LABELS: Record<CollaboratorRole, string> = {
    'co-author': 'Co-Author', 'reviewer': 'Reviewer', 'advisor': 'Advisor', 'editor': 'Editor',
  };

  protected setRole(role: RoleFilter): void { this.roleFilter.set(role); }
  protected setStatus(status: StatusFilter): void { this.statusFilter.set(status); }
  protected setSearch(q: string): void { this.searchQuery.set(q); }
}
