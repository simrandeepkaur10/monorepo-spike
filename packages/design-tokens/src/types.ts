// packages/design-tokens/src/types.ts
export interface ColorTokens {
  primary: string;
  primaryHover: string;
  primaryForeground: string;
  secondary: string;
  secondaryHover: string;
  secondaryForeground: string;
  background: string;
  foreground: string;
  muted: string;
  mutedForeground: string;
  border: string;
  ring: string;
  destructive: string;
  destructiveForeground: string;
  success: string;
  successForeground: string;
  warning: string;
  warningForeground: string;
}

export interface TypographyTokens {
  fontFamily: string;
  fontFamilyMono: string;
  fontSizeBase: string;
  fontWeightNormal: string;
  fontWeightMedium: string;
  fontWeightBold: string;
  lineHeightBase: string;
  // ── Letter spacing ──────────────────────────────────────
  letterSpacingTight: string;
  letterSpacingNormal: string;
  letterSpacingWide: string;
  letterSpacingWider: string;
  letterSpacingWidest: string;
}

export interface SpacingTokens {
  unit: string;
  borderRadius: string;
  borderRadiusSm: string;
  borderRadiusLg: string;
  borderRadiusFull: string;
}

export interface ShadowTokens {
  sm: string;
  md: string;
  lg: string;
}

export interface DesignTokens {
  colors: ColorTokens;
  typography: TypographyTokens;
  spacing: SpacingTokens;
  shadows: ShadowTokens;
}

export type CSSVariableMap = Record<string, string>;

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type TenantTokenOverrides = DeepPartial<DesignTokens>;