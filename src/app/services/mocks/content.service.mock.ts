import { Injectable } from "@angular/core";

// ── Firestore-like collection documents ───────────────────────────────────────
import { COLLABORATORS_DB, CollaboratorDoc } from "./db/collaborators.db";
import { PAPERS_DB } from "./db/papers.db";
import { TASKS_DB } from "./db/tasks.db";
import { REVIEW_QUEUE_DB } from "./db/review-queue.db";
import { SUBMISSIONS_DB } from "./db/submissions.db";
import { CALENDAR_EVENTS_DB } from "./db/calendar-events.db";
import { TEMPLATES_DB } from "./db/templates.db";

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

  // ── Reference resolution helpers ───────────────────────────────────────────

  /** Resolve a collaborator ID to { initials, name }. 'self' returns the logged-in user. */
  private collaborator(id: string): { initials: string; name: string } {
    if (id === 'self') return SELF;
    const doc = COLLABORATORS_DB.find(c => c.uid === id);
    return doc ? { initials: doc.initials, name: doc.name } : { initials: '?', name: 'Unknown' };
  }

  /** Short display name: strips honorifics, returns "First L." */
  private shortName(col: CollaboratorDoc): string {
    const clean = col.name.replace(/^(Dr\.|Prof\.)\s+/, '');
    const parts = clean.split(' ');
    return `${parts[0]} ${parts[parts.length - 1][0]}.`;
  }

  /** Resolve a reviewer ID to short-form { initials, name }. */
  private reviewer(id: string): { initials: string; name: string } {
    if (id === 'self') return SELF;
    const doc = COLLABORATORS_DB.find(c => c.uid === id);
    return doc ? { initials: doc.initials, name: this.shortName(doc) } : { initials: '?', name: 'Unknown' };
  }

  /** Resolve collaboratorIds + externalCount → avatar display { initials[], extra } */
  private paperAvatars(ids: string[], externalCount: number): { initials: string[]; extra: string } {
    const shown = ids.slice(0, 3);
    const initials = shown.map(id => COLLABORATORS_DB.find(c => c.uid === id)?.initials ?? '').filter(Boolean);
    const hidden = Math.max(0, ids.length - 3) + externalCount;
    return { initials, extra: hidden > 0 ? `+${hidden}` : '' };
  }

  /** Resolve a paper UID to its title. */
  private paperTitle(uid: string): string {
    return PAPERS_DB.find(p => p.uid === uid)?.title ?? uid;
  }

  // ── Collection → view-model builders ───────────────────────────────────────

  private buildPapers(): PaperData[] {
    return PAPERS_DB.map(doc => ({
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
    }));
  }

  private buildTasks(): TaskData[] {
    return TASKS_DB.map(doc => {
      const assignee = doc.assigneeId === 'self'
        ? SELF
        : (() => { const col = COLLABORATORS_DB.find(c => c.uid === doc.assigneeId); return col ? { initials: col.initials, name: col.name.split(' ')[0] + ' ' + col.name.split(' ').pop()![0] + '.' } : SELF; })();
      return {
        uid: doc.uid,
        title: doc.title,
        commentsCount: doc.commentsCount,
        linkedPaper: this.paperTitle(doc.paperUid),
        linkedPaperUid: doc.paperUid,
        priority: doc.priority,
        status: doc.status,
        assignee,
        dueDate: { date: doc.dueDateAt, datetime: doc.dueDateAt, label: doc.dueDateLabel, tone: doc.dueDateTone as 'danger' | 'warning' | undefined },
        progress: doc.progress,
        updatedAt: { label: doc.updatedAtLabel, datetime: doc.updatedAt },
        category: doc.category,
      };
    });
  }

  private buildReviewQueue(): ReviewItem[] {
    return REVIEW_QUEUE_DB.map(doc => ({
      uid: doc.uid,
      paperTitle: this.paperTitle(doc.paperUid),
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
    }));
  }

  private buildSubmissions(): SubmissionData[] {
    return SUBMISSIONS_DB.map(doc => ({
      uid: doc.uid,
      paperTitle: this.paperTitle(doc.paperUid),
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
    }));
  }

  private buildCollaborators(): CollaboratorData[] {
    return COLLABORATORS_DB.map(doc => ({
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
    }));
  }

  private buildCalendarEvents(): CalendarEvent[] {
    return CALENDAR_EVENTS_DB.map(doc => ({
      uid: doc.uid,
      title: doc.title,
      type: doc.type,
      date: doc.date,
      datetime: doc.datetime,
      time: doc.time,
      description: doc.description,
      relatedPaper: doc.relatedPaperUid ? this.paperTitle(doc.relatedPaperUid) : undefined,
      relatedPaperUid: doc.relatedPaperUid,
      tone: doc.tone,
    }));
  }

  private buildTemplates(): TemplateData[] {
    return TEMPLATES_DB.map(doc => ({ ...doc }));
  }

  // ── Public API (same interface as before — swap mock → real service here) ───

  get SideNavItems(): PlatformNavItem[] { return SIDE_NAV_ITEMS; }
  get StatCards(): StatCardData[] { return STAT_CARDS; }
  get TaskStatCards(): StatCardData[] { return TASK_STAT_CARDS; }
  get ReviewQueueStatCards(): StatCardData[] { return REVIEW_QUEUE_STAT_CARDS; }
  get SubmissionsStatCards(): StatCardData[] { return SUBMISSIONS_STAT_CARDS; }
  get CollaboratorsStatCards(): StatCardData[] { return COLLABORATORS_STAT_CARDS; }
  get CalendarStatCards(): StatCardData[] { return CALENDAR_STAT_CARDS; }
  get TemplatesStatCards(): StatCardData[] { return TEMPLATES_STAT_CARDS; }
  get AnalyticsStatCards(): StatCardData[] { return ANALYTICS_STAT_CARDS; }

  get PapersData(): PaperData[] { return this.buildPapers(); }

  get PapersTableConfig(): DynamicTableConfig {
    return {
      data: this.buildPapers(), columns: PAPER_COLUMNS, tabs: PAPER_TABS,
      featured: (row) => !!(row as PaperData).featured,
    };
  }

  get TasksTableConfig(): DynamicTableConfig {
    return {
      data: this.buildTasks(), columns: TASK_COLUMNS, tabs: TASK_TABS,
      filters: TASK_FILTER_DEFS, searchable: true,
      searchPlaceholder: 'Search tasks...',
      searchFilter: (row, query) => {
        const t = row as TaskData;
        return t.title.toLowerCase().includes(query) || t.linkedPaper.toLowerCase().includes(query);
      },
      selectable: true, rowKey: (row) => (row as TaskData).uid, pageSize: 10,
    };
  }

  get ReviewQueueTableConfig(): DynamicTableConfig {
    return {
      data: this.buildReviewQueue(), columns: REVIEW_COLUMNS, tabs: REVIEW_TABS,
      filters: REVIEW_FILTER_DEFS, searchable: true,
      searchPlaceholder: 'Search reviews...',
      searchFilter: (row, query) => {
        const r = row as ReviewItem;
        return r.paperTitle.toLowerCase().includes(query) || r.reviewer.name.toLowerCase().includes(query);
      },
      pageSize: 8,
    };
  }

  get SubmissionsTableConfig(): DynamicTableConfig {
    return {
      data: this.buildSubmissions(), columns: SUBMISSIONS_COLUMNS, tabs: SUBMISSIONS_TABS,
      filters: SUBMISSIONS_FILTER_DEFS, searchable: true,
      searchPlaceholder: 'Search submissions...',
      searchFilter: (row, query) => {
        const s = row as SubmissionData;
        return s.paperTitle.toLowerCase().includes(query) || s.journal.toLowerCase().includes(query);
      },
      pageSize: 8,
    };
  }

  get CollaboratorsData(): CollaboratorData[] { return this.buildCollaborators(); }
  get CalendarEvents(): CalendarEvent[] { return this.buildCalendarEvents(); }
  get TemplatesData(): TemplateData[] { return this.buildTemplates(); }

  get AnalyticsData(): { publicationsByYear: PublicationYear[]; venues: VenueData[]; topics: TopicData[] } {
    return { publicationsByYear: PUBLICATIONS_BY_YEAR, venues: VENUES_DATA, topics: TOPICS_DATA };
  }

  getPaperContentById(_id: string): Promise<PaperContent> {
    return Promise.resolve(MockPapersContent);
  }
}
