import { underlineKeymapPlugins } from '@/underline/plugins/keymap';
import { MarkType } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';

export interface UnderlinePluginConfig {
  markType: MarkType;
}

export const underlinePlugins = (configs: UnderlinePluginConfig): Plugin[] => [
  ...underlineKeymapPlugins(configs),
];
