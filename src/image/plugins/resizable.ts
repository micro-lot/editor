import { CLASS_NAME_BASE } from '@/core/constants';
import { NodeSelection, Plugin, PluginKey } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

export const imageResizablePlugin = () =>
  new Plugin({
    key: new PluginKey('imageResizable'),
    props: {
      handleDOMEvents: {
        mousedown(view: EditorView, event: MouseEvent) {
          const target = event.target as HTMLElement;
          const wrapper = target.closest(`.${CLASS_NAME_BASE}-image-wrapper`) as HTMLElement;
          const isResizeHandle = target.classList.contains(
            `${CLASS_NAME_BASE}-image-resize-handle-right-bottom`,
          );
          const img = wrapper?.querySelector(`.${CLASS_NAME_BASE}-image`) as HTMLImageElement;

          if (!wrapper || !isResizeHandle || !img) {
            return false;
          }

          // 노드 선택
          const pos = view.posAtDOM(wrapper, 0);
          if (pos === null) {
            return false;
          }

          const tr = view.state.tr.setSelection(NodeSelection.create(view.state.doc, pos));
          view.dispatch(tr);

          event.preventDefault();
          event.stopPropagation();

          // 드래그 시작 방지
          // wrapper.addEventListener('dragstart', (e) => e.preventDefault());

          const startX = event.clientX;
          const startY = event.clientY;
          const startWidth = img.offsetWidth;
          const startHeight = img.offsetHeight;

          const onMouseMove = (e: MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();

            const currentX = e.clientX;
            const currentY = e.clientY;
            const diffX = currentX - startX;
            const diffY = currentY - startY;

            // 비율 유지를 위한 계산
            const ratio = startHeight / startWidth;
            const newWidth = Math.max(50, startWidth + diffX);
            const newHeight = Math.round(newWidth * ratio);

            const { from } = view.state.selection;
            const node = view.state.doc.nodeAt(from);

            if (node?.type.name === 'image') {
              const tr = view.state.tr.setNodeMarkup(from, null, {
                ...node.attrs,
                width: newWidth,
                height: newHeight,
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

          return true;
        },
      },
    },
  });
