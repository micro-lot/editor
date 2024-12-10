import { MarkSpec } from 'prosemirror-model';

export const italicMark = (): Record<string, MarkSpec> => {
  return {
    italic: {
      parseDOM: [
        { tag: 'i' },
        { tag: 'em' },
        { style: 'font-style=italic' },
        { style: 'font-style=normal', clearMark: (m) => m.type.name === 'italic' },
      ],
      toDOM() {
        return ['em'];
      },
    },
  };
};
