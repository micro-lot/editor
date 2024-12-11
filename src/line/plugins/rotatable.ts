import { CLASS_NAME_BASE } from '@/core/constants';
import { Plugin, PluginKey } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { setLineProps } from '../commands/set-line-props';

export const lineRotatablePlugin = () =>
  new Plugin({
    key: new PluginKey('lineRotatable'),
    props: {
      handleDOMEvents: {
        mousedown(view: EditorView, event: MouseEvent) {
          const target = event.target as HTMLElement;
          const line = target.closest(`.${CLASS_NAME_BASE}-line`) as HTMLElement;

          if (!line) return false;

          const rect = line.getBoundingClientRect();
          const isRotateHandle = target.classList.contains(`${CLASS_NAME_BASE}-line-rotate-handle`);

          if (!isRotateHandle) return false;

          // 회전 시작점 계산
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const startAngle =
            Math.atan2(event.clientY - centerY, event.clientX - centerX) * (180 / Math.PI);

          const initialAngle = Number(line.getAttribute('data-angle')) || 0;

          const onMouseMove = (e: MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();

            const currentAngle =
              Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);

            let newAngle = initialAngle + (currentAngle - startAngle);

            const snapThreshold = 5;
            const commonAngles = [0, 45, 90, 135, 180, 225, 270, 315, 360];

            for (const angle of commonAngles) {
              if (Math.abs(newAngle - angle) < snapThreshold) {
                newAngle = angle;
                break;
              }
            }

            setLineProps({ angle: newAngle })(view.state, view.dispatch);
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
