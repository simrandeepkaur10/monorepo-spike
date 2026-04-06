// apps/web/src/vite-env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DEFAULT_TENANT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}