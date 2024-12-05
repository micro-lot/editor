import { BLOCK_GROUP, CLASS_NAME_BASE, CONTAINER_GROUP } from '@/core/constants';
import {
  borderToDOMStyle,
  defaultBorderAttrs,
  defaultDimensionAttrs,
  defaultMarginAttrs,
  defaultPaddingAttrs,
  dimensionToDOMStyle,
  marginToDOMStyle,
  paddingToDOMStyle,
  parseBorderFromDOMStyle,
  parseDimensionFromDOMStyle,
  parseMarginFromDOMStyle,
  parsePaddingFromDOMStyle,
} from '@/core/utilities';
import {
  ALIGN_ITEMS,
  FLEX_DIRECTION,
  FlexAlignItems,
  FlexDirection,
  FlexJustifyContent,
  JUSTIFY_CONTENT,
  LAYOUT_TYPE,
  LayoutAttributes,
  LayoutNodeSpec,
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
      direction: { default: FLEX_DIRECTION.ROW },
      alignItems: { default: ALIGN_ITEMS.STRETCH },
      justifyContent: { default: JUSTIFY_CONTENT.START },
      gap: { default: '' },
      ...defaultDimensionAttrs(),
      ...defaultMarginAttrs(),
      ...defaultPaddingAttrs(),
      ...defaultBorderAttrs(),
    },
    meta: {
      applicableStyles: {
        dimension: true,
        margin: true,
        padding: true,
        border: true,
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
          let attrs: Partial<LayoutAttributes> = {};

          if (type === LAYOUT_TYPE.FLEX) {
            const direction = dom.getAttribute('data-direction') as FlexDirection;
            const justifyContent = dom.getAttribute('data-justify-content') as FlexJustifyContent;
            const alignItems = dom.getAttribute('data-align-items') as FlexAlignItems;

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
            ...parseDimensionFromDOMStyle(style),
            ...parseMarginFromDOMStyle(style),
            ...parsePaddingFromDOMStyle(style),
            ...parseBorderFromDOMStyle(style),
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
        ...dimensionToDOMStyle(attrs),
        ...marginToDOMStyle(attrs),
        ...paddingToDOMStyle(attrs),
        ...borderToDOMStyle(attrs),
      })
        .filter(([_, value]) => value)
        .map((style) => style.join(':'))
        .join(';');
      const type = attrs.type;

      if (type) {
        classes.push(`${layoutBaseClass}-${type}`);
      }

      if (attrs.direction) {
        classes.push(`${layoutBaseClass}-${attrs.direction}`);
      }

      if (attrs.alignItems) {
        classes.push(`${layoutBaseClass}-items-${attrs.alignItems}`);
      }

      if (attrs.justifyContent) {
        classes.push(`${layoutBaseClass}-justify-${attrs.justifyContent}`);
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
