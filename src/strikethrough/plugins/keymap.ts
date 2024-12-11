import { toggleMark } from 'prosemirror-commands';
import { keymap } from 'prosemirror-keymap';
import { MarkType } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';

export interface StrikethroughKeymapPluginConfig {
  markType: MarkType;
}

export const strikethroughKeymapPlugins = (configs: StrikethroughKeymapPluginConfig): Plugin[] => [
  keymap({
    'Mod-Shift-s': toggleMark(configs.markType),
    'Mod-Shift-S': toggleMark(configs.markType),
  }),
];
