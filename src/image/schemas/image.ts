import { BLOCK_GROUP, CLASS_NAME_BASE } from '@/core/constants';
import { NodeSpec } from 'prosemirror-model';

export interface ImageAttributes {
  src: string;
  alt: string;
  width: number;
  height: number;
}

// @TODO: 블록그룹인가? 인라인그룹인가? 변경 필요
export const imageNode = (): Record<string, NodeSpec> => {
  const nodeSpec: NodeSpec = {
    group: BLOCK_GROUP,
    draggable: true,
    selectable: true,
    attrs: {
      src: { default: null },
      alt: { default: null },
      // @Todo: 기본 이미지 너비 조절 필요 - scss도 수정 필요
      width: { default: 300 },
      height: { default: null },
    },
    parseDOM: [
      {
        tag: 'img',
        getAttrs: (node) => {
          const dom = node as HTMLElement;
          return {
            src: dom.getAttribute('src'),
            alt: dom.getAttribute('alt'),
            width: dom.getAttribute('width') || 300,
            height: dom.getAttribute('height'),
          };
        },
      },
    ],
    toDOM: (node) => {
      const attrs = node.attrs as ImageAttributes;
      return [
        'div',
        {
          class: `${CLASS_NAME_BASE}-image-wrapper`,
          draggable: 'true',
          contenteditable: 'false',
        },
        [
          'img',
          {
            class: `${CLASS_NAME_BASE}-image`,
            src: attrs.src,
            alt: attrs.alt || '',
            width: attrs.width,
            'data-width': attrs.width,
            style: `max-width: ${attrs.width}px`,
            draggable: 'false',
          },
        ],
        [
          'div',
          {
            class: `${CLASS_NAME_BASE}-image-resize-handle ${CLASS_NAME_BASE}-image-resize-handle-right-bottom`,
          },
        ],
      ];
    },
  };

  return {
    image: nodeSpec,
  };
};
