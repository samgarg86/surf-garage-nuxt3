export const useImages = () => {
  const { client } = useContentful();
  const { locale } = useI18n();

  const mapImage = (image) => {
    const {
      sys: { id },
      fields
    } = image;

    return {
      id,
      description: fields.description,
      url: fields.file.url,
      title: fields.title
    };
  };

  const mapImages = (images) => images?.map(mapImage);

  return {
    mapImage,
    mapImages,
    fetchImageById: async (id) =>
      mapImage(await client.getAsset(id, { locale: locale.value }))
  };
};
