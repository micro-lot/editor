import { CONTAINER_GROUP } from '@/core';
import { oneOrMore } from '@/utilities';
import { NodeSpec } from 'prosemirror-model';

export const docNode = (): Record<string, NodeSpec> => {
  const nodeSpec: NodeSpec = {
    content: oneOrMore(CONTAINER_GROUP),
  };

  return {
    doc: nodeSpec,
  };
};
