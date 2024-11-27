import { BLOCK_GROUP, CONTAINER_GROUP, INLINE_GROUP } from '@/constants';
import { NodeSpec } from 'prosemirror-model';

export const LAYOUT_TYPE = {
  FLEX: 'flex',
  GRID: 'grid',
} as const;

export type LayoutType = (typeof LAYOUT_TYPE)[keyof typeof LAYOUT_TYPE];

export interface LayoutAttributes {
  type: LayoutType;
}

export const layoutNode = (): Record<string, NodeSpec> => {
  const nodeSpec: NodeSpec = {
    group: CONTAINER_GROUP,
    // content: `(${BLOCK_GROUP} | ${INLINE_GROUP})?`,
    content: `${INLINE_GROUP}?`,
    attrs: {
      /**
       * dom.attrs.type 아래에 값을 가지는 것과 같음
       */
      type: { default: LAYOUT_TYPE.FLEX },
    },
    parseDOM: [{ tag: 'div[data-layout]' }],
    /**
     * DOM으로 표현할 수 있도록 정의
     */
    toDOM: (node) => ['div', { 'data-layout': node.attrs.type }, 0],
  };

  return {
    layout: nodeSpec,
  };
};
