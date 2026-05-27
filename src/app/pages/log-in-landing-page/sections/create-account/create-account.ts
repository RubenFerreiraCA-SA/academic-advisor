import { Component, output, signal } from '@angular/core';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Auth } from '../../../../services/auth/auth';

@Component({
  selector: 'app-create-account',
  imports: [ReactiveFormsModule],
  templateUrl: './create-account.html',
  styleUrl: './create-account.scss',
})
export class CreateAccount {
  readonly signInRequested = output<void>();

  protected passwordVisible = false;
  protected confirmPasswordVisible = false;
  protected readonly loading = signal(false);
  protected readonly errorMessage = signal('');
  protected readonly successMessage = signal('');

  protected readonly createAccountForm;

  constructor(
    private readonly formBuilder: NonNullableFormBuilder,
    private readonly auth: Auth,
  ) {
    this.createAccountForm = this.formBuilder.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        institution: ['', [Validators.required]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
        acceptedTerms: [true, [Validators.requiredTrue]],
        productUpdates: [true],
      },
      { validators: this.passwordsMatchValidator },
    );
  }

  protected togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  protected toggleConfirmPasswordVisibility(): void {
    this.confirmPasswordVisible = !this.confirmPasswordVisible;
  }

  protected async createAccount(): Promise<void> {
    this.clearMessages();

    if (this.createAccountForm.invalid) {
      this.createAccountForm.markAllAsTouched();
      this.errorMessage.set(this.getValidationMessage());
      return;
    }

    const { firstName, lastName, email, password } = this.createAccountForm.getRawValue();
    const displayName = `${firstName.trim()} ${lastName.trim()}`.trim();
    this.loading.set(true);

    try {
      await this.auth.registerWithEmail(email, password, {
        displayName,
        persistence: 'local',
      });
      this.successMessage.set('Account created successfully.');
    } catch (error) {
      this.errorMessage.set(this.getAuthErrorMessage(error));
    } finally {
      this.loading.set(false);
    }
  }

  protected async signUpWithGoogle(): Promise<void> {
    this.clearMessages();
    this.loading.set(true);

    try {
      await this.auth.signInWithGoogle('local');
      this.successMessage.set('Account created successfully.');
    } catch (error) {
      this.errorMessage.set(this.getAuthErrorMessage(error));
    } finally {
      this.loading.set(false);
    }
  }

  private passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    return password && confirmPassword && password !== confirmPassword ? { passwordsMismatch: true } : null;
  }

  private clearMessages(): void {
    this.errorMessage.set('');
    this.successMessage.set('');
  }

  private getValidationMessage(): string {
    if (this.createAccountForm.hasError('passwordsMismatch')) {
      return 'Passwords do not match.';
    }

    if (this.createAccountForm.controls.password.hasError('minlength')) {
      return 'Password must be at least 8 characters.';
    }

    if (this.createAccountForm.controls.acceptedTerms.invalid) {
      return 'Agree to the Terms of Service and Privacy Policy to continue.';
    }

    return 'Complete all required fields with valid information.';
  }

  private getAuthErrorMessage(error: unknown): string {
    const code = typeof error === 'object' && error !== null && 'code' in error ? error.code : '';

    switch (code) {
      case 'auth/email-already-in-use':
        return 'An account already exists for this email. Sign in instead.';
      case 'auth/invalid-email':
        return 'Enter a valid email address.';
      case 'auth/weak-password':
        return 'Choose a stronger password.';
      case 'auth/popup-closed-by-user':
        return 'Google sign-up was cancelled.';
      case 'auth/network-request-failed':
        return 'Network error. Check your connection and try again.';
      default:
        return 'Something went wrong. Please try again.';
    }
  }
}
