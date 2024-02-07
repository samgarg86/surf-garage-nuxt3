export const useArtSeo = ({title, description, imageUrl, siteUrl}) => {
    useSeoMeta({
        title: `${title} - Surf Garage Art Collective`,
        ogTitle: `${title}`,
        // ...(siteUrl && { ogUrl: siteUrl}),
        ...(description && { description }),
        ...(description && { ogDescription: description }),
        ...(imageUrl && { ogImage: imageUrl.includes('http') ? imageUrl : `https://${imageUrl}` })
    })
    const i18nHead = useLocaleHead({
        addSeoAttributes: true
    })
    useHead({
        link: i18nHead.value.link
    })
}
