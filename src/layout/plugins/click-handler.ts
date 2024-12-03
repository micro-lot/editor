import { createNode } from '@/core';
import { NodeType } from 'prosemirror-model';
import { NodeSelection, Plugin, PluginKey } from 'prosemirror-state';

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
          click: (view, event) => {
            // dblclick 핸들러가 있어서 명시적으로 일반 클릭 이벤트 추가
            const pos = view.posAtDOM(event.target as Node, 0);

            if (pos === null) {
              return false;
            }

            const $pos = view.state.doc.resolve(pos);
            const node = $pos.node();

            if (node.type.spec.selectable) {
              const tr = view.state.tr.setSelection(
                NodeSelection.create(view.state.doc, $pos.before()),
              );
              view.dispatch(tr);
              return true;
            }

            return false;
          },
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
