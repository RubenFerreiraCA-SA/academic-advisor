import { Component } from '@angular/core';

@Component({
  selector: 'app-log-in',
  imports: [],
  templateUrl: './log-in.html',
  styleUrl: './log-in.scss',
})
export class LogIn {
  protected passwordVisible = false;

  protected togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }
}
