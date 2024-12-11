import { MarkSpec } from 'prosemirror-model';

export const strikethroughMark = (): Record<string, MarkSpec> => ({
  strikethrough: {
    parseDOM: [
      { tag: 's' },
      { tag: 'strike' },
      { tag: 'del' },
      { style: 'text-decoration=line-through' },
    ],
    toDOM() {
      return ['s'];
    },
  },
});
