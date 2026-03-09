import { v2 as cloudinary } from 'cloudinary'
import { createError } from 'h3'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)

  const tags = query.tags as string | undefined
  const limit = parseInt(query.limit as string) || 12
  const skip = parseInt(query.skip as string) || 0
  const order = (query.order as string) || 'updated'

  // Configure Cloudinary
  cloudinary.config({
    cloud_name: config.cloudinaryCloudName,
    api_key: config.cloudinaryApiKey,
    api_secret: config.cloudinaryApiSecret
  })

  try {
    // Build search expression
    let expression = 'resource_type:image AND folder:contentful-migration'

    // Add tag filters
    if (tags) {
      // If specific tags provided, search for images with those tags
      const tagArray = tags.split(',')
      const tagConditions = tagArray.length === 1
        ? `tags=${tagArray[0]}`
        : `(${tagArray.map(tag => `tags=${tag}`).join(' OR ')})`
      expression += ` AND (${tagConditions} -tags=settingNotArtwork -tags=posters)`
    }

    // Always exclude settingNotArtwork and posters
    // expression += ' -tags:settingNotArtwork -tags:posters'

    console.log('Cloudinary search:', expression)

    // Determine sort field
    const sortField = order === 'updated' ? 'uploaded_at' : 'created_at'

    // Execute search with pagination
    // Note: Cloudinary uses max_results and next_cursor for pagination
    // We'll use max_results = limit + skip to get all results, then slice
    const searchResult = await cloudinary.search
      .expression(expression)
      .with_field('context')
      .with_field('tags')
      .sort_by(sortField, 'desc')
      .max_results(limit + skip > 500 ? 500 : limit + skip) // Cloudinary max is 500
      .execute()

    // Apply skip by slicing the results
    const paginatedResults = searchResult.resources.slice(skip, skip + limit)

    // Map results to expected format
    const images = paginatedResults.map(resource => ({
      id: resource.public_id.replace('contentful-migration/', ''),
      url: resource.secure_url,
      title: resource.context?.custom?.caption || '',
      description: resource.context?.custom?.alt || '',
      tags: resource.tags || []
    }))

    return {
      images,
      total: searchResult.total_count
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: `Failed to search images in Cloudinary: ${error?.message || error?.error?.message || JSON.stringify(error)}`
    })
  }
})
