export const useImages = () => {
    const {processTags} = useTags()
    const {client} = useContentful()
    const {locale} = useI18n()

    const mapImage = (image) => {
        const { metadata: { tags }, sys: { id }, fields } = image

        return {
            id,
            description: fields.description,
            url: fields.file.url,
            title: fields.title,
            tags: processTags(tags)
        }
    }

    const mapImages = (images) => images?.map(mapImage)

    return {
       mapImage,
       mapImages,
       fetchImagesByTags: async (tags, limit = 12, skip = 0) => {
            const { items } = await client.getAssets({
                ...(tags ? {'metadata.tags.sys.id[in]': tags} : {'metadata.tags.sys.id[nin]': 'settingNotArtwork,posters'}),
                locale: locale.value,
                order: '-sys.createdAt',
                limit,
                skip
            }) || {}
            return mapImages(items || [])
        },
        fetchImageById: async (id) => mapImage(await client.getAsset(id, { locale: locale.value }))
    }
}
