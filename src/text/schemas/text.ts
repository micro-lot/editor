import { INLINE_GROUP } from '@/core';
import { NodeSpec } from 'prosemirror-model';

export const textNode = (): Record<string, NodeSpec> => ({
  text: {
    group: INLINE_GROUP,
  },
});
