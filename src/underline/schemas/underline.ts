import { CLASS_NAME_BASE } from '@/core/constants';
import { MarkSpec } from 'prosemirror-model';

export const underlineMark = (): Record<string, MarkSpec> => {
  const underlineRegex = /\bunderline\b/;

  return {
    underline: {
      parseDOM: [
        { tag: 'u' },
        {
          tag: 'span',
          getAttrs(node: HTMLElement) {
            const dom = node;

            return underlineRegex.test(dom.style.textDecoration) && false;
          },
        },
        {
          tag: 'span',
          getAttrs(node: HTMLElement) {
            return node.style.textDecorationLine === 'underline' && false;
          },
        },
        {
          tag: 'span',
          getAttrs(node: HTMLElement) {
            return (
              node.style.textDecorationStyle === 'solid' &&
              underlineRegex.test(node.style.textDecoration) &&
              false
            );
          },
        },
        {
          style: 'text-decoration-line',
          getAttrs: (value) => value === 'underline' && false,
        },
        {
          // MS Word 스타일
          style: 'mso-text-underline',
          getAttrs: (value) => value === 'single' && false,
        },
      ],
      toDOM() {
        return [
          'span',
          {
            class: `${CLASS_NAME_BASE}-underline`,
          },
        ];
      },
    },
  };
};
