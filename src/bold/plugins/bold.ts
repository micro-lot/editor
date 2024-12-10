import { boldKeymapPlugins } from '@/bold/plugins/keymap';
import { MarkType } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';

export interface BoldPluginConfigs {
  markType: MarkType;
}

export const boldPlugins = (configs: BoldPluginConfigs): Plugin[] => [
  ...boldKeymapPlugins(configs),
];
