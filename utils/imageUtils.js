export const mapImages = (images) => images.map(mapImage)

export const mapImage = (image) => {
  const { metadata: { tags }, sys: { id }, fields } = image

  return {
    id,
    description: fields.description,
    url: fields.file.url,
    title: fields.title,
    tags: imageTags(tags)
  }
}

export const imageTags = (tags) => ({
  page: findTags(tags, 'page'),
  place: findTag(tags, 'place'),
  artist: parseArtist(findTag(tags, 'artist'))
})

const findTags = (tags, key) => tags
  .filter(tag => tag.sys.id.startsWith(key))
  .map(tag => tag.sys.id.replace(key, ''))

const findTag = (tags, key) => tags.find(tag => tag.sys.id.startsWith(key))?.sys.id.replace(key, '')

export const parseArtist = (rawText) => {
  switch (rawText?.toLowerCase()) {
    case 'samgarg': return 'Sam Garg'
    default: return ''
  }
}
