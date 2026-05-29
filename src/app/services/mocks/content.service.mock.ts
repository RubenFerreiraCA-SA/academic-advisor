import { Injectable } from "@angular/core";
import { SIDE_NAV_ITEMS } from "./consts/nav-items.const";
import { STAT_CARDS } from "./consts/stat-cards.const";
import { StatCardData } from "../../pages/platform/shared-components/stat-card/stat-card";
import { PlatformNavItem } from "../../pages/platform/sections/side-nav/side-nav";
import { DynamicTableConfig } from "../../pages/platform/shared-components/custom-dynamic-table/custom-dynamic-table.model";
import { PAPER_COLUMNS, PAPER_DATA, PAPER_TABS } from "./consts/papers-table.const";
import { PaperData } from "../../pages/platform/pages/papers-page/papers-model";

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
}