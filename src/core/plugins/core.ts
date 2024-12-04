import { dropCursorPlugins } from '@/core/plugins/drop-cursor';
import { gapCursorPlugins } from '@/core/plugins/gap-cursor';
import { historyPlugins } from '@/core/plugins/history';
import { keyMapPlugins } from '@/core/plugins/key-map';
import { Plugin } from 'prosemirror-state';

export const corePlugins = (): Plugin[] => [
  ...keyMapPlugins(),
  ...historyPlugins(),
  ...gapCursorPlugins(),
  ...dropCursorPlugins(),
];
