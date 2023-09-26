import {priceOptions, validateUrl} from "../../utils/product";

export default defineEventHandler((event) => {
  // const { route } = useRoute()
setResponseHeader(event, 'Content-Type', 'application/json')
  const { id, type} = getQuery(event)
  const { public: { priceTable } } = useRuntimeConfig()
  const host = getRequestHost(event)
  if (priceTable[type]) {
    const priceEntries = Object.entries(priceTable[type])
    return {
      id,
      price: priceEntries[0][1],
      customFields: [
        {
          "name": "Sizes",
          "options": priceOptions(priceEntries)
        }
      ],
      url: validateUrl(id, host, type)
    }
  }
})
