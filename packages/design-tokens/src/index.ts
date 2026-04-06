// packages/design-tokens/src/index.ts
export { baseTokens } from './tokens/base';
import type {
  DesignTokens,
  TenantTokenOverrides,
} from './types';

export type {
  DesignTokens,
  ColorTokens,
  TypographyTokens,
  SpacingTokens,
  ShadowTokens,
  CSSVariableMap,
  TenantTokenOverrides,
} from './types';

/**
 * Converts nested DesignTokens into a flat CSS variable map
 * { colors: { primary: '#fff' } } → { '--color-primary': '#fff' }
 */
export function tokensToCSSVariables(
  tokens: DesignTokens
): Record<string, string> {
  const result: Record<string, string> = {};

  const prefixMap: Record<keyof DesignTokens, string> = {
    colors: '--color',
    typography: '--typography',
    spacing: '--spacing',
    shadows: '--shadow',
  };

  for (const [group, prefix] of Object.entries(prefixMap)) {
    const groupTokens = tokens[group as keyof DesignTokens];

    for (const [key, value] of Object.entries(groupTokens)) {
      // camelCase → kebab-case
      const kebabKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      result[`${prefix}-${kebabKey}`] = value as string;
    }
  }

  return result;
}

/**
 * Applies CSS variables to a DOM element (defaults to :root)
 */
export function applyCSSVariables(
  variables: Record<string, string>,
  element: HTMLElement = document.documentElement
): void {
  for (const [property, value] of Object.entries(variables)) {
    element.style.setProperty(property, value);
  }
}

/**
 * Merges tenant overrides onto base tokens
 */
export function mergeTokens(
  base: DesignTokens,
  overrides: TenantTokenOverrides
): DesignTokens {
  return {
    colors: { ...base.colors, ...overrides.colors },
    typography: { ...base.typography, ...overrides.typography },
    spacing: { ...base.spacing, ...overrides.spacing },
    shadows: { ...base.shadows, ...overrides.shadows },
  };
}