import {
  BorderedNodeSpec,
  DimensionedNodeSpec,
  MarginedNodeSpec,
  PaddedNodeSpec,
} from '@/core/types';

export const defaultDimensionAttrs = (): DimensionedNodeSpec['attrs'] => ({
  width: {
    default: '100%',
  },
  height: {
    default: 'auto',
  },
});

export const defaultMarginAttrs = (): MarginedNodeSpec['attrs'] => ({
  marginTop: {
    default: 0,
  },
  marginRight: {
    default: 0,
  },
  marginBottom: {
    default: 0,
  },
  marginLeft: {
    default: 0,
  },
});

export const defaultPaddingAttrs = (): PaddedNodeSpec['attrs'] => ({
  paddingTop: {
    default: 0,
  },
  paddingRight: {
    default: 0,
  },
  paddingBottom: {
    default: 0,
  },
  paddingLeft: {
    default: 0,
  },
});

export const defaultBorderAttrs = (): BorderedNodeSpec['attrs'] => ({
  borderWidth: {
    default: '',
  },
  borderStyle: {
    default: '',
  },
  borderColor: {
    default: '',
  },
  borderRadius: {
    default: '',
  },
});
