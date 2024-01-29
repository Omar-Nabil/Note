import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const _Router = inject(Router);
  if(auth.user.getValue()) {
    return true;
  } else {
    _Router.navigate(['/login'])
    return false;
  }
};
