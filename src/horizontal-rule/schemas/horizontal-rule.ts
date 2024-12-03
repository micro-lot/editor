import { BLOCK_GROUP, CLASS_NAME_BASE } from '@/core';
import { NodeSpec } from 'prosemirror-model';

export type HorizontalRuleAttributes = {
  color: string | null;
};

export const horizontalRuleNode = (): Record<string, NodeSpec> => {
  const nodeSpec: NodeSpec = {
    group: BLOCK_GROUP,
    draggable: true,
    attrs: {
      color: { default: null },
    },
    parseDOM: [
      {
        tag: 'hr',
        getAttrs: (node) => {
          const dom = node as HTMLElement;
          const color = dom.getAttribute('data-color');

          return {
            color: color || null,
          };
        },
      },
    ],
    toDOM: (node) => {
      const attrs = node.attrs as HorizontalRuleAttributes;
      const classes = [`${CLASS_NAME_BASE}-horizontal-rule`];

      return [
        'hr',
        {
          class: classes.join(' '),
          'data-color': attrs.color || null,
          style: attrs.color ? `--hr-color: ${attrs.color};` : null,
        },
      ];
    },
  };

  return {
    horizontalRule: nodeSpec,
  };
};
