export const useContentfulPhotos = () => {
    const { locale } = useI18n()
    const { client} = useContentful()
    const { mapImages, fetchImagesByTags } = useImages()

    return {
        getArtGalleryPage: async(slug, limit = 50) => {
            const entries = await client.getEntries({
                content_type: 'artGalleryPage',
                include: 10,
                locale: locale.value,
                'fields.slug': slug
            })

            if (entries?.items?.length) {
                const { fields: { title, description, images, heroBanner}, metadata: {tags}} = entries.items[0]

                return {
                    title,
                    description,
                    images: tags?.length ? await fetchImagesByTags(tags.map(tag => tag.sys.id).join(','), limit) : mapImages(images),
                    heroBanner
                }
            }

            return {}
        }
    }
}
