/**
 * Resolves tenant ID from multiple sources in priority order:
 *
 * 1. URL query param  → ?tenant=tenant-a
 * 2. WebView global   → window.__TENANT_ID__
 * 3. Env variable     → VITE_DEFAULT_TENANT
 */
export function resolveTenantId(): string | null {
  // 1. Query param (highest priority)
  const params = new URLSearchParams(window.location.search);
  const fromQuery = params.get('tenant');
  if (fromQuery) return fromQuery;

  // 2. WebView injected global
  const fromWebView = (
    window as Window & { __TENANT_ID__?: string }
  ).__TENANT_ID__;
  if (fromWebView) return fromWebView;

  // 3. Build-time env variable
  const fromEnv = import.meta.env.VITE_DEFAULT_TENANT;
  if (fromEnv) return fromEnv;

  return null;
}