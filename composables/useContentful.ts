import {createClient} from "contentful";

export const useContentful = () => {
  const {public: {contentful: {space, accessToken}}} = useRuntimeConfig()
  return createClient({space, accessToken})
}
