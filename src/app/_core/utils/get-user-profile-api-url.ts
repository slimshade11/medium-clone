import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const getUserProfileApiUrl = (slug: string): string => {
  const router: Router = inject(Router);
  return router.url.includes('favourites') ? `/articles?favorited=${slug}` : `/articles?author=${slug}`;
};
