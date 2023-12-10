export const useContentfulPosters = () => {
    const { locale } = useI18n()
    const { client} = useContentful()
    const {processTags, processPlpTags} = useTags()
    const {mapImages, mapImage} = useImages()
    const { public: { infiniteScrolling: { pageSize } } } = useRuntimeConfig()
    const posters = ref([])
    const endReached = ref(false)

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

    const remapEntries = (entries) => {
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

    const loadInitialProducts = async() => {
      const entries = await client.getEntries({
        content_type: 'artwork',
        include: 10,
        limit: pageSize,
        locale: locale.value
      })

      posters.value = remapEntries(entries)
    }

    const loadMoreItems =  async(skip = 0) => {
      if (endReached.value) return;

      const entries = await client.getEntries({
          content_type: 'artwork',
          include: 10,
          limit: pageSize,
          skip,
          locale: locale.value
      })

      const updatedEntries = remapEntries(entries)

      updatedEntries.forEach((entry) => {
        posters.value.push(entry)
      })

      if(!updatedEntries.length) {
        endReached.value = true
      }
    }

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
      getPostersByTags: async(tags) => {
          const entries = await client.getEntries({
              content_type: 'artwork',
              include: 10,
              locale: locale.value,
              'metadata.tags.sys.id[in]': tags
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
      },
      posters: computed(() => posters.value),
      loadMoreItems,
      loadInitialProducts
    }
}
