import { BLOCK_GROUP, CLASS_NAME_BASE, INLINE_GROUP } from '@/core/constants';
import { AlignableAttrs, TEXT_ALIGNMENT } from '@/core/types';
import { zeroOrMore } from '@/utilities';
import { NodeSpec } from 'prosemirror-model';

export type ParagraphAttributes = AlignableAttrs;

export const paragraphNode = (): Record<string, NodeSpec> => {
  const nodeSpec: NodeSpec = {
    group: BLOCK_GROUP,
    content: zeroOrMore(INLINE_GROUP),
    draggable: true,
    attrs: {
      align: { default: null },
    },
    parseDOM: [
      {
        tag: 'p',
        getAttrs: (node) => {
          const dom = node;
          const align = dom.getAttribute('data-text-align');

          return {
            align: align || null,
          };
        },
      },
    ],
    toDOM: (node) => {
      const attrs = node.attrs as ParagraphAttributes;
      const classes = [`${CLASS_NAME_BASE}-paragraph`];

      if (attrs.align) {
        classes.push(`${CLASS_NAME_BASE}-paragraph-align-${attrs.align}`);
      }

      return [
        'p',
        {
          class: classes.join(' '),
          'data-text-align': attrs.align || TEXT_ALIGNMENT.START,
        },
        0,
      ];
    },
  };

  return {
    paragraph: nodeSpec,
  };
};
