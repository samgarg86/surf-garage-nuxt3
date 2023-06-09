import contentful from "contentful";

export const useContentful = () => {
  const {public: {contentful: {space, accessToken}}} = useRuntimeConfig()
  return contentful.createClient({space, accessToken})
}
