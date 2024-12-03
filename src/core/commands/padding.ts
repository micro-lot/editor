import {
  PaddingAttributes,
  PaddingUpdate,
  isNotPaddingShorthand,
  isPaddingShorthand,
  isPaddingXYShorthand,
} from '@/core/types';
import { hasStyles } from '@/core/utilities';
import { Node } from 'prosemirror-model';
import { Command, EditorState } from 'prosemirror-state';

export const getPaddingableNodes = (state: EditorState) => {
  const { selection, doc } = state;
  const paddingableNodes: Array<{ node: Node; pos: number }> = [];

  doc.nodesBetween(selection.from, selection.to, (node, pos) => {
    // 부모 노드는 배열에서 제외
    const nodeFrom = pos;
    const nodeTo = pos + node.nodeSize;
    const isSelected = nodeFrom >= selection.from && nodeTo <= selection.to;

    if (hasStyles(node.type, 'padding') && isSelected) {
      paddingableNodes.push({ node, pos });
    }
  });

  return paddingableNodes;
};

export const getCurrentPadding = (state: EditorState) => {
  const paddingableNodes = getPaddingableNodes(state);

  if (paddingableNodes.length === 0) {
    return null;
  }

  const currentAttrs = paddingableNodes[0].node.attrs as PaddingAttributes;

  return {
    paddingTop: currentAttrs.paddingTop,
    paddingRight: currentAttrs.paddingRight,
    paddingBottom: currentAttrs.paddingBottom,
    paddingLeft: currentAttrs.paddingLeft,
  };
};

export const setPadding =
  (update: PaddingUpdate): Command =>
  (state, dispatch) => {
    const paddingableNodes = getPaddingableNodes(state);

    if (paddingableNodes.length === 0) {
      return false;
    }

    if (!dispatch) {
      return true;
    }

    const { tr } = state;

    paddingableNodes.forEach(({ node, pos }) => {
      let paddingAttributes: PaddingAttributes = {
        paddingTop: 0,
        paddingRight: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        ...(isNotPaddingShorthand(update) ? update : {}),
      };

      if (typeof update === 'number') {
        paddingAttributes = {
          paddingTop: update,
          paddingRight: update,
          paddingBottom: update,
          paddingLeft: update,
        };
      }

      if (isPaddingShorthand(update)) {
        const [paddingTop, paddingRight, paddingBottom, paddingLeft] = update;

        paddingAttributes = {
          paddingTop,
          paddingRight,
          paddingBottom,
          paddingLeft,
        };
      }

      if (isPaddingXYShorthand(update)) {
        const [paddingY, paddingX] = update;

        paddingAttributes = {
          paddingTop: paddingY,
          paddingRight: paddingX,
          paddingBottom: paddingY,
          paddingLeft: paddingX,
        };
      }

      const newAttrs = {
        ...node.attrs,
        ...paddingAttributes,
      };

      tr.setNodeMarkup(pos, null, newAttrs);
    });

    dispatch(tr);

    return true;
  };
