import { inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SLUG } from '@core/constants/slug';

export const getSlug = () => {
  const activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  return activatedRoute.snapshot.paramMap.get(SLUG);
};
