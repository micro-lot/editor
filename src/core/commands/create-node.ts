import { NodeType } from 'prosemirror-model';
import { Command, Selection } from 'prosemirror-state';

export interface CreateNodeOptions {
  nodeType: NodeType;
  attrs?: Record<string, any>;
  insertPos?: number;
}

export const createNode = ({ nodeType, attrs, insertPos }: CreateNodeOptions): Command => {
  return (state, dispatch) => {
    if (!dispatch) {
      return true;
    }

    const node = nodeType.create(attrs);
    let tr = state.tr;

    if (typeof insertPos === 'number') {
      tr = tr.insert(insertPos, node);
      const newPos = insertPos + 1;
      const newSelection = Selection.near(tr.doc.resolve(newPos));
      tr = tr.setSelection(newSelection);
    } else {
      tr = tr.replaceSelectionWith(node);
    }

    dispatch(tr);

    return true;
  };
};
