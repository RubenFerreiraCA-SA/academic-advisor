import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { Auth } from './auth';

export const redirectSignedInToPlatform: CanActivateFn = async () => {
  const auth = inject(Auth);
  const router = inject(Router);
  await auth.authStateReady();

  return auth.currentUser ? router.createUrlTree(['/platform', 'dashboard']) : true;
};

export const requireSignedIn: CanActivateFn = async () => {
  const auth = inject(Auth);
  const router = inject(Router);
  await auth.authStateReady();

  return auth.currentUser ? true : router.createUrlTree(['/login']);
};
