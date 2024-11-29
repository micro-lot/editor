import { createNode } from '@/core';
import { NodeType } from 'prosemirror-model';
import { Plugin, PluginKey } from 'prosemirror-state';

export interface LayoutClickPluginConfig {
  layoutNodeType: NodeType;
  defaultContentNodeType: NodeType;
}

export const layoutClickPlugins = (config: LayoutClickPluginConfig) => {
  return [
    new Plugin({
      key: new PluginKey('layoutClickHandler'),
      props: {
        handleDOMEvents: {
          dblclick: (view, event) => {
            const pos = view.posAtDOM(event.target as Node, 0);

            if (pos === null) {
              return false;
            }

            const $pos = view.state.doc.resolve(pos);
            const node = $pos.node();

            // 레이아웃이면서 비어있는 상태일 때 레아이웃 노드 내부에 노드 삽입
            if (node.type === config.layoutNodeType && node.content.size === 0) {
              const command = createNode({
                nodeType: config.defaultContentNodeType,
                insertPos: $pos.start(),
              });

              if (command(view.state, view.dispatch)) {
                view.focus();

                return true;
              }
            }

            return false;
          },
        },
      },
    }),
  ];
};
