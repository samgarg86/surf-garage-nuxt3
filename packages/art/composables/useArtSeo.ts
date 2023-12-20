export const useArtSeo = ({title, description, imageUrl}) => {
    console.log('Setting Page SEO Tags', title, imageUrl)
    useSeoMeta({
        title: `Surf Garage Art - ${title}`,
        ogTitle: `${title}`,
        ...(description && { description }),
        ...(description && { ogDescription: description }),
        ...(imageUrl && { ogImage: imageUrl })
    })
}
