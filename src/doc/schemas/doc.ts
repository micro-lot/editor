import { CONTAINER_GROUP } from '@/constants';
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
