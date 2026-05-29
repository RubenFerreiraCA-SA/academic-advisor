import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MockContentService } from '../../../../services/mocks/content.service.mock';
import { AppModal } from '../../shared-components/modal/modal';
import { CollaboratorRole } from '../../pages/collaborators-page/collaborator.model';
import { TemplateCategory, TemplateVisibility } from '../../pages/templates-page/template.model';

type ActiveModal = 'task' | 'collaborator' | 'template' | 'submission' | 'review' | null;

export interface TopNavConfig {
  notifications: number;
  mails: number;
  client: {
    title: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    jobTitle: string;
  }
}

@Component({
  selector: 'app-top-nav',
  imports: [ReactiveFormsModule, AppModal],
  templateUrl: './top-nav.html',
  styleUrl: './top-nav.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopNav {
  private readonly svc = inject(MockContentService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  topNavConfig: TopNavConfig = {
    notifications: 5,
    mails: 3,
    client: {
      title: 'Dr.',
      firstName: 'Alex',
      lastName: ' Morgan',
      jobTitle: 'Software Engineer'
    }
  };

  protected readonly dropdownOpen = signal(false);
  protected readonly activeModal = signal<ActiveModal>(null);

  protected readonly papers = computed(() => this.svc.papers());
  protected readonly collaborators = computed(() => this.svc.collaborators());

  protected readonly taskForm = this.fb.nonNullable.group({
    title: ['', Validators.required],
    paperUid: [''],
    priority: ['medium'],
    assigneeId: ['self'],
    dueDate: [''],
  });

  protected readonly inviteForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    role: ['co-author'],
    institution: [''],
    department: [''],
  });

  protected readonly templateForm = this.fb.nonNullable.group({
    title: ['', Validators.required],
    description: [''],
    category: ['manuscript'],
    visibility: ['personal'],
    tags: [''],
  });

  protected readonly submissionForm = this.fb.nonNullable.group({
    paperUid: ['', Validators.required],
    journal: ['', Validators.required],
    journalShort: [''],
    impactFactor: [0],
    round: [1],
    submittedDate: [''],
  });

  protected readonly reviewForm = this.fb.nonNullable.group({
    paperUid: ['', Validators.required],
    reviewerId: ['self'],
    reviewType: ['peer-review'],
    priority: ['normal'],
    deadlineDate: [''],
  });

  protected toggleDropdown(): void {
    this.dropdownOpen.update(v => !v);
  }

  protected closeDropdown(): void {
    this.dropdownOpen.set(false);
  }

  protected navigateNewPaper(): void {
    this.closeDropdown();
    this.router.navigate(['/platform/papers/new']);
  }

  protected openModal(type: Exclude<ActiveModal, null>): void {
    this.closeDropdown();
    this.resetForm(type);
    this.activeModal.set(type);
  }

  protected closeModal(): void {
    this.activeModal.set(null);
  }

  private resetForm(type: Exclude<ActiveModal, null>): void {
    switch (type) {
      case 'task':
        this.taskForm.reset({ title: '', paperUid: '', priority: 'medium', assigneeId: 'self', dueDate: '' });
        break;
      case 'collaborator':
        this.inviteForm.reset({ name: '', email: '', role: 'co-author', institution: '', department: '' });
        break;
      case 'template':
        this.templateForm.reset({ title: '', description: '', category: 'manuscript', visibility: 'personal', tags: '' });
        break;
      case 'submission':
        this.submissionForm.reset({ paperUid: '', journal: '', journalShort: '', impactFactor: 0, round: 1, submittedDate: '' });
        break;
      case 'review':
        this.reviewForm.reset({ paperUid: '', reviewerId: 'self', reviewType: 'peer-review', priority: 'normal', deadlineDate: '' });
        break;
    }
  }

  protected submitTask(): void {
    if (this.taskForm.invalid) return;
    const v = this.taskForm.getRawValue();
    const now = new Date().toISOString();
    this.svc.addTask({
      title: v.title,
      paperUid: v.paperUid,
      priority: v.priority as 'high' | 'medium' | 'low',
      assigneeId: v.assigneeId,
      status: 'not-started',
      commentsCount: 0,
      dueDateAt: v.dueDate,
      dueDateLabel: v.dueDate,
      progress: 0,
      updatedAt: now,
      updatedAtLabel: 'Just now',
      category: 'upcoming',
    });
    this.closeModal();
  }

  protected submitInvite(): void {
    if (this.inviteForm.invalid) return;
    const v = this.inviteForm.getRawValue();
    const name = v.name.trim();
    const words = name.replace(/^(Dr\.|Prof\.)\s+/, '').split(' ');
    const initials = ((words[0]?.[0] ?? '') + (words[words.length - 1]?.[0] ?? '')).toUpperCase();
    const tones: (1 | 2 | 3 | 4)[] = [1, 2, 3, 4];
    this.svc.addCollaborator({
      name,
      initials,
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
    this.closeModal();
  }

  protected submitTemplate(): void {
    if (this.templateForm.invalid) return;
    const v = this.templateForm.getRawValue();
    const now = new Date();
    const dateLabel = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const dateIso = now.toISOString().split('T')[0];
    const tags = v.tags ? v.tags.split(',').map((t: string) => t.trim()).filter(Boolean) : [];
    this.svc.addTemplate({
      title: v.title,
      description: v.description,
      category: v.category as TemplateCategory,
      visibility: v.visibility as TemplateVisibility,
      usageCount: 0,
      lastUsed: dateLabel,
      lastUsedDatetime: dateIso,
      createdBy: 'Ruben F.',
      tags,
    });
    this.closeModal();
  }

  protected submitSubmission(): void {
    if (this.submissionForm.invalid) return;
    const v = this.submissionForm.getRawValue();
    const dateLabel = v.submittedDate
      ? new Date(v.submittedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      : '';
    this.svc.addSubmission({
      paperUid: v.paperUid,
      journal: v.journal,
      journalShort: v.journalShort || v.journal.substring(0, 10),
      submittedDate: dateLabel,
      submittedDatetime: v.submittedDate,
      status: 'submitted',
      reviewDays: 0,
      impactFactor: v.impactFactor,
      round: v.round,
    });
    this.closeModal();
  }

  protected submitReview(): void {
    if (this.reviewForm.invalid) return;
    const v = this.reviewForm.getRawValue();
    const now = new Date().toISOString().split('T')[0];
    const deadlineLabel = v.deadlineDate
      ? new Date(v.deadlineDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      : '';
    this.svc.addReviewItem({
      paperUid: v.paperUid,
      reviewType: v.reviewType as 'peer-review' | 'editorial' | 'internal',
      reviewerId: v.reviewerId,
      priority: v.priority as 'urgent' | 'high' | 'normal' | 'low',
      status: 'pending',
      submittedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      submittedDatetime: now,
      deadlineDate: deadlineLabel,
      deadlineDatetime: v.deadlineDate,
      deadlineLabel,
      commentsCount: 0,
      category: 'pending',
    });
    this.closeModal();
  }
}
