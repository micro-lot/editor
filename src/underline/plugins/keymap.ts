import { toggleMark } from 'prosemirror-commands';
import { keymap } from 'prosemirror-keymap';
import { MarkType } from 'prosemirror-model';
import { Plugin } from 'prosemirror-state';

export interface UnderlineKeymapPluginConfig {
  markType: MarkType;
}

export const underlineKeymapPlugins = (configs: UnderlineKeymapPluginConfig): Plugin[] => {
  const toggleUnderlineMark = toggleMark(configs.markType);

  return [
    keymap({
      'Mod-u': toggleUnderlineMark,
      'Mod-U': toggleUnderlineMark,
    }),
  ];
};
