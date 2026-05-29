import { Injectable, computed, signal } from "@angular/core";

// ── Firestore-like collection documents ───────────────────────────────────────
import { COLLABORATORS_DB, CollaboratorDoc } from "./db/collaborators.db";
import { PAPERS_DB, PaperDoc } from "./db/papers.db";
import { TASKS_DB, TaskDoc } from "./db/tasks.db";
import { REVIEW_QUEUE_DB, ReviewQueueDoc } from "./db/review-queue.db";
import { SUBMISSIONS_DB, SubmissionDoc } from "./db/submissions.db";
import { CALENDAR_EVENTS_DB } from "./db/calendar-events.db";
import { TEMPLATES_DB, TemplateDoc } from "./db/templates.db";

// ── UI configuration (columns, tabs, filters, stat cards) ─────────────────────
import { SIDE_NAV_ITEMS } from "./consts/nav-items.const";
import { STAT_CARDS } from "./consts/stat-cards.const";
import { TASK_STAT_CARDS } from "./consts/task-stat-cards.const";
import { PAPER_COLUMNS, PAPER_TABS } from "./consts/papers-table.const";
import { TASK_COLUMNS, TASK_FILTER_DEFS, TASK_TABS } from "./consts/tasks-table.const";
import { REVIEW_COLUMNS, REVIEW_FILTER_DEFS, REVIEW_QUEUE_STAT_CARDS, REVIEW_TABS } from "./consts/review-queue.const";
import { SUBMISSIONS_COLUMNS, SUBMISSIONS_FILTER_DEFS, SUBMISSIONS_STAT_CARDS, SUBMISSIONS_TABS } from "./consts/submissions.const";
import { COLLABORATORS_STAT_CARDS } from "./consts/collaborators.const";
import { CALENDAR_STAT_CARDS } from "./consts/calendar-events.const";
import { TEMPLATES_STAT_CARDS } from "./consts/templates.const";
import { ANALYTICS_STAT_CARDS, PUBLICATIONS_BY_YEAR, PublicationYear, TOPICS_DATA, TopicData, VENUES_DATA, VenueData } from "./consts/analytics.const";

// ── View models consumed by components ────────────────────────────────────────
import { StatCardData } from "../../pages/platform/shared-components/stat-card/stat-card";
import { PlatformNavItem } from "../../pages/platform/sections/side-nav/side-nav";
import { DynamicTableConfig } from "../../pages/platform/shared-components/custom-dynamic-table/custom-dynamic-table.model";
import { PaperData } from "../../pages/platform/pages/papers-page/papers-model";
import { TaskData } from "../../pages/platform/pages/tasks-page/task.model";
import { ReviewItem } from "../../pages/platform/pages/review-queue-page/review-queue.model";
import { SubmissionData } from "../../pages/platform/pages/submissions-page/submission.model";
import { CollaboratorData } from "../../pages/platform/pages/collaborators-page/collaborator.model";
import { CalendarEvent } from "../../pages/platform/pages/calendar-page/calendar-event.model";
import { TemplateData } from "../../pages/platform/pages/templates-page/template.model";
import { MockPapersContent } from "./consts/paper-content";
import { PaperContent } from "../../pages/platform/pages/paper-detail-page/paper-detail.model";

// ── Display label maps ────────────────────────────────────────────────────────
const STAGE_LABELS: Record<string, string> = {
  drafting: 'Drafting', review: 'Review', revision: 'Revision',
  submitted: 'Submitted', complete: 'Complete', outline: 'Outline',
};

const SELF = { initials: 'RF', name: 'Ruben F.' };

@Injectable({ providedIn: "root" })
export class MockContentService {

  // ── Writable signal stores ─────────────────────────────────────────────────
  private readonly _papers = signal<PaperDoc[]>([...PAPERS_DB]);
  private readonly _tasks = signal<TaskDoc[]>([...TASKS_DB]);
  private readonly _reviewQueue = signal<ReviewQueueDoc[]>([...REVIEW_QUEUE_DB]);
  private readonly _submissions = signal<SubmissionDoc[]>([...SUBMISSIONS_DB]);
  private readonly _collaborators = signal<CollaboratorDoc[]>([...COLLABORATORS_DB]);
  private readonly _calendarEvents = signal(CALENDAR_EVENTS_DB);
  private readonly _templates = signal<TemplateDoc[]>([...TEMPLATES_DB]);

  // ── Reference resolution helpers ───────────────────────────────────────────

  private collaboratorDoc(id: string): { initials: string; name: string } {
    if (id === 'self') return SELF;
    const doc = this._collaborators().find(c => c.uid === id);
    return doc ? { initials: doc.initials, name: doc.name } : { initials: '?', name: 'Unknown' };
  }

  private shortName(col: CollaboratorDoc): string {
    const clean = col.name.replace(/^(Dr\.|Prof\.)\s+/, '');
    const parts = clean.split(' ');
    return `${parts[0]} ${parts[parts.length - 1][0]}.`;
  }

  private reviewer(id: string): { initials: string; name: string } {
    if (id === 'self') return SELF;
    const doc = this._collaborators().find(c => c.uid === id);
    return doc ? { initials: doc.initials, name: this.shortName(doc) } : { initials: '?', name: 'Unknown' };
  }

  private paperAvatars(ids: string[], externalCount: number): { initials: string[]; extra: string } {
    const shown = ids.slice(0, 3);
    const initials = shown.map(id => this._collaborators().find(c => c.uid === id)?.initials ?? '').filter(Boolean);
    const hidden = Math.max(0, ids.length - 3) + externalCount;
    return { initials, extra: hidden > 0 ? `+${hidden}` : '' };
  }

  private paperTitleFromDocs(uid: string, docs: PaperDoc[]): string {
    return docs.find(p => p.uid === uid)?.title ?? uid;
  }

  // ── Collection → view-model transforms ────────────────────────────────────

  private docToPaper(doc: PaperDoc): PaperData {
    return {
      uid: doc.uid,
      title: doc.title,
      topic: doc.topic,
      featured: doc.featured,
      category: doc.category,
      stage: { label: STAGE_LABELS[doc.stage] ?? doc.stage, tone: doc.stage as PaperData['stage']['tone'] },
      progress: { value: doc.progress, tone: doc.progressTone as PaperData['progress']['tone'] },
      deadline: { date: doc.deadlineDate, datetime: doc.deadlineDatetime, status: doc.deadlineStatus, tone: doc.deadlineTone as PaperData['deadline']['tone'] },
      collaborators: this.paperAvatars(doc.collaboratorIds, doc.externalCollaboratorCount),
      updated: { label: doc.updatedAtLabel, datetime: doc.updatedAt },
    };
  }

  private docToTask(doc: TaskDoc): TaskData {
    const assignee = doc.assigneeId === 'self'
      ? SELF
      : (() => {
          const col = this._collaborators().find(c => c.uid === doc.assigneeId);
          return col ? { initials: col.initials, name: col.name.split(' ')[0] + ' ' + col.name.split(' ').pop()![0] + '.' } : SELF;
        })();
    return {
      uid: doc.uid,
      title: doc.title,
      commentsCount: doc.commentsCount,
      linkedPaper: this.paperTitleFromDocs(doc.paperUid, this._papers()),
      linkedPaperUid: doc.paperUid,
      priority: doc.priority,
      status: doc.status,
      assignee,
      dueDate: { date: doc.dueDateAt, datetime: doc.dueDateAt, label: doc.dueDateLabel, tone: doc.dueDateTone as 'danger' | 'warning' | undefined },
      progress: doc.progress,
      updatedAt: { label: doc.updatedAtLabel, datetime: doc.updatedAt },
      category: doc.category,
    };
  }

  private docToReviewItem(doc: ReviewQueueDoc): ReviewItem {
    return {
      uid: doc.uid,
      paperTitle: this.paperTitleFromDocs(doc.paperUid, this._papers()),
      paperUid: doc.paperUid,
      reviewType: doc.reviewType,
      reviewer: this.reviewer(doc.reviewerId),
      priority: doc.priority,
      status: doc.status,
      submittedDate: doc.submittedDate,
      submittedDatetime: doc.submittedDatetime,
      deadline: { date: doc.deadlineDate, datetime: doc.deadlineDatetime, label: doc.deadlineLabel, tone: doc.deadlineTone as 'danger' | 'warning' | undefined },
      commentsCount: doc.commentsCount,
      category: doc.category,
    };
  }

  private docToSubmission(doc: SubmissionDoc): SubmissionData {
    return {
      uid: doc.uid,
      paperTitle: this.paperTitleFromDocs(doc.paperUid, this._papers()),
      paperUid: doc.paperUid,
      journal: doc.journal,
      journalShort: doc.journalShort,
      submittedDate: doc.submittedDate,
      submittedDatetime: doc.submittedDatetime,
      status: doc.status,
      reviewDays: doc.reviewDays,
      impactFactor: doc.impactFactor,
      round: doc.round,
      decisionDate: doc.decisionDate,
      decisionDatetime: doc.decisionDatetime,
    };
  }

  private docToCollaborator(doc: CollaboratorDoc): CollaboratorData {
    return {
      uid: doc.uid,
      name: doc.name,
      initials: doc.initials,
      role: doc.role,
      institution: doc.institution,
      department: doc.department,
      email: doc.email,
      papersCount: doc.papersCount,
      lastActive: doc.lastActive,
      lastActiveDatetime: doc.lastActiveDatetime,
      status: doc.status,
      avatarTone: doc.avatarTone,
    };
  }

  // ── Public computed signals ────────────────────────────────────────────────

  readonly papers = computed<PaperData[]>(() => this._papers().map(doc => this.docToPaper(doc)));
  readonly collaborators = computed<CollaboratorData[]>(() => this._collaborators().map(doc => this.docToCollaborator(doc)));
  readonly templates = computed<TemplateData[]>(() => this._templates().map(doc => ({ ...doc })));

  readonly papersTableConfig = computed<DynamicTableConfig>(() => ({
    data: this.papers(), columns: PAPER_COLUMNS, tabs: PAPER_TABS,
    featured: (row) => !!(row as PaperData).featured,
  }));

  readonly tasksTableConfig = computed<DynamicTableConfig>(() => ({
    data: this._tasks().map(doc => this.docToTask(doc)),
    columns: TASK_COLUMNS, tabs: TASK_TABS,
    filters: TASK_FILTER_DEFS, searchable: true,
    searchPlaceholder: 'Search tasks...',
    searchFilter: (row, query) => {
      const t = row as TaskData;
      return t.title.toLowerCase().includes(query) || t.linkedPaper.toLowerCase().includes(query);
    },
    selectable: true, rowKey: (row) => (row as TaskData).uid, pageSize: 10,
  }));

  readonly reviewQueueTableConfig = computed<DynamicTableConfig>(() => ({
    data: this._reviewQueue().map(doc => this.docToReviewItem(doc)),
    columns: REVIEW_COLUMNS, tabs: REVIEW_TABS,
    filters: REVIEW_FILTER_DEFS, searchable: true,
    searchPlaceholder: 'Search reviews...',
    searchFilter: (row, query) => {
      const r = row as ReviewItem;
      return r.paperTitle.toLowerCase().includes(query) || r.reviewer.name.toLowerCase().includes(query);
    },
    pageSize: 8,
  }));

  readonly submissionsTableConfig = computed<DynamicTableConfig>(() => ({
    data: this._submissions().map(doc => this.docToSubmission(doc)),
    columns: SUBMISSIONS_COLUMNS, tabs: SUBMISSIONS_TABS,
    filters: SUBMISSIONS_FILTER_DEFS, searchable: true,
    searchPlaceholder: 'Search submissions...',
    searchFilter: (row, query) => {
      const s = row as SubmissionData;
      return s.paperTitle.toLowerCase().includes(query) || s.journal.toLowerCase().includes(query);
    },
    pageSize: 8,
  }));

  // ── Mutation methods ───────────────────────────────────────────────────────

  addPaper(doc: Omit<PaperDoc, 'uid'>): void {
    this._papers.update(list => [...list, { ...doc, uid: crypto.randomUUID() }]);
  }

  addTask(doc: Omit<TaskDoc, 'uid'>): void {
    this._tasks.update(list => [...list, { ...doc, uid: crypto.randomUUID() }]);
  }

  addCollaborator(doc: Omit<CollaboratorDoc, 'uid'>): void {
    this._collaborators.update(list => [...list, { ...doc, uid: crypto.randomUUID() }]);
  }

  addTemplate(doc: Omit<TemplateDoc, 'uid'>): void {
    this._templates.update(list => [...list, { ...doc, uid: crypto.randomUUID() }]);
  }

  addSubmission(doc: Omit<SubmissionDoc, 'uid'>): void {
    this._submissions.update(list => [...list, { ...doc, uid: crypto.randomUUID() }]);
  }

  addReviewItem(doc: Omit<ReviewQueueDoc, 'uid'>): void {
    this._reviewQueue.update(list => [...list, { ...doc, uid: crypto.randomUUID() }]);
  }

  // ── Public API (static/derived) ────────────────────────────────────────────

  get SideNavItems(): PlatformNavItem[] { return SIDE_NAV_ITEMS; }
  get StatCards(): StatCardData[] { return STAT_CARDS; }
  get TaskStatCards(): StatCardData[] { return TASK_STAT_CARDS; }
  get ReviewQueueStatCards(): StatCardData[] { return REVIEW_QUEUE_STAT_CARDS; }
  get SubmissionsStatCards(): StatCardData[] { return SUBMISSIONS_STAT_CARDS; }
  get CollaboratorsStatCards(): StatCardData[] { return COLLABORATORS_STAT_CARDS; }
  get CalendarStatCards(): StatCardData[] { return CALENDAR_STAT_CARDS; }
  get TemplatesStatCards(): StatCardData[] { return TEMPLATES_STAT_CARDS; }
  get AnalyticsStatCards(): StatCardData[] { return ANALYTICS_STAT_CARDS; }

  get CalendarEvents(): CalendarEvent[] {
    return CALENDAR_EVENTS_DB.map(doc => ({
      uid: doc.uid,
      title: doc.title,
      type: doc.type,
      date: doc.date,
      datetime: doc.datetime,
      time: doc.time,
      description: doc.description,
      relatedPaper: doc.relatedPaperUid ? this.paperTitleFromDocs(doc.relatedPaperUid, this._papers()) : undefined,
      relatedPaperUid: doc.relatedPaperUid,
      tone: doc.tone,
    }));
  }

  get AnalyticsData(): { publicationsByYear: PublicationYear[]; venues: VenueData[]; topics: TopicData[] } {
    return { publicationsByYear: PUBLICATIONS_BY_YEAR, venues: VENUES_DATA, topics: TOPICS_DATA };
  }

  getPaperContentById(_id: string): Promise<PaperContent> {
    return Promise.resolve(MockPapersContent);
  }
}
