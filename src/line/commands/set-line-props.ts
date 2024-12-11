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

      const tr = state.tr.setNodeMarkup(linePos, null, {
        ...node?.attrs,
        ...props,
      });
      dispatch(tr);
    }

    return true;
  };
};
