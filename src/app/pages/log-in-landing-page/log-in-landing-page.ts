import { Component, signal } from '@angular/core';
import { CreateAccount } from './sections/create-account/create-account';
import { LogIn } from './sections/log-in/log-in';
import { Marketing } from './sections/marketing/marketing';

@Component({
  selector: 'app-log-in-landing-page',
  imports: [CreateAccount, Marketing, LogIn],
  templateUrl: './log-in-landing-page.html',
  styleUrl: './log-in-landing-page.scss',
})
export class LogInLandingPage {
  protected readonly authView = signal<'sign-in' | 'create-account'>('sign-in');
}
