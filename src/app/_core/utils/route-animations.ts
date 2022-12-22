import {
  trigger,
  transition,
  style,
  query,
  group,
  animate,
  AnimationMetadata,
  animateChild,
  AnimationTriggerMetadata,
} from '@angular/animations';

export const slider: AnimationTriggerMetadata = trigger('routeAnimations', [
  transition('* => isLeft', slideTo('left')),
  transition('* => isRight', slideTo('right')),
  transition('isLeft => *', slideTo('right')),
  transition('isRight => *', slideTo('left')),
]);

function slideTo(direction: string): AnimationMetadata | AnimationMetadata[] {
  const optional = { optional: true };

  return [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        [direction]: 0,
        width: '100%',
      }),
    ]),
    query(':enter', [style({ [direction]: '-100%' })]),
    group([
      query(':leave', [animate('700ms ease', style({ [direction]: '100%' }))], optional),
      query(':enter', [animate('700ms ease', style({ [direction]: '0%' })), animateChild()]),
    ]),
  ];
}
