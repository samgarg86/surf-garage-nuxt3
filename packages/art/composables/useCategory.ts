export default () => {
    const localeRoute = useLocaleRoute()

    return {
        mapCategory: (category) => {
            const { sys: { id }, fields: { title, description, slug, bannerImage } } = category || {}
            return {
                id,
                title,
                description,
                link: localeRoute(slug?.replace('art', '')),
                image: bannerImage?.fields?.file?.url
            }
        }
    }
}
