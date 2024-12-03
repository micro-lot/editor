import { gapCursorPlugins, historyPlugins, keyMapPlugins, setPadding } from '@/core';
import { docNode } from '@/doc';
import { layoutNode } from '@/layout';
import { layoutPlugins } from '@/layout/plugins';
import { paragraphNode } from '@/paragraph';
import { paragraphPlugins } from '@/paragraph/plugins';
import { textNode } from '@/text';
import { DOMSerializer, Node, Schema } from 'prosemirror-model';
import { EditorState, Plugin } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

import { horizontalRuleNode } from '@/horizontal-rule';
import { setHorizontalRuleColor } from '@/horizontal-rule/commands';
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
    ...horizontalRuleNode(),
  },
});

const sampleDoc: Node = microLotSchema.node('doc', null, [
  microLotSchema.node('layout', { paddingTop: 10 }, [
    microLotSchema.node('paragraph', null, [microLotSchema.text('This is a sample paragraph.')]),
    microLotSchema.node('paragraph', null, [microLotSchema.text('This is a sample paragraph2.')]),
  ]),
  microLotSchema.node('horizontalRule', null),
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
  const paddingInput = document.getElementById('paddingInput') as HTMLInputElement;
  const setPaddingButton = document.getElementById('setPadding') as HTMLButtonElement;
  const colorInput = document.getElementById('horizontalRuleColorInput') as HTMLInputElement;
  const horizontalRuleColorButton = document.getElementById(
    'setHorizontalRuleColor',
  ) as HTMLButtonElement;

  setPaddingButton.addEventListener('click', (event) => {
    event.preventDefault();

    if (!paddingInput.value) {
      return;
    }

    const value = parseInt(paddingInput.value);
    //
    setPadding(value)(editorView.state, editorView.dispatch);
  });

  horizontalRuleColorButton.addEventListener('click', (event) => {
    event.preventDefault();

    const color = colorInput.value;
    setHorizontalRuleColor(color)(editorView.state, editorView.dispatch);
  });
};

initEditorTools();
