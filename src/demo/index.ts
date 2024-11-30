import { historyPlugins, keyMapPlugins } from '@/core';
import { docNode } from '@/doc';
import { layoutNode } from '@/layout';
import { layoutPlugins } from '@/layout/plugins';
import { paragraphNode } from '@/paragraph';
import { paragraphPlugins } from '@/paragraph/plugins';
import { textNode } from '@/text';
import { DOMSerializer, Node, Schema } from 'prosemirror-model';
import { EditorState, Plugin } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

import './style.css';
import 'prosemirror-view/style/prosemirror.css';
import './editor.scss';

const result: HTMLElement = document.getElementById('result')!;
const jsonResult: HTMLElement = document.getElementById('jsonResult')!;

const microLotSchema: Schema = new Schema({
  nodes: {
    ...docNode(),
    ...textNode(),
    ...layoutNode(),
    ...paragraphNode(),
  },
});
const sampleDoc: Node = microLotSchema.node('doc', null, [
  microLotSchema.node('layout', null, [
    microLotSchema.node('paragraph', null, [microLotSchema.text('This is a sample paragraph.')]),
    microLotSchema.node('paragraph', null, [microLotSchema.text('This is a sample paragraph2.')]),
  ]),
  microLotSchema.node('layout', null),
]);
const samplePlugins: Plugin[] = [
  ...keyMapPlugins(),
  ...historyPlugins(),
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
  },
});

console.log(editorView);
