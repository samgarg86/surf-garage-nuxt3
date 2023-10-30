export const artistSlug = (tag) => `/artist/${tag.id.replace('artist', '').toLowerCase()}`
export const categorySlug = (tag) => `/${tag.id.replace('page', '').toLowerCase()}`
export const placeSlug = (tag) => `/place/${tag.id.replace('place', '').toLowerCase()}`
