import { italicKeymapPlugins } from '@/italic/plugins/keymap';
import { MarkType } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';

export interface ItalicPluginConfig {
  markType: MarkType;
}

export const italicPlugins = (configs: ItalicPluginConfig): Plugin[] => [
  ...italicKeymapPlugins(configs),
];
