import { ComputedRef, Ref } from 'vue'
export type LayoutKey = "default"
declare module "/Users/samwise/dev/surf-garage/surf-art/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}