import { gapCursor } from 'prosemirror-gapcursor';
import { Plugin } from 'prosemirror-state';

export const gapCursorPlugins = (): Plugin[] => {
  return [gapCursor()];
};
