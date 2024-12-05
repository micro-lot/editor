import { ALIGN_ITEMS, FLEX_DIRECTION, JUSTIFY_CONTENT, LAYOUT_TYPE } from './constants';

import {
  BorderAttributes,
  BorderedNodeSpec,
  DimensionAttributes,
  DimensionedNodeSpec,
  MarginAttributes,
  MarginedNodeSpec,
  PaddedNodeSpec,
  PaddingAttributes,
} from '@/core/types';
import { NodeSpec } from 'prosemirror-model';

export type LayoutType = (typeof LAYOUT_TYPE)[keyof typeof LAYOUT_TYPE];

export type FlexDirection = (typeof FLEX_DIRECTION)[keyof typeof FLEX_DIRECTION];

export type FlexJustifyContent = (typeof JUSTIFY_CONTENT)[keyof typeof JUSTIFY_CONTENT];

export type FlexAlignItems = (typeof ALIGN_ITEMS)[keyof typeof ALIGN_ITEMS];

export interface GridAttributes {
  some: string;
}

export interface LayoutAttributes
  extends DimensionAttributes,
    MarginAttributes,
    PaddingAttributes,
    BorderAttributes {
  type: LayoutType;
  applied: boolean;
  direction: FlexDirection;
  alignItems: FlexAlignItems;
  justifyContent: FlexJustifyContent;
  gap: string;
}

export interface LayoutNodeSpecBase {
  attrs: {
    type: {
      default: LayoutType;
    };
    direction: {
      default: FlexDirection;
    };
    alignItems: {
      default: FlexAlignItems;
    };
    justifyContent: {
      default: FlexJustifyContent;
    };
    gap: {
      default: string;
    };
  };
}

export type LayoutNodeSpec = NodeSpec &
  LayoutNodeSpecBase &
  DimensionedNodeSpec &
  MarginedNodeSpec &
  PaddedNodeSpec &
  BorderedNodeSpec;
