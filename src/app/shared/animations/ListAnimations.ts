import {
  animate,
  group,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const listType1 = [
  trigger('listMoveIn', [
    state(
      'in',
      style({
        opacity: 1,
        transform: 'translateX(0)',
      })
    ),
    transition('void => *', [
      style({
        opacity: 0,
        transform: 'translateX(100px)',
      }),
      animate(300),
    ]),
  ]),
  trigger('listCloseUp', [
    state(
      'in',
      style({
        opacity: 1,
        maxHeight: '900px',
      })
    ),
    transition('* => void', [
      animate(
        750,
        style({
          opacity: 0,
          maxHeight: '0',
        })
      ),
    ]),
  ]),
];

export const listType2 = [
  trigger('hideComments', [
    transition('* => void', [
      style({
        maxHeight: '600px',
        overflowY: 'hidden',
      }),
      animate(
        500,
        style({
          maxHeight: '0',
        })
      ),
    ]),
  ]),
  trigger('showComments', [
    transition('void => *', [
      style({
        maxHeight: '0',
        overflowY: 'hidden',
      }),
      animate(
        500,
        style({
          maxHeight: '600px',
        })
      ),
    ]),
  ]),
];
