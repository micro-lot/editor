import { Command } from 'prosemirror-state';

interface LineProps {
  color?: string;
  angle?: number;
  length?: number;
  thickness?: number;
}

export const setLineProps = (props: LineProps): Command => {
  return (state, dispatch) => {
    const { $from, $to } = state.selection;
    let linePos = -1;

    state.doc.nodesBetween($from.pos, $to.pos, (node, pos) => {
      if (node.type.name === 'line') {
        linePos = pos;
        return false;
      }
    });

    if (linePos === -1) return false;

    if (dispatch) {
      const node = state.doc.nodeAt(linePos);
      // 5도 단위로 각도 조정
      if (props.angle !== undefined) {
        props.angle = Math.round(props.angle / 5) * 5;
      }
      const tr = state.tr.setNodeMarkup(linePos, null, {
        ...node?.attrs,
        ...props,
      });
      dispatch(tr);
    }

    return true;
  };
};
