// apps/web/src/services/themeService.ts
import type { TenantTokenOverrides } from '@repo/design-tokens';

/**
 * Fetches a tenant-specific theme JSON from /public/themes/
 * Returns empty object if not found (falls back to base tokens)
 */
export async function fetchTenantTheme(
  tenantId: string
): Promise<TenantTokenOverrides> {
  try {
    const response = await fetch(`/themes/${tenantId}.json`);

    if (!response.ok) {
      console.warn(
        `[ThemeService] No theme found for "${tenantId}", using base tokens.`
      );
      return {};
    }

    return response.json();
  } catch (error) {
    console.error('[ThemeService] Failed to fetch theme:', error);
    return {};
  }
}