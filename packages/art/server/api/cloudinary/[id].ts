import { v2 as cloudinary } from 'cloudinary'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Image ID is required'
    })
  }

  // Configure Cloudinary
  cloudinary.config({
    cloud_name: config.cloudinaryCloudName,
    api_key: config.cloudinaryApiKey,
    api_secret: config.cloudinaryApiSecret
  })

  try {
    // Fetch resource from Cloudinary with context and tags
    const resource = await cloudinary.api.resource(
      `contentful-migration/${id}`,
      {
        context: true,
        tags: true
      }
    )

    // Map to expected format
    return {
      id,
      url: resource.secure_url,
      title: resource.context?.custom?.caption || '',
      description: resource.context?.custom?.alt || '',
      tags: resource.tags || [] // raw tag IDs as strings
    }
  } catch (error: any) {
    // Handle Cloudinary errors
    if (error.http_code === 404) {
      throw createError({
        statusCode: 404,
        statusMessage: `Image not found: ${id}`
      })
    }

    throw createError({
      statusCode: 500,
      statusMessage: `Failed to fetch image from Cloudinary: ${error.message}`
    })
  }
})
