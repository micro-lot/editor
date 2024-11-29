import { ParagraphAttributes } from '@/paragraph/schemas';
import { NodeType } from 'prosemirror-model';
import { Command, Selection } from 'prosemirror-state';

export interface CreateParagraphOptions {
  nodeType: NodeType;
  attrs?: Partial<ParagraphAttributes>;
  insertPos?: number;
}

export const createParagraph = ({ nodeType, ...options }: CreateParagraphOptions): Command => {
  return (state, dispatch) => {
    if (!dispatch) {
      return true;
    }

    const paragraph = nodeType.create(options.attrs);
    let tr = state.tr;

    if (typeof options.insertPos === 'number') {
      tr = tr.insert(options.insertPos, paragraph);
      const newPos = options.insertPos + 1;
      tr = tr.setSelection(Selection.near(tr.doc.resolve(newPos)));
    } else {
      tr = tr.replaceSelectionWith(paragraph);
    }

    dispatch(tr);

    return true;
  };
};
