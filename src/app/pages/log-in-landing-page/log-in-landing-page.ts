import { Component } from '@angular/core';
import { LogIn } from './sections/log-in/log-in';
import { Marketing } from './sections/marketing/marketing';

@Component({
  selector: 'app-log-in-landing-page',
  imports: [Marketing, LogIn],
  templateUrl: './log-in-landing-page.html',
  styleUrl: './log-in-landing-page.scss',
})
export class LogInLandingPage {}
