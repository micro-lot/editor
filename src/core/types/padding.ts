import { StyleableNodeMeta } from '@/core/types/style';

export interface PaddingAttributes {
  paddingTop: number;
  paddingRight: number;
  paddingBottom: number;
  paddingLeft: number;
}

export interface PaddedNodeSpec {
  attrs: {
    paddingTop: {
      default: number;
    };
    paddingRight: {
      default: number;
    };
    paddingBottom: {
      default: number;
    };
    paddingLeft: {
      default: number;
    };
  };
  meta: StyleableNodeMeta;
}

/**
 * 단축 속성
 * [top, right, bottom, left]
 */
export type PaddingShorthand = [number, number, number, number];

/**
 * 단축 속성
 * [Y(top, bottom), X(right, left)]
 */
export type PaddingXYShorthand = [number, number];

export type PaddingUpdate =
  | Partial<PaddingAttributes>
  | PaddingShorthand
  | PaddingXYShorthand
  | number;

export const isPaddingShorthand = (update: PaddingUpdate): update is PaddingShorthand =>
  Array.isArray(update) && update.length === 4;

export const isPaddingXYShorthand = (update: PaddingUpdate): update is PaddingXYShorthand =>
  Array.isArray(update) && update.length === 2;

export const isNotPaddingShorthand = (
  update: PaddingUpdate,
): update is Partial<PaddingAttributes> =>
  !Array.isArray(update) &&
  typeof update !== 'number' &&
  !!(update.paddingTop || update.paddingRight || update.paddingBottom || update.paddingLeft);
