import { docNode } from '@/doc';
import { layoutNode } from '@/layout';
import { textNode } from '@/text';
import { Schema } from 'prosemirror-model';
import './style.css';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

console.log('hello world');

const microLotSchema: Schema = new Schema({
  nodes: {
    ...docNode(),
    ...textNode(),
    ...layoutNode(),
  },
});
const state: EditorState = EditorState.create({
  schema: microLotSchema,
});

const editorView: EditorView = new EditorView(document.getElementById('editor'), {
  state,
});

console.log(editorView);
