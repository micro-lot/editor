import { StyleableNodeMeta } from '@/core/types/style';

export interface MarginAttributes {
  marginTop: number;
  marginRight: number;
  marginBottom: number;
  marginLeft: number;
}

export interface MarginedNodeSpec {
  attrs: {
    marginTop: {
      default: number;
    };
    marginRight: {
      default: number;
    };
    marginBottom: {
      default: number;
    };
    marginLeft: {
      default: number;
    };
  };
  meta: StyleableNodeMeta;
}

/**
 * 단축 속성
 * [top, right, bottom, left]
 */
export type MarginShorthand = [number, number, number, number];

/**
 * 단축 속성
 * [Y(top, bottom), X(right, left)]
 */
export type MarginXYShorthand = [number, number];

export type MarginUpdate = Partial<MarginAttributes> | MarginShorthand | MarginXYShorthand | number;

export const isMarginShorthand = (update: MarginUpdate): update is MarginShorthand =>
  Array.isArray(update) && update.length === 4;

export const isMarginXYShorthand = (update: MarginUpdate): update is MarginXYShorthand =>
  Array.isArray(update) && update.length === 2;

export const isNotMarginShorthand = (update: MarginUpdate): update is Partial<MarginAttributes> =>
  !Array.isArray(update) &&
  typeof update !== 'number' &&
  !!(update.marginTop || update.marginRight || update.marginBottom || update.marginLeft);
