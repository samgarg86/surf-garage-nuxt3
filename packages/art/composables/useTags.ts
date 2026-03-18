export const useTags = () => {
  const siteTags = useState('siteTags', () => {})

  const findTags = (tags, type) =>
    tags
      ?.filter((tag) => tag.type === type)
      .map(({ id, name }) => ({ id, name }))
  const findSettings = (tags) =>
    tags
      .filter((tag) => tag.sys.id.startsWith('setting'))
      .map((tag) => tag.sys.id)

  return {
    processTags: (tags) => {
      const fullTags = tags?.map((tag) => ({
        id: tag.sys.id,
        ...siteTags.value[tag.sys.id]
      }))
      return fullTags
        ? {
            page: findTags(fullTags, 'page'),
            place: findTags(fullTags, 'place')?.[0],
            artist: findTags(fullTags, 'artist')?.[0],
            settings: findSettings(tags)
          }
        : {}
    },
    processPlpTags: (tags) => {
      const fullTags = tags?.map((tag) => ({
        id: tag.sys.id,
        ...siteTags.value[tag.sys.id]
      }))
      return fullTags
        ? {
            place: findTags(fullTags, 'place')?.[0],
            artist: findTags(fullTags, 'artist')?.[0]
          }
        : {}
    },
    processCloudinaryTags: (tagIds) => {
      // Process tags from Cloudinary (array of tag ID strings)
      const fullTags = tagIds?.map((tagId) => ({
        id: tagId,
        ...siteTags.value[tagId]
      }))
      const settings =
        tagIds?.filter((tagId) => tagId.startsWith('setting')) || []

      return fullTags
        ? {
            page: findTags(fullTags, 'page'),
            place: findTags(fullTags, 'place')?.[0],
            artist: findTags(fullTags, 'artist')?.[0],
            settings
          }
        : {}
    }
  }
}
