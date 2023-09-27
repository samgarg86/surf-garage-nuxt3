export const useContentfulPosters = () => {
    const { locale } = useI18n()
    const { client} = useContentful()
    const {processTags, processPlpTags} = useTags()
    const {mapImages, mapImage} = useImages()

    const mapPoster = (
        {
            fields: { title, description, images, specialPrice, priceA3, priceA4, priceA5 },
            metadata: { tags }
        }) => ({
        title,
        description,
        images: mapImages(images),
        tags: processTags(tags),
        ...(specialPrice && {
            specialPrice: {
                A3: priceA3,
                A4: priceA4,
                A5: priceA5
            }
        })
    })

    return {
        getPoster: async(id) => {
            const {
                fields: { title, description, images, specialPrice, priceA3, priceA4, priceA5 },
                metadata: { tags }
            } = await client.getEntry(id, { locale: locale.value })
            return {
                title,
                description,
                images: mapImages(images),
                tags: processTags(tags),
                ...(specialPrice && { specialPrice: {A3: priceA3, A4: priceA4, A5: priceA5 }})
            }
        },
        getAllPosters: async() => {
            const entries = await client.getEntries({
                content_type: 'artwork',
                include: 10,
                locale: locale.value
            })
            return entries.items.map(({
                sys: { id },
                metadata: { tags },
                fields: { title, images }
            }) => ({
                id,
                title,
                tags: processPlpTags(tags),
                image: mapImage(images?.[0])
            }))
        }
    }
}
