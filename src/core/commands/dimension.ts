import { DimensionAttributes, DimensionUpdate, isPartialDimensionUpdate } from '@/core/types';
import { hasStyles } from '@/core/utilities';
import { Node } from 'prosemirror-model';
import { Command, EditorState } from 'prosemirror-state';

export const getDimensionedNodes = (state: EditorState) => {
  const { selection, doc } = state;
  const dimensionedNodes: Array<{ node: Node; pos: number }> = [];

  doc.nodesBetween(selection.from, selection.to, (node, pos) => {
    // 부모 노드는 배열에서 제외
    const nodeFrom = pos;
    const nodeTo = pos + node.nodeSize;
    const isSelected = nodeFrom >= selection.from && nodeTo <= selection.to;

    if (hasStyles(node.type, 'dimension') && isSelected) {
      dimensionedNodes.push({ node, pos });
    }
  });

  return dimensionedNodes;
};

export const getCurrentDimension = (state: EditorState): DimensionAttributes | undefined => {
  const dimensionedNodes = getDimensionedNodes(state);

  if (dimensionedNodes.length === 0) {
    return;
  }

  const currentAttrs = dimensionedNodes[0].node.attrs as DimensionAttributes;

  return {
    width: currentAttrs.width,
    height: currentAttrs.height,
  };
};

export const setDimension =
  (update: DimensionUpdate): Command =>
  (state, dispatch) => {
    if (!dispatch) {
      return true;
    }
    const dimensionedNodes = getDimensionedNodes(state);

    if (dimensionedNodes.length === 0) {
      return false;
    }

    const { tr } = state;

    dimensionedNodes.forEach(({ node, pos }) => {
      let dimensionAttributes: DimensionAttributes = {
        width: '100%',
        height: 'auto',
        ...(isPartialDimensionUpdate(update) ? update : {}),
      };

      if (typeof update === 'number' || typeof update === 'string') {
        dimensionAttributes = {
          width: update,
          height: update,
        };
      }

      const newAttrs = {
        ...node.attrs,
        ...dimensionAttributes,
      };

      tr.setNodeMarkup(pos, null, newAttrs);
    });

    dispatch(tr);

    return true;
  };
