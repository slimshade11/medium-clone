import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const getSelectedPopularTag = (): string => {
  const router: Router = inject(Router);
  return router.url.split('tags/')[1];
};
