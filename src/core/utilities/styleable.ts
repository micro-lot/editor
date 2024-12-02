import { StyleableNodeMeta } from '@/core/types';
import { NodeType } from 'prosemirror-model';

export const hasStyles = (
  nodeType: NodeType,
  applicableStyle: keyof StyleableNodeMeta['applicableStyles'],
): boolean => {
  return !!(nodeType.spec.meta as StyleableNodeMeta)?.applicableStyles[applicableStyle];
};
