import { Component, output, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../../../services/auth/auth';

@Component({
  selector: 'app-log-in',
  imports: [ReactiveFormsModule],
  templateUrl: './log-in.html',
  styleUrl: './log-in.scss',
})
export class LogIn {
  readonly createAccountRequested = output<void>();

  protected passwordVisible = false;
  protected readonly loading = signal(false);
  protected readonly errorMessage = signal('');
  protected readonly successMessage = signal('');

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
    this.clearMessages();

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.errorMessage.set('Enter a valid email address and password.');
      return;
    }

    const { email, password, rememberMe } = this.loginForm.getRawValue();
    this.loading.set(true);

    try {
      await this.auth.signInWithEmail(email, password, {
        persistence: rememberMe ? 'local' : 'session',
      });
      this.successMessage.set('Signed in successfully.');
    } catch (error) {
      this.errorMessage.set(await this.getEmailSignInErrorMessage(email, error));
    } finally {
      this.loading.set(false);
    }
  }

  protected async signInWithGoogle(): Promise<void> {
    this.clearMessages();
    this.loading.set(true);

    try {
      await this.auth.signInWithGoogle(this.loginForm.controls.rememberMe.value ? 'local' : 'session');
      this.successMessage.set('Signed in successfully.');
    } catch (error) {
      this.errorMessage.set(this.getAuthErrorMessage(error));
    } finally {
      this.loading.set(false);
    }
  }

  protected async sendPasswordReset(): Promise<void> {
    this.clearMessages();

    const emailControl = this.loginForm.controls.email;

    if (emailControl.invalid) {
      emailControl.markAsTouched();
      this.errorMessage.set('Enter your email address first.');
      return;
    }

    this.loading.set(true);

    try {
      await this.auth.sendPasswordReset(emailControl.value);
      this.successMessage.set('Password reset email sent.');
    } catch (error) {
      this.errorMessage.set(this.getAuthErrorMessage(error));
    } finally {
      this.loading.set(false);
    }
  }

  private clearMessages(): void {
    this.errorMessage.set('');
    this.successMessage.set('');
  }

  private getAuthErrorMessage(error: unknown): string {
    const code = typeof error === 'object' && error !== null && 'code' in error ? error.code : '';

    switch (code) {
      case 'auth/account-exists-with-different-credential':
        return 'This email is already connected to another sign-in method. Try Google sign-in.';
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

  private async getEmailSignInErrorMessage(email: string, error: unknown): Promise<string> {
    const code = typeof error === 'object' && error !== null && 'code' in error ? error.code : '';

    if (!['auth/invalid-credential', 'auth/user-not-found', 'auth/wrong-password'].includes(String(code))) {
      return this.getAuthErrorMessage(error);
    }

    try {
      const methods = await this.auth.getSignInMethodsForEmail(email);

      if (methods.length === 0) {
        return 'No account exists for this email address. Create an account first.';
      }

      if (methods.includes('google.com') && !methods.includes('password')) {
        return 'This email uses Google sign-in. Continue with Google instead.';
      }

      if (methods.includes('password')) {
        return 'The password is incorrect.';
      }
    } catch {
      return 'The email or password is incorrect.';
    }

    return 'The email or password is incorrect.';
  }
}
