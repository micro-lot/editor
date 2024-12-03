import { BLOCK_GROUP, CLASS_NAME_BASE, CONTAINER_GROUP } from '@/core';
import {
  ALIGN_ITEMS,
  FLEX_DIRECTION,
  JUSTIFY_CONTENT,
  LAYOUT_TYPE,
  LayoutAttributes,
  LayoutNodeSpec,
  isFlexTypeLayout,
} from '@/layout/definitions';
import { zeroOrMore } from '@/utilities';

export const layoutNode = (): Record<string, LayoutNodeSpec> => {
  const nodeSpec: LayoutNodeSpec = {
    group: CONTAINER_GROUP,
    content: zeroOrMore(BLOCK_GROUP),
    draggable: true,
    selectable: true,
    allowGapCursor: true,
    attrs: {
      /**
       * dom.attrs.type 아래에 값을 가지는 것과 같음
       */
      type: { default: LAYOUT_TYPE.FLEX },
      // margin
      marginTop: { default: 0 },
      marginRight: { default: 0 },
      marginBottom: { default: 0 },
      marginLeft: { default: 0 },
      // padding
      paddingTop: { default: 0 },
      paddingRight: { default: 0 },
      paddingBottom: { default: 0 },
      paddingLeft: { default: 0 },
    },
    meta: {
      applicableStyles: {
        margin: true,
        padding: true,
      },
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
          const style = dom.style;
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
            marginTop: parseInt(style.marginTop) || 0,
            marginRight: parseInt(style.marginRight) || 0,
            marginBottom: parseInt(style.marginBottom) || 0,
            marginLeft: parseInt(style.marginLeft) || 0,

            paddingTop: parseInt(style.paddingTop) || 0,
            paddingRight: parseInt(style.paddingRight) || 0,
            paddingBottom: parseInt(style.paddingBottom) || 0,
            paddingLeft: parseInt(style.paddingLeft) || 0,

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
      const style = Object.entries({
        'margin-top': attrs.marginTop ? `${attrs.marginTop}px` : null,
        'margin-right': attrs.marginRight ? `${attrs.marginRight}px` : null,
        'margin-bottom': attrs.marginBottom ? `${attrs.marginBottom}px` : null,
        'margin-left': attrs.marginLeft ? `${attrs.marginLeft}px` : null,

        'padding-top': attrs.paddingTop ? `${attrs.paddingTop}px` : null,
        'padding-right': attrs.paddingRight ? `${attrs.paddingRight}px` : null,
        'padding-bottom': attrs.paddingBottom ? `${attrs.paddingBottom}px` : null,
        'padding-left': attrs.paddingLeft ? `${attrs.paddingLeft}px` : null,
      })
        .filter(([_, value]) => value)
        .map((style) => style.join(':'))
        .join(';');
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
          style,
        },
        0,
      ];
    },
  };

  return {
    layout: nodeSpec,
  };
};
