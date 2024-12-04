import { Command } from 'prosemirror-state';

export const insertImage = (file: File): Command => {
  return (state, dispatch) => {
    const url = URL.createObjectURL(file);

    const img = new Image();
    img.src = url;

    img.onload = () => {
      const maxWidth = 300;
      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        const ratio = maxWidth / width;
        width = maxWidth;
        height = height * ratio;
      }

      if (dispatch) {
        const node = state.schema.nodes.image.create({
          src: url,
          width,
          height,
        });
        const tr = state.tr.replaceSelectionWith(node);
        dispatch(tr);
      }
    };

    return true;
  };
};
