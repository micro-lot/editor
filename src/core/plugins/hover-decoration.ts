import { CLASS_NAME_BASE } from '@/core/constants';
import { Node } from 'prosemirror-model';
import { Plugin, PluginKey } from 'prosemirror-state';
import { EditorState, Transaction } from 'prosemirror-state';
import { Decoration, DecorationSet, EditorView } from 'prosemirror-view';

export const hoverDecorationPluginKey: PluginKey<DecorationSet> = new PluginKey<DecorationSet>(
  'hoverDecoration',
);

export const hoverDecorationPlugins = (): Plugin[] => {
  const hoverNodeClassName = `${CLASS_NAME_BASE}-hover-decoration`;

  const findNodeFromDOM = (
    view: EditorView,
    target: HTMLElement,
  ): { node: Node; pos: number } | null => {
    const pos = view.posAtDOM(target, 0);

    if (pos === null) {
      return null;
    }

    const $pos = view.state.doc.resolve(pos);

    // 1. text 노드 또는 인라인 컨텐츠를 포함하는 경우
    if (($pos.node().type.name === 'text' || $pos.node().inlineContent) && $pos.depth > 0) {
      return {
        node: $pos.parent,
        pos: $pos.before($pos.depth),
      };
    }

    // 2. text가 아닌 leaf 노드 (line 등)
    if ($pos.nodeAfter?.isLeaf) {
      return {
        node: $pos.nodeAfter,
        pos: pos,
      };
    }

    // 3. 그 외의 경우
    const restNode = $pos.node($pos.depth);

    if (restNode.type.name === 'doc') {
      // 최상위 문서(doc)는 해당없음
      return null;
    }

    return {
      node: restNode,
      pos: $pos.before($pos.depth),
    };
  };

  return [
    new Plugin<DecorationSet>({
      key: hoverDecorationPluginKey,
      state: {
        init() {
          return DecorationSet.empty;
        },
        apply(tr: Transaction, oldSet: DecorationSet) {
          const meta = tr.getMeta(hoverDecorationPluginKey);

          if (meta) {
            return meta;
          }

          return oldSet.map(tr.mapping, tr.doc);
        },
      },
      props: {
        handleDOMEvents: {
          mouseover(view: EditorView, event: MouseEvent) {
            let target = event.target as HTMLElement;

            while (target && !view.dom.contains(target)) {
              target = target.parentElement!;
            }

            const result = findNodeFromDOM(view, target);

            if (!result) {
              return false;
            }

            const { node, pos } = result;

            if (node) {
              const from = pos;
              const to = pos + node.nodeSize;

              if (from < 0 || to > view.state.doc.content.size) {
                console.warn(
                  'Invalid decoration position:',
                  { from, to },
                  'document content size: ',
                  view.state.doc.content.size,
                );

                return false;
              }

              const decorationsSet = DecorationSet.create(view.state.doc, [
                Decoration.node(from, to, {
                  class: hoverNodeClassName,
                  'data-node-type': node.type.name,
                }),
              ]);

              view.dispatch(view.state.tr.setMeta(hoverDecorationPluginKey, decorationsSet));
            }

            return false;
          },
          mouseout(view: EditorView) {
            view.dispatch(view.state.tr.setMeta(hoverDecorationPluginKey, DecorationSet.empty));

            return false;
          },
        },
        decorations(state: EditorState) {
          return this.getState(state);
        },
      },
    }),
  ];
};
