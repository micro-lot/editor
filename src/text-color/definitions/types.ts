import { MarkSpec } from 'prosemirror-model';

export interface TextColorMarkSpec extends MarkSpec {
  attrs: {
    color: {
      default: string;
    };
  };
}

export interface TextColorAttributes {
  color: string;
}
