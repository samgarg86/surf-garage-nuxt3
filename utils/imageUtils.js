export const mapImages = (images) => images.map(i => {
  const { metadata: { tags }, sys: { id }, fields } = i

  return {
    id,
    url: fields.file.url,
    title: fields.title,
    tags: imageTags(tags)
  }
})

// export const imageTags = (tags) => tags?.map(({ sys: { id } }) => {
//   const tagName = ['page', 'place', 'artist'].find(key => id.startsWith(key))
//   return { [tagName]: id.replace(tagName, '') }
// })

export const imageTags = (tags) => ({
  page: findTags(tags, 'page'),
  place: findTag(tags, 'place'),
  artist: parseArtist(findTag(tags, 'artist'))
})

const findTags = (tags, key) => tags
  .filter(tag => tag.sys.id.startsWith(key))
  .map(tag => tag.sys.id.replace(key, ''))

const findTag = (tags, key) => tags.find(tag => tag.sys.id.startsWith(key))?.sys.id.replace(key, '')

const parseArtist = (rawText) => {
  switch (rawText) {
    case 'SamGarg': return 'Sam Garg'
    default: return ''
  }
}
