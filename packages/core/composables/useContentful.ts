import defaultContentful from 'contentful';
import { createClient } from 'contentful';

export const useContentful = () => {
  const {
    public: {
      contentful: { space, accessToken }
    }
  } = useRuntimeConfig();
  const { locale } = useI18n();

  if (!space || !accessToken) {
    throw createError({ statusCode: 404, statusMessage: 'CMS not working' });
  }
  const client =
    process.env.NODE_ENV == 'production'
      ? defaultContentful.createClient({ space, accessToken })
      : createClient({ space, accessToken });

  return {
    client,
    getEntries: async (params) => {
      const { uniqueId, ...rest } = params;
      await new Promise((resolve) => setTimeout(resolve));
      const { data, error: responseError } = await useAsyncData(
        `getEntries-${uniqueId || ''}`,
        () =>
          client.getEntries({
            ...rest,
            include: params.include || 10,
            order: params.order || '-sys.updatedAt',
            locale: locale.value
          })
      );
      if (responseError.value) console.error(responseError.value);
      return data;

      // return await fetchFromContentful({...params, include: 10, locale: locale.value}, 'getEntries')
    },
    getEntry: async (id) => {
      await new Promise((resolve) => setTimeout(resolve));
      const { data, error: responseError } = await useAsyncData(
        `getEntry-${id}`,
        () => client.getEntry(id, { include: 10, locale: locale.value })
      );
      if (responseError.value) console.error(responseError.value);
      return data;
    },
    getAssets: async (params) => {
      const { uniqueId, ...rest } = params;
      await new Promise((resolve) => setTimeout(resolve));
      const { data, error: responseError } = await useAsyncData(
        `getAssets-${uniqueId || ''}`,
        async () =>
          await client.getAssets({
            ...rest,
            order: rest.order || '-sys.createdAt',
            locale: locale.value
          })
      );
      if (responseError.value) console.error(responseError.value);
      return data;
    },
    getAsset: async (id) => {
      await new Promise((resolve) => setTimeout(resolve));
      const { data, error: responseError } = await useAsyncData(
        `getAsset-${id}`,
        () => client.getAsset(id, { locale: locale.value })
      );
      if (responseError.value) console.error(responseError.value);
      return data;
    },
    getFirstEntryOfType: async (content_type, loc) => {
      await new Promise((resolve) => setTimeout(resolve));
      const { data, error: responseError } = await useAsyncData(
        `getFirstEntryOfType-${content_type}`,
        () =>
          client.getEntries({
            content_type,
            include: 10,
            locale: loc || locale.value
          })
      );
      if (responseError.value) console.error(responseError.value);
      return data.value.items?.[0];
    }
  };
};
