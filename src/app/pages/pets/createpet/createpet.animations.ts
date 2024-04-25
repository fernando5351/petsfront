import { animate, state, style, transition, trigger } from '@angular/animations';

export const fadeInOutAnimation = trigger('fadeInOut', [
  transition(':enter', [
    style({ transform: 'translateX(-90%)', opacity: 0 }),
    animate('0.5s ease', style({ transform: 'translateX(0%)', opacity: 1 }))
  ]),
  transition(':leave', [
    animate('0.5s ease', style({ transform: 'translateX(-30%)', opacity: 0 }))
  ])
]);
