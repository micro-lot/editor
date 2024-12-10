import { toggleMark } from 'prosemirror-commands';
import { keymap } from 'prosemirror-keymap';
import { MarkType } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';

export interface ItalicKeymapPluginConfig {
  markType: MarkType;
}

export const italicKeymapPlugins = (configs: ItalicKeymapPluginConfig): Plugin[] => [
  keymap({
    'Mod-i': toggleMark(configs.markType),
    'Mod-I': toggleMark(configs.markType),
  }),
];
