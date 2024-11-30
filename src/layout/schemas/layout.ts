import { BLOCK_GROUP, CLASS_NAME_BASE, CONTAINER_GROUP } from '@/core';
import {
  ALIGN_ITEMS,
  FLEX_DIRECTION,
  JUSTIFY_CONTENT,
  LAYOUT_TYPE,
  LayoutAttributes,
  isFlexTypeLayout,
} from '@/layout/definitions';
import { zeroOrMore } from '@/utilities';
import { NodeSpec } from 'prosemirror-model';

export const layoutNode = (): Record<string, NodeSpec> => {
  const nodeSpec: NodeSpec = {
    group: CONTAINER_GROUP,
    content: zeroOrMore(BLOCK_GROUP),
    draggable: true,
    attrs: {
      /**
       * dom.attrs.type 아래에 값을 가지는 것과 같음
       */
      type: { default: LAYOUT_TYPE.FLEX },
    },
    /**
     * DOM에서 프로즈미러 데이터로 변환할 수 있도록 정의
     */
    parseDOM: [
      {
        tag: 'div',
        getAttrs: (node) => {
          const dom = node;
          const type = dom.getAttribute('data-type');
          let attrs = {};

          if (type === LAYOUT_TYPE.FLEX) {
            const direction = dom.getAttribute('data-direction');
            const justifyContent = dom.getAttribute('data-justify-content');
            const alignItems = dom.getAttribute('data-align-items');

            attrs = {
              direction: direction || FLEX_DIRECTION.ROW,
              justifyContent: justifyContent || JUSTIFY_CONTENT.START,
              alignItems: alignItems || ALIGN_ITEMS.STRETCH,
            };
          }

          if (type === LAYOUT_TYPE.GRID) {
            attrs = {};
          }

          return {
            type: type || LAYOUT_TYPE.FLEX,
            ...attrs,
          };
        },
      },
    ],
    /**
     * DOM으로 표현할 수 있도록 정의
     */
    toDOM: (node) => {
      const attrs = node.attrs as LayoutAttributes;
      const layoutBaseClass = `${CLASS_NAME_BASE}-layout`;
      const classes = [layoutBaseClass];

      const type = attrs.type;

      if (type) {
        classes.push(`${layoutBaseClass}-${type}`);
      }

      if (isFlexTypeLayout(attrs) && attrs.direction) {
        classes.push(`${layoutBaseClass}-${attrs.direction}`);
      }

      if (isFlexTypeLayout(attrs) && attrs.alignItems) {
        classes.push(`${layoutBaseClass}-${attrs.alignItems}`);
      }

      return [
        'div',
        {
          class: classes.join(' '),
          'data-type': type || LAYOUT_TYPE.FLEX,
        },
        0,
      ];
    },
  };

  return {
    layout: nodeSpec,
  };
};
