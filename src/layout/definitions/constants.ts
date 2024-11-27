export const LAYOUT_TYPE = {
  FLEX: 'flex',
  GRID: 'grid',
} as const;

export const FLEX_DIRECTION = {
  ROW: 'row',
  ROW_REVERSE: 'row-reverse',
  COL: 'column',
  COL_REVERSE: 'column-reverse',
} as const;

export const JUSTIFY_CONTENT = {
  START: 'start',
  CENTER: 'center',
  BETWEEN: 'space-between',
  AROUND: 'space-around',
  EVENLY: 'space-evenly',
} as const;

export const ALIGN_ITEMS = {
  STRETCH: 'stretch',
  CENTER: 'center',
  START: 'start',
  END: 'end',
} as const;
