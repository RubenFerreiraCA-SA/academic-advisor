import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MockContentService } from '../../../../services/mocks/content.service.mock';
import { StatCard } from '../../shared-components/stat-card/stat-card';
import { CollaboratorData, CollaboratorRole, CollaboratorStatus } from './collaborator.model';
import { AppModal } from '../../shared-components/modal/modal';

type RoleFilter = 'all' | CollaboratorRole;
type StatusFilter = 'all' | CollaboratorStatus;

@Component({
  selector: 'app-collaborators-page',
  imports: [StatCard, ReactiveFormsModule, AppModal],
  templateUrl: './collaborators-page.html',
  styleUrl: './collaborators-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollaboratorsPage {
  private readonly svc = inject(MockContentService);
  private readonly fb = inject(FormBuilder);

  readonly statCards = this.svc.CollaboratorsStatCards;
  readonly collaborators = this.svc.collaborators;

  protected readonly roleFilter = signal<RoleFilter>('all');
  protected readonly statusFilter = signal<StatusFilter>('all');
  protected readonly searchQuery = signal('');
  protected readonly showInvite = signal(false);

  protected readonly filtered = computed<CollaboratorData[]>(() => {
    const query = this.searchQuery().trim().toLowerCase();
    const role = this.roleFilter();
    const status = this.statusFilter();
    return this.collaborators().filter(c => {
      if (role !== 'all' && c.role !== role) return false;
      if (status !== 'all' && c.status !== status) return false;
      if (query && !c.name.toLowerCase().includes(query) && !c.institution.toLowerCase().includes(query)) return false;
      return true;
    });
  });

  protected readonly ROLE_LABELS: Record<CollaboratorRole, string> = {
    'co-author': 'Co-Author', 'reviewer': 'Reviewer', 'advisor': 'Advisor', 'editor': 'Editor',
  };

  protected readonly inviteForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    role: ['co-author'],
    institution: [''],
    department: [''],
  });

  protected setRole(role: RoleFilter): void { this.roleFilter.set(role); }
  protected setStatus(status: StatusFilter): void { this.statusFilter.set(status); }
  protected setSearch(q: string): void { this.searchQuery.set(q); }

  protected openInvite(): void {
    this.inviteForm.reset({ name: '', email: '', role: 'co-author', institution: '', department: '' });
    this.showInvite.set(true);
  }

  protected closeInvite(): void {
    this.showInvite.set(false);
  }

  protected submitInvite(): void {
    if (this.inviteForm.invalid) return;
    const v = this.inviteForm.getRawValue();
    const name = v.name.trim();
    const words = name.replace(/^(Dr\.|Prof\.)\s+/, '').split(' ');
    const initials = (words[0]?.[0] ?? '') + (words[words.length - 1]?.[0] ?? '');
    const tones: (1 | 2 | 3 | 4)[] = [1, 2, 3, 4];
    this.svc.addCollaborator({
      name,
      initials: initials.toUpperCase(),
      role: v.role as CollaboratorRole,
      institution: v.institution,
      department: v.department,
      email: v.email,
      papersCount: 0,
      lastActive: 'Pending',
      lastActiveDatetime: '',
      status: 'pending',
      avatarTone: tones[Math.floor(Math.random() * tones.length)],
    });
    this.closeInvite();
  }
}
