import defaultContentful from 'contentful'
import {createClient} from "contentful"

export const useContentful = () => {
  const {public: {contentful: {space, accessToken}}} = useRuntimeConfig()
  let client
  if (process.env.NODE_ENV == 'production') {
    client = defaultContentful.createClient({space, accessToken})
  } else {
    client = createClient({space, accessToken})
  }

  return {
    getFirstEntryOfType: async (content_type, locale) => {
      const {items} = await client.getEntries({
        content_type,
        include: 10,
        ...(locale && {locale})
      })
      return items[0]
    }
  }
}
