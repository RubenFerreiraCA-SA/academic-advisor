import { Injectable } from "@angular/core";
import { SIDE_NAV_ITEMS } from "./consts/nav-items.const";
import { STAT_CARDS } from "./consts/stat-cards.const";
import { TASK_STAT_CARDS } from "./consts/task-stat-cards.const";
import { REVIEW_COLUMNS, REVIEW_DATA, REVIEW_FILTER_DEFS, REVIEW_QUEUE_STAT_CARDS, REVIEW_TABS } from "./consts/review-queue.const";
import { SUBMISSIONS_COLUMNS, SUBMISSIONS_DATA, SUBMISSIONS_FILTER_DEFS, SUBMISSIONS_STAT_CARDS, SUBMISSIONS_TABS } from "./consts/submissions.const";
import { COLLABORATORS_DATA, COLLABORATORS_STAT_CARDS } from "./consts/collaborators.const";
import { CALENDAR_EVENTS, CALENDAR_STAT_CARDS } from "./consts/calendar-events.const";
import { TEMPLATES_DATA, TEMPLATES_STAT_CARDS } from "./consts/templates.const";
import { ANALYTICS_STAT_CARDS, PUBLICATIONS_BY_YEAR, PublicationYear, TOPICS_DATA, TopicData, VENUES_DATA, VenueData } from "./consts/analytics.const";
import { StatCardData } from "../../pages/platform/shared-components/stat-card/stat-card";
import { PlatformNavItem } from "../../pages/platform/sections/side-nav/side-nav";
import { DynamicTableConfig } from "../../pages/platform/shared-components/custom-dynamic-table/custom-dynamic-table.model";
import { PAPER_COLUMNS, PAPER_DATA, PAPER_TABS } from "./consts/papers-table.const";
import { TASK_COLUMNS, TASK_DATA, TASK_FILTER_DEFS, TASK_TABS } from "./consts/tasks-table.const";
import { PaperData } from "../../pages/platform/pages/papers-page/papers-model";
import { TaskData } from "../../pages/platform/pages/tasks-page/task.model";
import { ReviewItem } from "../../pages/platform/pages/review-queue-page/review-queue.model";
import { SubmissionData } from "../../pages/platform/pages/submissions-page/submission.model";
import { CollaboratorData } from "../../pages/platform/pages/collaborators-page/collaborator.model";
import { CalendarEvent } from "../../pages/platform/pages/calendar-page/calendar-event.model";
import { TemplateData } from "../../pages/platform/pages/templates-page/template.model";
import { MockPapersContent } from "./consts/paper-content";
import { PaperContent } from "../../pages/platform/pages/paper-detail-page/paper-detail.model";

@Injectable({ providedIn: "root" })
export class MockContentService {
  get SideNavItems(): PlatformNavItem[] { return SIDE_NAV_ITEMS; }
  get StatCards(): StatCardData[] { return STAT_CARDS; }
  get TaskStatCards(): StatCardData[] { return TASK_STAT_CARDS; }
  get ReviewQueueStatCards(): StatCardData[] { return REVIEW_QUEUE_STAT_CARDS; }
  get SubmissionsStatCards(): StatCardData[] { return SUBMISSIONS_STAT_CARDS; }
  get CollaboratorsStatCards(): StatCardData[] { return COLLABORATORS_STAT_CARDS; }
  get CalendarStatCards(): StatCardData[] { return CALENDAR_STAT_CARDS; }
  get TemplatesStatCards(): StatCardData[] { return TEMPLATES_STAT_CARDS; }
  get AnalyticsStatCards(): StatCardData[] { return ANALYTICS_STAT_CARDS; }

  get PapersTableConfig(): DynamicTableConfig {
    return {
      data: PAPER_DATA, columns: PAPER_COLUMNS, tabs: PAPER_TABS,
      featured: (row) => !!(row as PaperData).featured,
    };
  }

  get PapersData(): PaperData[] { return PAPER_DATA; }

  get TasksTableConfig(): DynamicTableConfig {
    return {
      data: TASK_DATA, columns: TASK_COLUMNS, tabs: TASK_TABS,
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
      data: REVIEW_DATA, columns: REVIEW_COLUMNS, tabs: REVIEW_TABS,
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
      data: SUBMISSIONS_DATA, columns: SUBMISSIONS_COLUMNS, tabs: SUBMISSIONS_TABS,
      filters: SUBMISSIONS_FILTER_DEFS, searchable: true,
      searchPlaceholder: 'Search submissions...',
      searchFilter: (row, query) => {
        const s = row as SubmissionData;
        return s.paperTitle.toLowerCase().includes(query) || s.journal.toLowerCase().includes(query);
      },
      pageSize: 8,
    };
  }

  get CollaboratorsData(): CollaboratorData[] { return COLLABORATORS_DATA; }
  get CalendarEvents(): CalendarEvent[] { return CALENDAR_EVENTS; }
  get TemplatesData(): TemplateData[] { return TEMPLATES_DATA; }

  get AnalyticsData(): { publicationsByYear: PublicationYear[]; venues: VenueData[]; topics: TopicData[] } {
    return { publicationsByYear: PUBLICATIONS_BY_YEAR, venues: VENUES_DATA, topics: TOPICS_DATA };
  }

  getPaperContentById(_id: string): Promise<PaperContent> {
    return Promise.resolve(MockPapersContent);
  }
}
