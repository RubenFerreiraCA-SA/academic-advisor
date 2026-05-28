import { Component } from '@angular/core';

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
  imports: [],
  templateUrl: './top-nav.html',
  styleUrl: './top-nav.scss',
})
export class TopNav {
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

}
