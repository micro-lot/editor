import { layoutClickPlugins } from '@/layout/plugins/click-handler';
import { layoutKeyMapPlugins } from '@/layout/plugins/keymap';
import { NodeType } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';

export interface LayoutPluginConfigs {
  layoutNodeType: NodeType;
  defaultContentNodeType: NodeType;
}

export const layoutPlugins = (configs: LayoutPluginConfigs): Plugin[] => {
  return [...layoutKeyMapPlugins(configs), ...layoutClickPlugins(configs)];
};
