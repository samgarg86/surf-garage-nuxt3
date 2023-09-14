export const useContentfulImages = () => {
    const { locale } = useI18n()
    const { client} = useContentful()
    const siteTags = useState('siteTags', () => {})

    const mapImage = (image) => {
        const { metadata: { tags }, sys: { id }, fields } = image

        return {
            id,
            description: fields.description,
            url: fields.file.url,
            title: fields.title,
            tags: imageTags(tags)
        }
    }
    const mapImages = (images) => images.map(mapImage)

    const imageTags = (tags) => {
        const fullTags = tags?.map(tag => siteTags.value[tag.sys.id])

        return fullTags ? {
            page: findTags(fullTags, 'page'),
            place: findTag(fullTags, 'place'),
            artist: findTag(fullTags, 'artist')
        }: {}
    }

    const findTags = (tags, type) => tags?.filter(tag => tag.type === type).map(tag => tag.name)

    const findTag = (tags, type) => tags.find(tag => tag.type === type)?.name

    const fetchImagesByTags = async (tags, limit) => {
        const { items } = await client.getAssets({
            'metadata.tags.sys.id[in]': tags,
            locale: locale.value,
            ...(limit && {limit})
        }) || {}
        return mapImages(items || [])
    }

    return {
        fetchImagesByTags,
        fetchImageById: async (id) => mapImage(await client.getAsset(id, { locale: locale.value })),
        mapImages,
        getArtGalleryPage: async(slug, limit = 50) => {
            const entries = await client.getEntries({
                content_type: 'artGalleryPage',
                include: 10,
                locale: locale.value,
                'fields.slug': slug
            })

            if (entries?.items?.length) {
                const {fields: {title, description, images}, metadata: {tags}} = entries.items[0]

                return {
                    title,
                    description,
                    images: tags?.length ? await fetchImagesByTags(tags.map(tag => tag.sys.id).join(','), limit) : mapImages(images)
                }
            }

            return {}
        }
    }
}
