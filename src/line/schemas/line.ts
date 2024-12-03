import { BLOCK_GROUP, CLASS_NAME_BASE } from '@/core';
import { NodeSpec } from 'prosemirror-model';

export interface LineAttributes {
  color: string | null;
  angle: number; // 각도 (0-360)
  length: number; // 선의 길이 (px)
  thickness: number; // 선의 두께 (px)
}

export const lineNode = (): Record<string, NodeSpec> => {
  const nodeSpec: NodeSpec = {
    group: BLOCK_GROUP,
    draggable: true,
    attrs: {
      color: { default: null },
      angle: { default: 0 }, // 기본값 0도 (가로)
      length: { default: 100 }, // 기본값 100px
      thickness: { default: 1 }, // 기본값 1px
    },
    parseDOM: [
      {
        tag: 'div',
        getAttrs: (node) => {
          const dom = node as HTMLElement;
          return {
            color: dom.getAttribute('data-color') || null,
            angle: Number(dom.getAttribute('data-angle')) || 0,
            length: Number(dom.getAttribute('data-length')) || 100,
            thickness: Number(dom.getAttribute('data-thickness')) || 1,
          };
        },
      },
    ],
    toDOM: (node) => {
      const attrs = node.attrs as LineAttributes;
      return [
        'div',
        {
          class: `${CLASS_NAME_BASE}-line`,
          'data-color': attrs.color || null,
          'data-angle': attrs.angle,
          'data-length': attrs.length,
          'data-thickness': attrs.thickness,
          style: `
          --line-color: ${attrs.color || '#000'};
          --line-angle: ${attrs.angle}deg;
          --line-length: ${attrs.length}px;
          --line-thickness: ${attrs.thickness}px;
        `,
        },
      ];
    },
  };

  return {
    line: nodeSpec,
  };
};
