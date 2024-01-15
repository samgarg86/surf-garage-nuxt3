export const useContentfulPosters = () => {
    const { getEntries, getEntry} = useContentful()
    const {processTags, processPlpTags} = useTags()
    const {mapImages, mapImage} = useImages()
    const { public: { infiniteScrolling: { pageSize } } } = useRuntimeConfig()
    const posters = ref([])
    const endReached = ref(false)

    const mapEntries = (entries) => {
      return entries?.items.map(({
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

    const loadInitialAllPosters = async() => {
      const entries = await getEntries({
        uniqueId: 'artwork-all',
        content_type: 'artwork',
        limit: pageSize
      })

      posters.value = mapEntries(entries.value)
    }

    const loadMorePosters =  async(skip = 0, tags = '') => {
        if (endReached.value) return;

        const entries = await getEntries({
            uniqueId: `artwork-all-${pageSize}-${skip}`,
            content_type: 'artwork',
            ...(tags && {'metadata.tags.sys.id[in]': tags}),
            limit: pageSize,
            skip
        })

        const updatedEntries = mapEntries(entries.value)
        if (updatedEntries.length)
            posters.value.push(...updatedEntries)
        else
            endReached.value = true
    }

    return {
      getPoster: async(id) => {
          const entry = await getEntry(id)
          const {
              fields: {title, description, images, specialPrice, priceA3, priceA4, priceA5},
              metadata: {tags}
          } = entry.value
          return {
              title,
              description,
              images: mapImages(images),
              tags: processTags(tags),
              ...(specialPrice && {specialPrice: {A3: priceA3, A4: priceA4, A5: priceA5}})
          }
      },
      getPostersByTags: async(tags, limit = pageSize) => {
          const entries = await getEntries({
              uniqueId: `artwork-${tags}`,
              content_type: 'artwork',
              'metadata.tags.sys.id[in]': tags,
              limit
          })
          posters.value = mapEntries(entries.value)
      },
      posters: computed(() => posters.value),
      loadInitialAllPosters,
      loadMorePosters
    }
}
