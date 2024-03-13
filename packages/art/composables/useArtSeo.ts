export const useArtSeo = ({ title, description, imageUrl, keywords }) => {
  useSeoMeta({
    title: `${title} - Surf Garage Art Collective`,
    ogTitle: `${title}`,
    ...(description && { description }),
    ...(description && { ogDescription: description }),
    ...(imageUrl && {
      ogImage:
        (imageUrl.includes('http') ? imageUrl : `https:${imageUrl}`) + '?w=600'
    }),
    ...(keywords && { keywords })
  });
  const i18nHead = useLocaleHead({
    addSeoAttributes: true
  });
  useHead({
    link: i18nHead.value.link
  });
};
