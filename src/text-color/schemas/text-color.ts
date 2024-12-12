import { CLASS_NAME_BASE } from '@/core/constants';
import { TextColorAttributes, TextColorMarkSpec } from '@/text-color/definitions';
import { Mark } from 'prosemirror-model';

export const textColorMark = (): Record<string, TextColorMarkSpec> => ({
  textColor: {
    attrs: {
      color: {
        default: '',
      },
    },
    parseDOM: [
      {
        tag: `span.${CLASS_NAME_BASE}-text-color`,
        getAttrs(node: HTMLElement) {
          const dom = node;
          const color = dom.dataset['text-color'];

          if (!color) {
            return false;
          }

          return { color };
        },
      },
    ],
    toDOM(mark: Mark) {
      const attrs = mark.attrs as TextColorAttributes;

      return [
        'span',
        {
          class: `${CLASS_NAME_BASE}-text-color`,
          style: `color: ${attrs.color}`,
          'data-text-color': attrs.color,
        },
      ];
    },
  },
});
