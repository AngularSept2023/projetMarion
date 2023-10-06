import { inject } from '@angular/core';
import { CanActivateFn, Router, } from '@angular/router';
import { AuthentificationService } from './authentification.service';

  export const AuthentificationGuard: CanActivateFn = () => {
    const authService = inject(AuthentificationService);
    const router = inject(Router);
    if (authService.isLogged$.value) {
      return true;
    }
    return router.parseUrl('/');
  };
  




