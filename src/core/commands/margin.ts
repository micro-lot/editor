import {
  MarginAttributes,
  MarginUpdate,
  isMarginShorthand,
  isMarginXYShorthand,
  isNotMarginShorthand,
} from '@/core/types';
import { hasStyles } from '@/core/utilities';
import { Node } from 'prosemirror-model';
import { Command, EditorState } from 'prosemirror-state';

export const getMarginedNodes = (state: EditorState) => {
  const { selection, doc } = state;
  const marginedNodes: Array<{ node: Node; pos: number }> = [];

  doc.nodesBetween(selection.from, selection.to, (node, pos) => {
    // 부모 노드는 배열에서 제외
    const nodeFrom = pos;
    const nodeTo = pos + node.nodeSize;
    const isSelected = nodeFrom >= selection.from && nodeTo <= selection.to;

    if (hasStyles(node.type, 'margin') && isSelected) {
      marginedNodes.push({ node, pos });
    }
  });

  return marginedNodes;
};

export const getCurrentMargin = (state: EditorState): MarginAttributes | undefined => {
  const marginedNodes = getMarginedNodes(state);

  if (marginedNodes.length === 0) {
    return;
  }

  const currentAttrs = marginedNodes[0].node.attrs as MarginAttributes;

  return {
    marginTop: currentAttrs.marginTop,
    marginRight: currentAttrs.marginRight,
    marginBottom: currentAttrs.marginBottom,
    marginLeft: currentAttrs.marginLeft,
  };
};

export const setMargin =
  (update: MarginUpdate): Command =>
  (state, dispatch) => {
    if (!dispatch) {
      return true;
    }

    const marginedNodes = getMarginedNodes(state);

    if (marginedNodes.length === 0) {
      return false;
    }

    const { tr } = state;

    // 여러개일 수 있으니까 일단 배열순회 (multipleSelection 구현 후 다시 살펴봐야함)
    marginedNodes.forEach(({ node, pos }) => {
      let marginAttributes: MarginAttributes = {
        marginTop: 0,
        marginRight: 0,
        marginBottom: 0,
        marginLeft: 0,
        ...(isNotMarginShorthand(update) ? update : {}),
      };

      if (typeof update === 'number') {
        marginAttributes = {
          marginTop: update,
          marginRight: update,
          marginBottom: update,
          marginLeft: update,
        };
      }

      if (isMarginShorthand(update)) {
        const [marginTop, marginRight, marginBottom, marginLeft] = update;
        marginAttributes = {
          marginTop,
          marginRight,
          marginBottom,
          marginLeft,
        };
      }

      if (isMarginXYShorthand(update)) {
        const [marginY, marginX] = update;

        marginAttributes = {
          marginTop: marginY,
          marginRight: marginX,
          marginBottom: marginY,
          marginLeft: marginX,
        };
      }

      const newAttrs = {
        ...node.attrs,
        ...marginAttributes,
      };

      tr.setNodeMarkup(pos, null, newAttrs);
    });

    dispatch(tr);

    return true;
  };
