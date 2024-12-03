import { DimensionValue } from '@/core/types';

export const resolveDimensionValueToStyle = (value: DimensionValue): string => {
  if (typeof value === 'number') {
    return `${value}px`;
  }

  return value;
};

// 100%, 100px
export const resolveDimensionValueToAttr = (value: string): DimensionValue => {
  const numberValue = Number.parseInt(value);
  const floatPercentRegex = /^\d+(\.\d+)?%$/;

  if (Number.isNaN(numberValue) || floatPercentRegex.test(value)) {
    // auto, fit-content, 100%, ...
    return value;
  }

  // px제거됨
  return numberValue;
};
