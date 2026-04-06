// apps/web/src/hooks/useThemeStore.ts
import { create } from 'zustand';
import {
  baseTokens,
  mergeTokens,
  tokensToCSSVariables,
  applyCSSVariables,
  type DesignTokens,
} from '@repo/design-tokens';
import { fetchTenantTheme } from '../services/themeService';

interface ThemeState {
  tenantId: string | null;
  tokens: DesignTokens;
  isLoading: boolean;
  error: string | null;
  loadTheme: (tenantId: string) => Promise<void>;
  resetTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  tenantId: null,
  tokens: baseTokens,
  isLoading: false,
  error: null,

  loadTheme: async (tenantId: string) => {
    set({ isLoading: true, error: null });

    try {
      const overrides = await fetchTenantTheme(tenantId);
      const merged = mergeTokens(baseTokens, overrides);
      const cssVars = tokensToCSSVariables(merged);

      // Apply to :root — Tailwind picks these up automatically
      applyCSSVariables(cssVars);

      set({ tenantId, tokens: merged, isLoading: false });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Unknown error';
      console.error('[ThemeStore] Failed to load theme:', message);

      // Fall back to base tokens on error
      applyCSSVariables(tokensToCSSVariables(baseTokens));
      set({ error: message, isLoading: false });
    }
  },

  resetTheme: () => {
    applyCSSVariables(tokensToCSSVariables(baseTokens));
    set({ tenantId: null, tokens: baseTokens, error: null });
  },
}));