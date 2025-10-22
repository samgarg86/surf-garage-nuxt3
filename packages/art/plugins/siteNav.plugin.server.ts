import defaultContentful, { createClient } from "contentful"

// Cache site navigation and tags for 1 hour
const fetchSiteNavAndTags = defineCachedFunction(async () => {
    const { public: { contentful: { space, accessToken } } } = useRuntimeConfig()

    const client = process.env.NODE_ENV == 'production' ?
        defaultContentful.createClient({space, accessToken}) :
        createClient({space, accessToken})

    console.log('Fetching site nav and tags from Contentful (should only happen once per day)')

    const {items} = await client.getEntries({content_type: 'hamburgerMenu', include: 10})
    const {items: tags} = await client.getTags()

    const processedNav = items?.[0]?.fields
    const processedTags = tags?.reduce((acc, tag) => {
        const [type, name] = tag.name.split(': ')
        acc[tag.sys.id] = { type: type?.toLowerCase(), name }
        return acc
    }, {})

    return { nav: processedNav, tags: processedTags }
}, {
    maxAge: 60 * 60 * 24, // Cache for 24 hours
    name: 'siteNavAndTags',
    getKey: () => 'global'
})

export default defineNuxtPlugin(async () => {
    const siteNav = useState('siteNav', () => {})
    const siteTags = useState('siteTags', () => {})

    // Fetch from cache (only calls Contentful once per hour)
    const { nav, tags } = await fetchSiteNavAndTags()

    siteNav.value = nav
    siteTags.value = tags
})
