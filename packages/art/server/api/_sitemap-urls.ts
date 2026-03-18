// import { createClient } from "contentful"
import defaultContentful from 'contentful'
export default cachedEventHandler(
  async (e) => {
    const {
      public: {
        contentful: { space, accessToken }
      }
    } = useRuntimeConfig()

    const client = defaultContentful.createClient({ space, accessToken })

    if (process.env.CONTENTFUL_LOGGING_ENABLED === 'true') {
      const time = new Date().toLocaleTimeString('en-US', { hour12: false })
      console.log(
        `[${time}] CONTENTFUL API: getEntries - content_type: artGalleryPage - source: sitemap-urls`
      )
    }

    const entries = await client.getEntries({
      content_type: 'artGalleryPage',
      include: 0
    })

    return entries.items.map((e) => ({
      loc: e.fields.slug.replace('art/', '')
    }))
  },
  {
    name: 'sitemap-dynamic-url',
    maxAge: 60 * 60 * 24 // cache URLs for 1 day
  }
)
