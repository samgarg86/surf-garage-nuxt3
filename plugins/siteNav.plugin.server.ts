import defaultContentful, { createClient } from "contentful"
export default defineNuxtPlugin(async () => {
    // const { locale } = useI18n()
    const { public: { contentful: { space, accessToken } } } = useRuntimeConfig()

    const client = process.env.NODE_ENV == 'production' ?
        defaultContentful.createClient({space, accessToken}) :
        createClient({space, accessToken})
    const siteNav = useState('siteNav', () => [])

    const {items} = await client.getEntries({content_type: 'hamburgerMenu', include: 10})

    siteNav.value = items?.[0]?.fields
    // console.log('Fetching site nav for locale', siteNav.value)
})
