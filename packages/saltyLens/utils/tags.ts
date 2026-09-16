export const artistSlug = (tag) => `/artist/${tag.id.replace('artist', '').toLowerCase()}`
export const collectionSlug = (tag) => `/collection/${tag.id.replace('page', '').toLowerCase()}`
export const postersSlug = (tag) => `/posters/${tag.replace('page', '').toLowerCase()}`
export const placeSlug = (tag) => `/place/${tag.id.replace('place', '').toLowerCase()}`
export const getLinkFromTag = (tag) => {
  switch (true) {
    case tag.startsWith('artist'): return artistSlug({id: tag})
    case tag.startsWith('page'): return collectionSlug({id: tag})
    case tag.startsWith('place'): return placeSlug({id: tag})
    default: return '/'
  }
}
