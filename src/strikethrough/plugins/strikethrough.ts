import { strikethroughKeymapPlugins } from '@/strikethrough/plugins/keymap';
import { MarkType } from 'prosemirror-model';

export interface StrikethroughPluginConfig {
  markType: MarkType;
}

export const strikethroughPlugins = (configs: StrikethroughPluginConfig) => [
  ...strikethroughKeymapPlugins(configs),
];
