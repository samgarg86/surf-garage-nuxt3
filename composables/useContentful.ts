import defaultContentful from 'contentful'
import { createClient } from "contentful"

export const useContentful = () => {
  const { public: { contentful: { space, accessToken } } } = useRuntimeConfig()
  const { locale } = useI18n()

  if (!space || !accessToken) {
    throw createError({ statusCode: 404, statusMessage: 'CMS not working' })
  }
  const client = process.env.NODE_ENV == 'production' ?
    defaultContentful.createClient({space, accessToken}) :
    createClient({space, accessToken})

  return {
    client,
    getFirstEntryOfType: async (content_type, loc) => {
      const {items} = await client.getEntries({
        content_type,
        include: 10,
        locale: loc || locale.value
      })
      return items[0]
    }
  }
}
