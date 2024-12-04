import {
  BorderAttributes,
  DimensionAttributes,
  MarginAttributes,
  PaddingAttributes,
} from '@/core/types';
import {
  resolveDimensionValueToAttr,
  resolveDimensionValueToStyle,
} from '@/core/utilities/resolve-dimension';

export const parseDimensionFromDOMStyle = (style: CSSStyleDeclaration) => ({
  width: resolveDimensionValueToAttr(style.width),
  height: resolveDimensionValueToAttr(style.height),
});

export const dimensionToDOMStyle = <T extends DimensionAttributes>(attrs: T) => ({
  width: attrs.width ? resolveDimensionValueToStyle(attrs.width) : null,
  height: attrs.height ? resolveDimensionValueToStyle(attrs.height) : null,
});

export const parseMarginFromDOMStyle = (style: CSSStyleDeclaration) => ({
  marginTop: Number.parseInt(style.marginTop) || 0,
  marginRight: Number.parseInt(style.marginRight) || 0,
  marginBottom: Number.parseInt(style.marginBottom) || 0,
  marginLeft: Number.parseInt(style.marginLeft) || 0,
});

export const marginToDOMStyle = <T extends MarginAttributes>(attrs: T) => ({
  'margin-top': attrs.marginTop ? `${attrs.marginTop}px` : null,
  'margin-right': attrs.marginRight ? `${attrs.marginRight}px` : null,
  'margin-bottom': attrs.marginBottom ? `${attrs.marginBottom}px` : null,
  'margin-left': attrs.marginLeft ? `${attrs.marginLeft}px` : null,
});

export const parsePaddingFromDOMStyle = (style: CSSStyleDeclaration) => ({
  paddingTop: Number.parseInt(style.paddingTop) || 0,
  paddingRight: Number.parseInt(style.paddingRight) || 0,
  paddingBottom: Number.parseInt(style.paddingBottom) || 0,
  paddingLeft: Number.parseInt(style.paddingLeft) || 0,
});

export const paddingToDOMStyle = <T extends PaddingAttributes>(attrs: T) => ({
  'padding-top': attrs.paddingTop ? `${attrs.paddingTop}px` : null,
  'padding-right': attrs.paddingRight ? `${attrs.paddingRight}px` : null,
  'padding-bottom': attrs.paddingBottom ? `${attrs.paddingBottom}px` : null,
  'padding-left': attrs.paddingLeft ? `${attrs.paddingLeft}px` : null,
});

export const parseBorderFromDOMStyle = (style: CSSStyleDeclaration) => ({
  borderWidth: Number.parseInt(style.borderWidth) || 0,
  borderStyle: Number.parseInt(style.borderStyle) || 0,
  borderColor: Number.parseInt(style.borderColor) || 0,
  borderRadius: Number.parseInt(style.borderRadius) || 0,
});

export const borderToDOMStyle = <T extends BorderAttributes>(attrs: T) => ({
  'border-width': attrs.borderWidth ? attrs.borderWidth : null,
  'border-style': attrs.borderStyle ? attrs.borderStyle : null,
  'border-color': attrs.borderColor ? attrs.borderColor : null,
  'border-radius': attrs.borderRadius ? attrs.borderRadius : null,
});
