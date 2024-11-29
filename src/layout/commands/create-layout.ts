import { LayoutAttributes } from '@/layout/definitions';
import { NodeType } from 'prosemirror-model';
import { Command } from 'prosemirror-state';

export const createLayoutCommand = (
  nodeType: NodeType,
  attrs?: Partial<LayoutAttributes>,
): Command => {
  return (state, dispatch) => {
    if (!dispatch) {
      return true;
    }

    const layout = nodeType.create(attrs);
    let tr = state.tr;

    if (state.selection.empty) {
      const endPos = state.doc.content.size;
      tr = tr.insert(endPos, layout);
    } else {
      tr = tr.replaceSelectionWith(layout);
    }

    dispatch(tr);

    return true;
  };
};
