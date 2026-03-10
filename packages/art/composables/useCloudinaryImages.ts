export const useCloudinaryImages = () => {
  const { processCloudinaryTags } = useTags()

  const mapImage = (image) => ({
    id: image.id,
    url: image.url,
    title: image.title,
    description: image.description,
    tags: processCloudinaryTags(image.tags)
  })

  return {
    fetchImagesByTags: async (
      tags,
      limit = 12,
      skip = 0,
      order = 'updated'
    ) => {
      console.log('fetchImagesByTags', tags)
      // Fetch images from Cloudinary via server API
      const { data, error } = await useAsyncData(
        `cloudinary-search-${tags || 'all'}-${limit}-${skip}-${order}`,
        () =>
          $fetch('/api/cloudinary/search', {
            query: {
              tags,
              limit,
              skip,
              order
            }
          })
      )

      if (error.value || !data.value) {
        return []
      }

      // Map images and process Cloudinary tags directly
      return data.value.images.map(mapImage)
    },
    fetchImageById: async (id) => {
      // Fetch image from Cloudinary via server API
      const { data, error } = await useAsyncData(`cloudinary-${id}`, () =>
        $fetch(`/api/cloudinary/${id}`)
      )

      if (error.value || !data.value) {
        return {}
      }

      // Return in expected format with processed Cloudinary tags
      return mapImage(data.value)
    }
  }
}
