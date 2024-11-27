import { NodeSpec } from 'prosemirror-model';

export interface AlignableAttrs {
  align: TextAlignment;
}

export const TEXT_ALIGNMENT = {
  DEFAULT: null,
  LEFT: 'left',
  CENTER: 'center',
  RIGHT: 'right',
} as const;

export type TextAlignment = (typeof TEXT_ALIGNMENT)[keyof typeof TEXT_ALIGNMENT];

export interface AlignableNodeSpec extends NodeSpec {
  attrs: {
    align: {
      default: TextAlignment;
    };
  };
  meta: {
    allowAlign: boolean;
  };
}
