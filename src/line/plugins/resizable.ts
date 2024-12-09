import { CLASS_NAME_BASE } from '@/core/constants';
import { Plugin, PluginKey } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { setLineProps } from '../commands/set-line-props';

export const lineResizablePlugin = () =>
  new Plugin({
    key: new PluginKey('lineResizable'),
    props: {
      handleDOMEvents: {
        mousedown(view: EditorView, event: MouseEvent) {
          const target = event.target as HTMLElement;
          const wrapper = target.closest(`.${CLASS_NAME_BASE}-line-wrapper`) as HTMLElement;

          if (!wrapper?.classList.contains('ProseMirror-selectednode')) {
            return false;
          }

          const isLeftHandle = target.classList.contains(
            `${CLASS_NAME_BASE}-line-resize-handle-left`,
          );
          const isRightHandle = target.classList.contains(
            `${CLASS_NAME_BASE}-line-resize-handle-right`,
          );

          if (!isLeftHandle && !isRightHandle) return false;

          // 초기값 설정
          const startX = event.clientX;
          const line = wrapper.querySelector(`.${CLASS_NAME_BASE}-line`) as HTMLElement;
          const initialLength =
            Number(line.style.getPropertyValue('--line-length').replace('px', '')) || 100;
          const initialAngle =
            Number(line.style.getPropertyValue('--line-angle').replace('deg', '')) || 0;

          // 각도에 따른 리사이즈 방향 조정을 위한 함수
          const getAdjustedDiff = (rawDiff: number, angle: number) => {
            // 각도를 라디안으로 변환
            const rad = (angle * Math.PI) / 180;
            // 각도에 따른 방향 보정
            return rawDiff * Math.cos(rad);
          };

          const onMouseMove = (e: MouseEvent) => {
            const rawDiff = e.clientX - startX;
            // 각도를 고려한 실제 길이 변화량 계산
            const adjustedDiff = getAdjustedDiff(rawDiff, initialAngle);

            let newLength: number;

            if (isLeftHandle) {
              // 왼쪽 핸들: 반대 방향으로 길이 조정
              newLength = Math.max(10, initialLength - adjustedDiff);
            } else {
              // 오른쪽 핸들: 같은 방향으로 길이 조정
              newLength = Math.max(10, initialLength + adjustedDiff);
            }

            // 10px 단위
            newLength = Math.round(newLength / 10) * 10;

            setLineProps({ length: newLength })(view.state, view.dispatch);
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
