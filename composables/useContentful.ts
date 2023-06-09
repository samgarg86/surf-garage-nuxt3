import contentful from 'contentful'
export const useContentful = () => {
  // const contentful = require('contentful')
  const {public: {contentful: {space, accessToken}}} = useRuntimeConfig()
  return contentful.createClient({space, accessToken})
}
