import { ComputedRef, Ref } from 'vue'
export type LayoutKey = "art" | "default"
declare module "/Users/samwise/dev/surf-garage/surf-garage-nuxt3/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}