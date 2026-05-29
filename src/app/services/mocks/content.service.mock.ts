import { Injectable } from "@angular/core";
import { SIDE_NAV_ITEMS } from "./consts/nav-items.const";
import { STAT_CARDS } from "./consts/stat-cards.const";
import { TASK_STAT_CARDS } from "./consts/task-stat-cards.const";
import { StatCardData } from "../../pages/platform/shared-components/stat-card/stat-card";
import { PlatformNavItem } from "../../pages/platform/sections/side-nav/side-nav";
import { DynamicTableConfig } from "../../pages/platform/shared-components/custom-dynamic-table/custom-dynamic-table.model";
import { PAPER_COLUMNS, PAPER_DATA, PAPER_TABS } from "./consts/papers-table.const";
import { TASK_COLUMNS, TASK_DATA, TASK_FILTER_DEFS, TASK_TABS } from "./consts/tasks-table.const";
import { PaperData } from "../../pages/platform/pages/papers-page/papers-model";
import { TaskData } from "../../pages/platform/pages/tasks-page/task.model";
import { MockPapersContent } from "./consts/paper-content";
import { PaperContent } from "../../pages/platform/pages/paper-detail-page/paper-detail.model";

@Injectable({
    providedIn: "root",
})
export class MockContentService {
    get SideNavItems(): PlatformNavItem[] {
        return SIDE_NAV_ITEMS;
    }

    get StatCards(): StatCardData[] {
        return STAT_CARDS;
    }

    get TaskStatCards(): StatCardData[] {
        return TASK_STAT_CARDS;
    }

    get PapersTableConfig(): DynamicTableConfig {
        return {
            data: PAPER_DATA,
            columns: PAPER_COLUMNS,
            tabs: PAPER_TABS,
            featured: (row) => !!(row as PaperData).featured,
        };
    };

    get PapersData(): PaperData[] {
        return PAPER_DATA;
    }

    get TasksTableConfig(): DynamicTableConfig {
        return {
            data: TASK_DATA,
            columns: TASK_COLUMNS,
            tabs: TASK_TABS,
            filters: TASK_FILTER_DEFS,
            searchable: true,
            searchPlaceholder: 'Search tasks...',
            searchFilter: (row, query) => {
                const task = row as TaskData;
                return (
                    task.title.toLowerCase().includes(query) ||
                    task.linkedPaper.toLowerCase().includes(query)
                );
            },
            selectable: true,
            rowKey: (row) => (row as TaskData).uid,
            pageSize: 10,
        };
    }

    getPaperContentById(id: string): Promise<PaperContent> {
        return Promise.resolve(MockPapersContent);
    }
}
