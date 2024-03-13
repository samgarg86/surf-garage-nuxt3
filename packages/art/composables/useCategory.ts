export default () => {
  const localeRoute = useLocaleRoute();

  return {
    mapCategory: (category) => {
      const {
        sys: { id },
        fields: { title, description, shortDescription, slug, bannerImage }
      } = category || {};
      return {
        id,
        title,
        shortDescription,
        description,
        link: localeRoute(slug?.replace('art', '')),
        image: bannerImage?.fields?.file?.url
      };
    }
  };
};
