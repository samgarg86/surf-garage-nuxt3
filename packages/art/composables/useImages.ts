export const useImages = () => {
    const {processTags} = useTags()
    const {getAssets, getAsset} = useContentful()
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
            const assets = await getAssets({
                uniqueId: `${tags || 'all'}-${limit}-${skip}`,
                ...(tags ? {'metadata.tags.sys.id[in]': tags} : {'metadata.tags.sys.id[nin]': 'settingNotArtwork,posters'}),
                order: '-sys.createdAt',
                limit,
                skip
            })
            return mapImages(assets.value?.items || [])
        },
        fetchImageById: async (id) => {
            const asset = await getAsset(id)
            return asset.value ? mapImage(asset.value) : {}
        }
    }
}
