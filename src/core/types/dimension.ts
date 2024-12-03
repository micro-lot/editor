import { StyleableNodeMeta } from '@/core/types/style';

export type DimensionValue = string | number;

export interface DimensionAttributes {
  width: DimensionValue;
  height: DimensionValue;
}

export interface DimensionedNodeSpec {
  attrs: {
    width: {
      default: DimensionValue;
    };
    height: {
      default: DimensionValue;
    };
  };
  meta: StyleableNodeMeta;
}

export type DimensionUpdate = Partial<DimensionAttributes> | DimensionValue;

export const isPartialDimensionUpdate = (
  update: DimensionUpdate,
): update is Partial<DimensionAttributes> =>
  typeof update === 'object' && !!(update.width || update.height);
