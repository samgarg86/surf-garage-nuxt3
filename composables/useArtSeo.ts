export const useArtSeo = ({title, description, imageUrl}) => {
    useSeoMeta({
        title: `Surf Garage Art - ${title}`,
        ogTitle: `${title}`,
        ...(description && { description }),
        ...(description && { ogDescription: description }),
        ...(imageUrl && { ogImage: imageUrl })
    })
}
