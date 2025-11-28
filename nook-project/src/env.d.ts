/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  // más variables de entorno...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}