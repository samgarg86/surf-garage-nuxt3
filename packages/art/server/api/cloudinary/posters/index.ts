import { v2 as cloudinary } from 'cloudinary'
import { createError } from 'h3'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)
  const tags = query.tags as string | undefined
  const limit = parseInt(query.limit as string) || 12
  const skip = parseInt(query.skip as string) || 0

  cloudinary.config({
    cloud_name: config.cloudinaryCloudName,
    api_key: config.cloudinaryApiKey,
    api_secret: config.cloudinaryApiSecret
  })

  try {
    let expression = 'resource_type:image AND public_id:posters/*'
    if (tags) {
      const tagConditions = tags
        .split(',')
        .map((t) => `tags=${t}`)
        .join(' OR ')
      expression += ` AND (${tagConditions})`
    }

    const result = await cloudinary.search
      .expression(expression)
      .with_field('context')
      .with_field('tags')
      .max_results(Math.min(skip + limit, 500))
      .execute()

    const mainResources = (result.resources || []).filter(
      (r: any) => r.filename === 'main'
    )
    const paginated = mainResources.slice(skip, skip + limit)

    const posters = paginated.map((r: any) => {
      const parts = r.public_id.split('/')
      const id = parts[parts.length - 2] // "posters/{id}/main" → "{id}"
      return {
        id,
        title: r.context?.caption || '',
        tags: r.tags || [],
        image: { id: r.public_id, url: r.secure_url }
      }
    })

    return { posters, total: mainResources.length }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to fetch posters from Cloudinary: ${error?.message}`
    })
  }
})
