import { TextColorAttributes } from '@/text-color/definitions';
import { toggleMark } from 'prosemirror-commands';
import { MarkType } from 'prosemirror-model';
import { Command } from 'prosemirror-state';

export const toggleTextColorCommand = (
  markType: MarkType,
  attrs?: Partial<TextColorAttributes>,
): Command => toggleMark(markType, attrs);
