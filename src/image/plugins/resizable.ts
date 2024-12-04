import { CLASS_NAME_BASE } from '@/core/constants';
import { Plugin, PluginKey } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

export const imageResizablePlugin = () =>
  new Plugin({
    key: new PluginKey('imageResizable'),
    props: {
      handleDOMEvents: {
        mousedown(view: EditorView, event: MouseEvent) {
          const target = event.target as HTMLElement;
          const wrapper = target.closest(`.${CLASS_NAME_BASE}-image-wrapper`) as HTMLElement;

          if (!wrapper?.classList.contains('ProseMirror-selectednode')) {
            return false;
          }

          const rect = wrapper.getBoundingClientRect();
          const isHandle = event.clientX > rect.right - 12 && event.clientY > rect.bottom - 12;

          if (!isHandle) return false;

          const startX = event.clientX;
          const img = wrapper.querySelector(`.${CLASS_NAME_BASE}-image`) as HTMLImageElement;
          const startWidth = img.offsetWidth;

          const initialPos = view.posAtDOM(wrapper, 0);
          if (initialPos === -1) return false;

          const onMouseMove = (e: MouseEvent) => {
            const currentX = e.clientX;
            const diff = currentX - startX;
            const newWidth = Math.max(50, startWidth + diff); // @TODO: 최소 50px로 일단 정함

            const { from } = view.state.selection;
            const node = view.state.doc.nodeAt(from);

            if (node?.type.name === 'image') {
              const tr = view.state.tr.setNodeMarkup(from, null, {
                ...node.attrs,
                width: newWidth,
              });
              view.dispatch(tr);
            }
          };

          const onMouseUp = () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
          };

          window.addEventListener('mousemove', onMouseMove);
          window.addEventListener('mouseup', onMouseUp);

          event.preventDefault();
          return true;
        },
      },
    },
  });
