import { CLASS_NAME_BASE } from '@/core/constants';
import { dropCursor } from 'prosemirror-dropcursor';
import { Plugin } from 'prosemirror-state';

export const dropCursorPlugins = (): Plugin[] => [
  dropCursor({
    width: 2,
    color: 'blue',
    class: `${CLASS_NAME_BASE}-drop-cursor`,
  }),
];
