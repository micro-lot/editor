import { BLOCK_GROUP, CONTAINER_GROUP } from '@/core';
import { NodeSpec } from 'prosemirror-model';

export const docNode = (): Record<string, NodeSpec> => {
  const nodeSpec: NodeSpec = {
    content: `(${CONTAINER_GROUP} | ${BLOCK_GROUP})+`,
  };

  return {
    doc: nodeSpec,
  };
};
