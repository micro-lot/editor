import { mac } from '@/utilities/user-agent';
import { setBlockType } from 'prosemirror-commands';
import { keymap } from 'prosemirror-keymap';
import { NodeType } from 'prosemirror-model';

export interface ParagraphKeyMapPluginConfig {
  nodeType: NodeType;
}

export const paragraphKeyMapPlugin = (configs: ParagraphKeyMapPluginConfig) => {
  const key = mac ? 'Mod-0' : 'Ctrl-0';

  return [
    keymap({
      [key]: (state, dispatch, view) => {
        // 현재 선택된 위치에서 paragraph 노드 타입이 허용되는지 확인
        const { $from } = state.selection;
        const range = $from.blockRange($from);

        if (!range) return false;

        // paragraph로 변환 시도
        const result = setBlockType(configs.nodeType)(state, dispatch, view);

        console.log('Paragraph conversion attempted:', result); // 디버깅용
        return result;
      },
    }),
  ];
};
