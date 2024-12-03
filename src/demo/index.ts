import { gapCursorPlugins, historyPlugins, keyMapPlugins, setMargin, setPadding } from '@/core';
import { docNode } from '@/doc';
import { layoutNode } from '@/layout';
import { layoutPlugins } from '@/layout/plugins';
import { lineNode } from '@/line';
import { setLineProps } from '@/line/commands';
import { paragraphNode } from '@/paragraph';
import { paragraphPlugins } from '@/paragraph/plugins';
import { textNode } from '@/text';
import { DOMSerializer, Node, Schema } from 'prosemirror-model';
import { EditorState, Plugin } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

import './editor.scss';
import './style.css';

const result: HTMLElement = document.getElementById('result')!;
const jsonResult: HTMLElement = document.getElementById('jsonResult')!;

const microLotSchema: Schema = new Schema({
  nodes: {
    ...docNode(),
    ...textNode(),
    ...layoutNode(),
    ...paragraphNode(),
    ...lineNode(),
  },
});

const sampleDoc: Node = microLotSchema.node('doc', null, [
  microLotSchema.node('layout', { paddingTop: 10, marginBottom: 20 }, [
    microLotSchema.node('paragraph', null, [microLotSchema.text('This is a sample paragraph.')]),
    microLotSchema.node('paragraph', null, [microLotSchema.text('This is a sample paragraph2.')]),
  ]),
  microLotSchema.node('line', null),
  microLotSchema.node('layout', null),
]);

const samplePlugins: Plugin[] = [
  ...keyMapPlugins(),
  ...historyPlugins(),
  ...gapCursorPlugins(),
  ...layoutPlugins({
    layoutNodeType: microLotSchema.nodes.layout,
    defaultContentNodeType: microLotSchema.nodes.paragraph,
  }),
  ...paragraphPlugins({ nodeType: microLotSchema.nodes.paragraph }),
];
const state: EditorState = EditorState.create({
  schema: microLotSchema,
  doc: sampleDoc,
  plugins: samplePlugins,
});

const editorView: EditorView = new EditorView(document.getElementById('editor'), {
  state,
  dispatchTransaction: (tr) => {
    const newState = editorView.state.apply(tr);
    editorView.updateState(newState);

    result.replaceChildren(
      DOMSerializer.fromSchema(microLotSchema).serializeFragment(newState.doc.content),
    );
    jsonResult.innerHTML = JSON.stringify(newState.doc.toJSON(), null, 2);

    if (tr.selectionSet) {
      const { selection, doc } = newState;
      console.log('selection node?: ', doc.nodeAt(selection.from)?.type.name);
    }
  },
});

console.log(editorView);

const initEditorTools = () => {
  const marginInput = document.getElementById('marginInput') as HTMLInputElement;
  const setMarginButton = document.getElementById('setMargin') as HTMLButtonElement;

  const paddingInput = document.getElementById('paddingInput') as HTMLInputElement;
  const setPaddingButton = document.getElementById('setPadding') as HTMLButtonElement;
  const lineColor = document.getElementById('lineColor') as HTMLInputElement;
  const lineAngle = document.getElementById('lineAngle') as HTMLInputElement;
  const angleValue = document.getElementById('angleValue') as HTMLSpanElement;
  const lineLength = document.getElementById('lineLength') as HTMLInputElement;
  const lineThickness = document.getElementById('lineThickness') as HTMLInputElement;

  setMarginButton.addEventListener('click', (event) => {
    event.preventDefault();

    if (!marginInput.value) {
      return;
    }

    const value = parseInt(marginInput.value);
    setMargin(value)(editorView.state, editorView.dispatch);
  });

  setPaddingButton.addEventListener('click', (event) => {
    event.preventDefault();

    if (!paddingInput.value) {
      return;
    }

    const value = parseInt(paddingInput.value);
    setPadding(value)(editorView.state, editorView.dispatch);
  });

  // 선의 속성
  // 각도 변경 시
  lineAngle.addEventListener('input', () => {
    angleValue.textContent = `${lineAngle.value}°`;
    setLineProps({
      angle: Number(lineAngle.value),
    })(editorView.state, editorView.dispatch);
  });

  // 색상 변경 시
  lineColor.addEventListener('change', () => {
    setLineProps({
      color: lineColor.value,
    })(editorView.state, editorView.dispatch);
  });

  // 길이 변경 시
  lineLength.addEventListener('input', () => {
    setLineProps({
      length: Number(lineLength.value),
    })(editorView.state, editorView.dispatch);
  });

  // 두께 변경 시
  lineThickness.addEventListener('input', () => {
    setLineProps({
      thickness: Number(lineThickness.value),
    })(editorView.state, editorView.dispatch);
  });
};

initEditorTools();
