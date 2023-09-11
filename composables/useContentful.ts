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

  const fetchImagesByTags = async (tags, limit) => {
    const {items} = await client.getAssets({
      'metadata.tags.sys.id[all]': tags,
      locale: locale.value,
      ...(limit && {limit})
    }) || {}
    return items || []
  }

  return {
    client,
    getFirstEntryOfType: async (content_type, locale) => {
      const {items} = await client.getEntries({
        content_type,
        include: 10,
        ...(locale && {locale})
      })
      return items[0]
    },
    fetchImagesByTags,
    getArtGalleryPage: async(slug, limit) => {
      const entries = await client.getEntries({
        content_type: 'artGalleryPage',
        include: 10,
        locale: locale.value,
        'fields.slug[in]': slug
      })

      if (entries?.items?.length) {
        const {fields: {title, description, images}, metadata: {tags}} = entries.items[0]

        return {
          title,
          description,
          images: mapImages(tags?.length ? await fetchImagesByTags(tags.map(tag => tag.sys.id).join(','), limit) : images)
        }
      }

      return {}
    }
  }
}
