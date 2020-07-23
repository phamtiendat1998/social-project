import { transition, style, animate } from '@angular/animations';

export const bottomNavBox = [
    transition(':enter', [
        style({
            opacity: 0,
            transform: 'translateX(-50%) translateY(20px)'
        }),
        animate(200),
    ]),
    transition(':leave', [
        animate(200, style({
            opacity: 0,
            transform: 'translateX(-50%) translateY(20px)'
        }))
    ])
];
