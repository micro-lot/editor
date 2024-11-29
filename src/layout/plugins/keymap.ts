import { createLayoutCommand } from '@/layout/commands';
import { FLEX_DIRECTION, LAYOUT_TYPE } from '@/layout/definitions';
import { keymap } from 'prosemirror-keymap';
import { NodeType } from 'prosemirror-model';

export interface LayoutKeyMapPluginConfig {
  layoutNodeType: NodeType;
}

export const layoutKeyMapPlugins = (config: LayoutKeyMapPluginConfig) => {
  return [
    keymap({
      'Shift-Mod-l': createLayoutCommand(config.layoutNodeType, {
        type: LAYOUT_TYPE.FLEX,
        direction: FLEX_DIRECTION.COL,
      }),
    }),
  ];
};
