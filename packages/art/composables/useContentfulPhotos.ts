export const useContentfulPhotos = () => {
    const { locale } = useI18n()
    const { client} = useContentful()
    const { mapImages, fetchImagesByTags } = useImages()
    const { public: { infiniteScrolling: { pageSize } } } = useRuntimeConfig()

    const pageTags = ref('')
    const pageTitle = ref('')
    const pageDescription = ref('')
    const pageMainImage = ref('')
    const pageContent = ref()
    const pageImages = ref([])
    const endReached = ref(false)

    const fetchArtGalleryPage = async(slug, limit = 12) => {
        const entries = await client.getEntries({
            content_type: 'artGalleryPage',
            include: 10,
            locale: locale.value,
            'fields.slug': slug
        })

        if (entries?.items?.length) {
            const { fields: { title, description, images, bannerImage}, metadata: {tags}} = entries.items[0]

            pageTags.value = tags.map(tag => tag.sys.id).join(',')

            pageImages.value = tags?.length ? await fetchImagesByTags(pageTags.value, limit) : mapImages(images)
            pageTitle.value = title
            pageDescription.value = description
            pageMainImage.value = bannerImage?.fields?.file?.url || pageImages.value?.[0]?.url || ''
        }
    }

    const loadMoreArtGalleryImages = async(skip) => {
        if (endReached.value) return;
        const newImages =  await fetchImagesByTags(pageTags.value, pageSize, skip)

        if (newImages.length > 0) {
            pageImages.value.push(...newImages)
        }
        else
            endReached.value = true
    }

    const fetchHomepage = async () => {
        const entries = await client.getEntries({
            content_type: 'artHomepage',
            include: 10,
            locale: locale.value
        })

        if (!entries?.items) {
            throw createError("Uhh you caught us at a wrong time. We're out either surfing or shooting. Please check back in a few minutes")
        }

        const homepage = entries.items[0]
        const {title, description, components} = homepage.fields
        pageTitle.value = title
        pageDescription.value = description
        pageContent.value = components
    }

    const fetchAllArtworkPage = async(limit = 12) => {
        pageImages.value = await fetchImagesByTags('', limit)
        pageMainImage.value = pageImages.value?.[0]?.url || ''
        pageTags.value = ''
    }

    return {
        fetchArtGalleryPage,
        fetchHomepage,
        loadMoreArtGalleryImages,
        fetchAllArtworkPage,
        images: computed(() => pageImages.value),
        pageTitle: computed(() => pageTitle.value),
        pageDescription: computed(() => pageDescription.value),
        pageMainImage: computed(() => pageMainImage.value),
        pageContent: computed(() => pageContent.value)
    }
}
