import {useTags} from "~/composables/useTags";
import {useImages} from "~/composables/useImages";

export const useContentfulPosters = () => {
    const { locale } = useI18n()
    const { client} = useContentful()
    const {generateTags} = useTags()
    const {mapImages} = useImages()

    return {
        getIllustration: async(id) => {
            const {
                metadata: {tags},
                fields: { title, description, images, specialPrice, priceA3, priceA4, priceA5 }
            } = await client.getEntry(id, { locale: locale.value })
            return {
                title,
                description,
                images: mapImages(images),
                tags: generateTags(tags),
                ...(specialPrice && {
                    specialPrice: {
                        A3: priceA3,
                        A4: priceA4,
                        A5: priceA5
                    }
                })
            }
        },
        getAllPosters: async() => {
            const entries = await client.getEntries({
                content_type: 'artwork',
                include: 10,
                locale: locale.value,
            })
        },
    }
}
