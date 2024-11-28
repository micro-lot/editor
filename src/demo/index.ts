import { docNode } from '@/doc';
import { layoutNode } from '@/layout';
import { paragraphNode } from '@/paragraph';
import { paragraphKeyMapPlugin } from '@/paragraph/plugins';
import { textNode } from '@/text';
import { baseKeymap } from 'prosemirror-commands';
import { history } from 'prosemirror-history';
import { keymap } from 'prosemirror-keymap';
import { Node, Schema } from 'prosemirror-model';
import { EditorState, Plugin } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

import './style.css';
import 'prosemirror-view/style/prosemirror.css';

console.log('hello world');

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
]);
const samplePlugins: Plugin[] = [
  keymap(baseKeymap),
  history(),
  ...paragraphKeyMapPlugin({ nodeType: microLotSchema.nodes.paragraph }),
];
const state: EditorState = EditorState.create({
  schema: microLotSchema,
  doc: sampleDoc,
  plugins: samplePlugins,
});

const editorView: EditorView = new EditorView(document.getElementById('editor'), {
  state,
});

console.log(editorView);
