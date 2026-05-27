import { Component } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../../../services/auth/auth';

@Component({
  selector: 'app-log-in',
  imports: [ReactiveFormsModule],
  templateUrl: './log-in.html',
  styleUrl: './log-in.scss',
})
export class LogIn {
  protected passwordVisible = false;
  protected loading = false;
  protected errorMessage = '';
  protected successMessage = '';

  protected readonly loginForm;

  constructor(
    private readonly formBuilder: NonNullableFormBuilder,
    private readonly auth: Auth,
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [true],
    });
  }

  protected togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  protected async signIn(): Promise<void> {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.errorMessage = 'Enter a valid email address and password.';
      return;
    }

    const { email, password, rememberMe } = this.loginForm.getRawValue();
    this.loading = true;

    try {
      await this.auth.signInWithEmail(email, password, {
        persistence: rememberMe ? 'local' : 'session',
      });
      this.successMessage = 'Signed in successfully.';
    } catch (error) {
      this.errorMessage = this.getAuthErrorMessage(error);
    } finally {
      this.loading = false;
    }
  }

  protected async signInWithGoogle(): Promise<void> {
    this.errorMessage = '';
    this.successMessage = '';
    this.loading = true;

    try {
      await this.auth.signInWithGoogle(this.loginForm.controls.rememberMe.value ? 'local' : 'session');
      this.successMessage = 'Signed in successfully.';
    } catch (error) {
      this.errorMessage = this.getAuthErrorMessage(error);
    } finally {
      this.loading = false;
    }
  }

  protected async sendPasswordReset(): Promise<void> {
    this.errorMessage = '';
    this.successMessage = '';

    const emailControl = this.loginForm.controls.email;

    if (emailControl.invalid) {
      emailControl.markAsTouched();
      this.errorMessage = 'Enter your email address first.';
      return;
    }

    this.loading = true;

    try {
      await this.auth.sendPasswordReset(emailControl.value);
      this.successMessage = 'Password reset email sent.';
    } catch (error) {
      this.errorMessage = this.getAuthErrorMessage(error);
    } finally {
      this.loading = false;
    }
  }

  private getAuthErrorMessage(error: unknown): string {
    const code = typeof error === 'object' && error !== null && 'code' in error ? error.code : '';

    switch (code) {
      case 'auth/invalid-credential':
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        return 'The email or password is incorrect.';
      case 'auth/popup-closed-by-user':
        return 'Google sign-in was cancelled.';
      case 'auth/too-many-requests':
        return 'Too many attempts. Try again later.';
      case 'auth/network-request-failed':
        return 'Network error. Check your connection and try again.';
      default:
        return 'Something went wrong. Please try again.';
    }
  }
}
