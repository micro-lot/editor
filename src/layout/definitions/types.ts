import { ALIGN_ITEMS, FLEX_DIRECTION, LAYOUT_TYPE } from './constants';

import { PaddedNodeSpec, PaddingAttributes } from '@/core';
import { NodeSpec } from 'prosemirror-model';

export type LayoutType = (typeof LAYOUT_TYPE)[keyof typeof LAYOUT_TYPE];

export type FlexDirection = (typeof FLEX_DIRECTION)[keyof typeof FLEX_DIRECTION];

export type FlexAlignItems = (typeof ALIGN_ITEMS)[keyof typeof ALIGN_ITEMS];

export interface FlexAttributes {
  direction: FlexDirection;
  alignItems: FlexAlignItems;
}

export interface GridAttributes {
  some: string;
}

export interface LayoutAttributesBase extends PaddingAttributes {
  type: LayoutType;
}

export type LayoutAttributes = LayoutAttributesBase & (FlexAttributes | GridAttributes);

export const isFlexTypeLayout = (
  layoutAttributes: LayoutAttributes,
): layoutAttributes is LayoutAttributesBase & FlexAttributes =>
  layoutAttributes.type === LAYOUT_TYPE.FLEX;

export const isGridTypeLayout = (
  layoutAttributes: LayoutAttributes,
): layoutAttributes is LayoutAttributesBase & GridAttributes =>
  layoutAttributes.type === LAYOUT_TYPE.GRID;

export type LayoutNodeSpec = NodeSpec & PaddedNodeSpec;
