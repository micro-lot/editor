import { Command } from 'prosemirror-state';

export const setHorizontalRuleColor = (color: string | null): Command => {
  return (state, dispatch) => {
    const { $from, $to } = state.selection;
    let hrPosition = -1;

    // 선택 범위 내의 노드들을 순회
    state.doc.nodesBetween($from.pos, $to.pos, (node, pos) => {
      if (node.type.name === 'horizontalRule') {
        hrPosition = pos;
        return false; // 찾았으면 순회 중단
      }
    });

    if (hrPosition === -1) {
      return false; // HR을 찾지 못함
    }

    if (dispatch) {
      const node = state.doc.nodeAt(hrPosition);
      console.log(node);
      const tr = state.tr.setNodeMarkup(hrPosition, null, {
        ...node?.attrs,
        color,
      });
      dispatch(tr);
    }

    return true;
  };
};
