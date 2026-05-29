import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MockContentService } from '../../../../services/mocks/content.service.mock';
import { StatCard } from '../../shared-components/stat-card/stat-card';
import { CustomDynamicTable } from '../../shared-components/custom-dynamic-table/custom-dynamic-table';
import { AppModal } from '../../shared-components/modal/modal';

type ViewMode = 'list' | 'board';

@Component({
  selector: 'app-tasks-page',
  imports: [StatCard, CustomDynamicTable, ReactiveFormsModule, AppModal],
  templateUrl: './tasks-page.html',
  styleUrl: './tasks-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksPage {
  private readonly svc = inject(MockContentService);
  private readonly fb = inject(FormBuilder);

  readonly statCards = this.svc.TaskStatCards;
  readonly tableConfig = this.svc.tasksTableConfig;
  readonly papers = this.svc.papers;

  protected readonly viewMode = signal<ViewMode>('list');
  protected readonly showNewTask = signal(false);

  protected readonly newTaskForm = this.fb.nonNullable.group({
    title: ['', Validators.required],
    paperUid: [''],
    priority: ['medium'],
    assigneeId: ['self'],
    dueDate: [''],
  });

  protected readonly collaborators = computed(() => this.svc.collaborators());

  protected setView(mode: ViewMode): void {
    this.viewMode.set(mode);
  }

  protected openNewTask(): void {
    this.newTaskForm.reset({ title: '', paperUid: '', priority: 'medium', assigneeId: 'self', dueDate: '' });
    this.showNewTask.set(true);
  }

  protected closeNewTask(): void {
    this.showNewTask.set(false);
  }

  protected submitNewTask(): void {
    if (this.newTaskForm.invalid) return;
    const v = this.newTaskForm.getRawValue();
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
    this.closeNewTask();
  }
}
