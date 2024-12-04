import { StyleableNodeMeta } from '@/core/types/style';

export interface BorderAttributes {
  borderStyle: string;
  borderColor: string;
  borderWidth: string;
  borderRadius: string;
}

export interface BorderedNodeSpec {
  attrs: {
    borderStyle: {
      default: string;
    };
    borderColor: {
      default: string;
    };
    borderWidth: {
      default: string;
    };
    borderRadius: {
      default: string;
    };
  };
  meta: StyleableNodeMeta;
}

export type BorderUpdate = Partial<BorderAttributes>;
