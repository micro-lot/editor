import { toggleMark } from 'prosemirror-commands';
import { keymap } from 'prosemirror-keymap';
import { MarkType } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';

export interface BoldKeymapPluginConfig {
  markType: MarkType;
}

export const boldKeymapPlugins = (configs: BoldKeymapPluginConfig): Plugin[] => [
  keymap({
    'Mod-b': toggleMark(configs.markType),
    'Mod-B': toggleMark(configs.markType),
  }),
];
