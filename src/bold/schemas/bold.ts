import { MarkSpec } from 'prosemirror-model';

export const boldMark = (): Record<string, MarkSpec> => {
  const markSpec: MarkSpec = {
    parseDOM: [
      { tag: 'strong' },
      {
        // <b> 태그이면서 fontWeight가 normal이 아닌 경우에도 boldMark로 취급
        tag: 'b',
        getAttrs(node: HTMLElement) {
          const dom = node;

          return dom.style.fontWeight !== 'normal' && null;
        },
      },
    ],
    toDOM() {
      return ['strong'];
    },
  };

  return {
    bold: markSpec,
  };
};
