import { BorderAttributes, BorderUpdate } from '@/core/types';
import { hasStyles } from '@/core/utilities';
import { Node } from 'prosemirror-model';
import { Command, EditorState } from 'prosemirror-state';

export const getBorderedNodes = (state: EditorState) => {
  const { selection, doc } = state;
  const borderedNodes: Array<{ node: Node; pos: number }> = [];

  doc.nodesBetween(selection.from, selection.to, (node, pos) => {
    // 부모 노드는 배열에서 제외
    const nodeFrom = pos;
    const nodeTo = pos + node.nodeSize;
    const isSelected = nodeFrom >= selection.from && nodeTo <= selection.to;

    if (hasStyles(node.type, 'border') && isSelected) {
      borderedNodes.push({ node, pos });
    }
  });

  return borderedNodes;
};

export const getCurrentBorder = (state: EditorState): BorderAttributes | undefined => {
  const borderedNodes = getBorderedNodes(state);

  if (borderedNodes.length === 0) {
    return;
  }

  const currentAttrs = borderedNodes[0].node.attrs as BorderAttributes;

  return {
    borderWidth: currentAttrs.borderWidth,
    borderStyle: currentAttrs.borderStyle,
    borderColor: currentAttrs.borderColor,
    borderRadius: currentAttrs.borderRadius,
  };
};

export const setBorder =
  (update: BorderUpdate): Command =>
  (state, dispatch) => {
    if (!dispatch) {
      return true;
    }

    const borderedNodes = getBorderedNodes(state);

    if (borderedNodes.length === 0) {
      return false;
    }

    const { tr } = state;

    borderedNodes.forEach(({ node, pos }) => {
      const newAttrs = {
        ...node.attrs,
        ...update,
      };

      tr.setNodeMarkup(pos, null, newAttrs);
    });

    dispatch(tr);

    return true;
  };
