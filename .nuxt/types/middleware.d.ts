import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = string
declare module "/Users/samwise/dev/surf-garage/surf-art/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}