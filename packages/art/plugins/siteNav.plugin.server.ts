import defaultContentful, { createClient } from "contentful"

// Simple in-memory cache that persists across requests
let cachedData = null
let cacheTimestamp = 0
const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

export default defineNuxtPlugin(async () => {
    const { public: { contentful: { space, accessToken } } } = useRuntimeConfig()
    const siteNav = useState('siteNav', () => {})
    const siteTags = useState('siteTags', () => {})

    const now = Date.now()
    const isCacheValid = cachedData && (now - cacheTimestamp) < CACHE_DURATION

    if (!isCacheValid) {
        console.log('Fetching site nav and tags from Contentful (should only happen once per day)')

        const client = process.env.NODE_ENV == 'production' ?
            defaultContentful.createClient({space, accessToken}) :
            createClient({space, accessToken})

        const {items} = await client.getEntries({content_type: 'hamburgerMenu', include: 10})
        const {items: tags} = await client.getTags()

        const processedNav = items?.[0]?.fields
        const processedTags = tags?.reduce((acc, tag) => {
            const [type, name] = tag.name.split(': ')
            acc[tag.sys.id] = { type: type?.toLowerCase(), name }
            return acc
        }, {})

        cachedData = { nav: processedNav, tags: processedTags }
        cacheTimestamp = now
    }

    siteNav.value = cachedData.nav
    siteTags.value = cachedData.tags
})
