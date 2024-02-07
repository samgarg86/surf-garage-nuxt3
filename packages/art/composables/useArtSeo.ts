export const useArtSeo = ({title, description, imageUrl, siteUrl}) => {
    useSeoMeta({
        title: `Surf Garage Art - ${title}`,
        ogTitle: `${title}`,
        ...(siteUrl && { ogUrl: siteUrl}),
        ...(description && { description }),
        ...(description && { ogDescription: description }),
        ...(imageUrl && { ogImage: imageUrl })
    })
}
