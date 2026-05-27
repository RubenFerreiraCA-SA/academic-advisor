import { Injectable } from '@angular/core';
import { initializeApp, getApp, getApps } from 'firebase/app';
import {
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  type Auth as FirebaseAuth,
  type User,
  type UserCredential,
} from 'firebase/auth';
import { BehaviorSubject, distinctUntilChanged, map } from 'rxjs';
import { environment } from '../../../environments/environment';

export type AuthPersistence = 'local' | 'session';

export interface RegisterWithEmailOptions {
  displayName?: string;
  persistence?: AuthPersistence;
}

export interface SignInWithEmailOptions {
  persistence?: AuthPersistence;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly auth: FirebaseAuth;
  private readonly userSubject = new BehaviorSubject<User | null>(null);

  readonly user$ = this.userSubject.asObservable();
  readonly isSignedIn$ = this.user$.pipe(
    map((user) => user !== null),
    distinctUntilChanged(),
  );

  constructor() {
    const app = getApps().length > 0 ? getApp() : initializeApp(environment.firebase);
    this.auth = getAuth(app);
    this.userSubject.next(this.auth.currentUser);

    onAuthStateChanged(this.auth, (user) => {
      this.userSubject.next(user);
    });
  }

  get currentUser(): User | null {
    return this.auth.currentUser;
  }

  async signInWithEmail(
    email: string,
    password: string,
    options: SignInWithEmailOptions = {},
  ): Promise<UserCredential> {
    await this.setAuthPersistence(options.persistence ?? 'local');

    return signInWithEmailAndPassword(this.auth, email.trim(), password);
  }

  async registerWithEmail(
    email: string,
    password: string,
    options: RegisterWithEmailOptions = {},
  ): Promise<UserCredential> {
    await this.setAuthPersistence(options.persistence ?? 'local');

    const credential = await createUserWithEmailAndPassword(this.auth, email.trim(), password);

    if (options.displayName?.trim()) {
      await updateProfile(credential.user, { displayName: options.displayName.trim() });
    }

    return credential;
  }

  async signInWithGoogle(persistence: AuthPersistence = 'local'): Promise<UserCredential> {
    await this.setAuthPersistence(persistence);

    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    return signInWithPopup(this.auth, provider);
  }

  sendPasswordReset(email: string): Promise<void> {
    return sendPasswordResetEmail(this.auth, email.trim());
  }

  getSignInMethodsForEmail(email: string): Promise<string[]> {
    return fetchSignInMethodsForEmail(this.auth, email.trim());
  }

  signOut(): Promise<void> {
    return signOut(this.auth);
  }

  private setAuthPersistence(persistence: AuthPersistence): Promise<void> {
    return setPersistence(
      this.auth,
      persistence === 'local' ? browserLocalPersistence : browserSessionPersistence,
    );
  }
}
