import { baseKeymap } from 'prosemirror-commands';
import { keymap } from 'prosemirror-keymap';
import { Plugin } from 'prosemirror-state';

export const keyMapPlugins = (): Plugin[] => {
  return [
    // 기본 키맵 추가
    keymap(baseKeymap),
  ];
};
