// apps/web/src/app/ThemeProvider.tsx
import { useEffect } from 'react';
import { useThemeStore } from '../hooks/useThemeStore';
import { resolveTenantId } from '../hooks/useTenantResolver';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { loadTheme, isLoading } = useThemeStore();

  useEffect(() => {
    const tenantId = resolveTenantId();
    if (tenantId) {
      loadTheme(tenantId);
    }
  }, [loadTheme]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-white">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
      </div>
    );
  }

  return <>{children}</>;
}