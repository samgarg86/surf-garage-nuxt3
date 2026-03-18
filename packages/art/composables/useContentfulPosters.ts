export const useContentfulPosters = () => {
  const { getEntry } = useContentful()
  const { processTags, processCloudinaryTags } = useTags()
  const {
    public: {
      infiniteScrolling: { pageSize }
    }
  } = useRuntimeConfig()
  const posters = ref<any[]>([])
  const endReached = ref(false)

  const mapImage = (image) => {
    const {
      metadata: { tags },
      sys: { id },
      fields
    } = image

    return {
      id,
      description: fields.description,
      url: fields.file.url,
      title: fields.title,
      tags: processTags(tags)
    }
  }

  const mapImages = (images) => images?.map(mapImage)

  type CloudinaryPoster = { id: string; title: string; tags: string[]; image: { id: string; url: string } }
  type PostersResponse = { posters: CloudinaryPoster[]; total: number }

  const mapCloudinaryPosters = (items: CloudinaryPoster[]) =>
    items.map((p) => ({
      id: p.id,
      title: p.title,
      tags: processCloudinaryTags(p.tags),
      image: p.image
    }))

  const loadInitialAllPosters = async () => {
    const result = await $fetch<PostersResponse>('/api/cloudinary/posters', {
      query: { limit: pageSize }
    })
    posters.value = mapCloudinaryPosters(result.posters)
  }

  const loadMorePosters = async (skip = 0, tags = '') => {
    if (endReached.value) return

    const result = await $fetch<PostersResponse>('/api/cloudinary/posters', {
      query: { limit: pageSize, skip, ...(tags && { tags }) }
    })
    const updated = mapCloudinaryPosters(result.posters)
    if (updated.length) posters.value.push(...updated)
    else endReached.value = true
  }

  return {
    getPoster: async (id) => {
      const entry = await getEntry(id)
      const {
        fields: {
          title,
          description,
          images,
          specialPrice,
          priceA3,
          priceA4,
          priceA5
        },
        metadata: { tags }
      } = entry.value
      return {
        title,
        description,
        images: mapImages(images),
        tags: processTags(tags),
        ...(specialPrice && {
          specialPrice: { A3: priceA3, A4: priceA4, A5: priceA5 }
        })
      }
    },
    getPostersByTags: async (tags: string, limit = pageSize) => {
      const result = await $fetch<PostersResponse>('/api/cloudinary/posters', {
        query: { tags, limit }
      })
      posters.value = mapCloudinaryPosters(result.posters)
    },
    posters: computed(() => posters.value),
    loadInitialAllPosters,
    loadMorePosters
  }
}
