export const useBlogSeo = ({
                               title,
                               description = 'Surf Garage - Un Club Premio Para Surfistas. Board Storage, GuardaTablas, Second Hand Boards, Surf Art, Surf Board Repairs',
                               keywords = 'guardatablas, tablas de surf, tablas segunda mano, board storage, surfboard storage, second hand surfboards, surfboards, surfboard repairs, surf art',
                               imageUrl = 'https://surfgarage.es/logo.png'
                           }) => {
    useSeoMeta({
        title: () => `${title} - Surf Garage`,
        ogTitle: () => `${title} - Surf Garage`,
        description,
        ogDescription: description,
        ogImage: imageUrl,
        keywords
    })
}
