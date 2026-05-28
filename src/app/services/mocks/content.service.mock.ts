import { Injectable } from "@angular/core";
import { SideNavItems } from "./consts/nav-items.const";

@Injectable({
    providedIn: "root",
})
export class MockContentService {
    get SideNavItems() {
        return SideNavItems;
    }
}