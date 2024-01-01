import defaultContentful, { createClient } from "contentful"
export default defineNuxtPlugin(async () => {
    const { public: { contentful: { space, accessToken } } } = useRuntimeConfig()

    const client = process.env.NODE_ENV == 'production' ?
        defaultContentful.createClient({space, accessToken}) :
        createClient({space, accessToken})
    const siteNav = useState('siteNav', () => {})
    const siteTags = useState('siteTags', () => {})

    const {items} = await client.getEntries({content_type: 'hamburgerMenu', include: 10})
    const {items: tags} = await client.getTags()

    siteNav.value = items?.[1]?.fields
    // siteTags.value = tags?.map(({sys: {id}, name}) => ({ id, name }) )
    siteTags.value = tags?.reduce((acc, tag) => {
        const [type, name] = tag.name.split(': ')
        acc[tag.sys.id] = { type: type?.toLowerCase(), name }
        return acc
    }, {})
    console.log('Fetching site nav and tags in server plugin')
})
