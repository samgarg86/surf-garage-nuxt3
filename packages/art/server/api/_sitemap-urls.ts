// import { createClient } from "contentful"
import defaultContentful from 'contentful'
export default cachedEventHandler(async (e) => {
        const { public: { contentful: { space, accessToken } } } = useRuntimeConfig()

        const client = defaultContentful.createClient({space, accessToken})
        const entries = await client.getEntries({
            content_type: 'artGalleryPage',
            include: 0
        })

        return entries.items.map(e => ({ loc: e.fields.slug.replace('art/', '')}));
    },
    {
        name: 'sitemap-dynamic-url',
        maxAge: 60 * 60 * 24, // cache URLs for 1 day
    }
);
