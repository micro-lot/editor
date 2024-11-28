import { paragraphKeyMapPlugin } from './keymap';

import { NodeType } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';

export interface ParagraphPluginConfigs {
  nodeType: NodeType;
}

export const paragraphPlugins = (configs: ParagraphPluginConfigs): Plugin[] => {
  const plugins: Plugin[] = [];

  plugins.push(
    ...paragraphKeyMapPlugin({
      nodeType: configs.nodeType,
    }),
  );

  return plugins;
};
