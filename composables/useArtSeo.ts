export const useArtSeo = ({title, description, images}) => {
    useSeoMeta({
        title: `Surf Garage Art - ${title}`,
        ogTitle: `${title}`,
        ...(description && { description }),
        ...(description && { ogDescription: description }),
        ...(images?.length && { ogImage: images?.[0]?.url })
    })
}
