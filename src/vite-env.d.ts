/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly REDIS_URL: string
  readonly REDIS_PASSWORD: string
  readonly REDIS_USERNAME: string
  readonly REDIS_TLS: string
  readonly OLLAMA_API_URL: string
  readonly OLLAMA_MODEL: string
  readonly AWS_ACCESS_KEY_ID: string
  readonly AWS_SECRET_ACCESS_KEY: string
  readonly AWS_REGION: string
  readonly AWS_BUCKET_NAME: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}