export const artistSlug = (tag) => `/art/artist/${tag.id.replace('artist', '').toLowerCase()}`
export const categorySlug = (tag) => `/art/${tag.id.replace('page', '').toLowerCase()}`
export const placeSlug = (tag) => `/art/place/${tag.id.replace('place', '').toLowerCase()}`
