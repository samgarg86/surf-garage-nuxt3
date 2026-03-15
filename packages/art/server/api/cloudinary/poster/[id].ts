import { v2 as cloudinary } from 'cloudinary'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Poster ID is required'
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
    // const resource = await cloudinary.api.resource(
    //   `contentful-migration/${id}`,
    //   {
    //     context: true,
    //     tags: true
    //   }
    // )

    const result = await cloudinary.search
      .expression(`folder="posters/${id}"`)
      .with_field('context')
      .with_field('tags')
      .execute()

    const resources = result.resources || []
    // return resources
    const mainImage = resources.find((r: any) => r.filename === 'main')
    const otherImages = resources.filter((r: any) => r.filename !== 'main')
    const sorted = [mainImage, ...otherImages]

    const images = sorted.map((r: any) => ({
      id: r.public_id,
      url: r.secure_url
    }))

    const title = mainImage?.context?.caption || ''
    const description = mainImage?.context?.alt || ''
    const tags = mainImage?.tags || []

    return { title, description, tags, images }
  } catch (error: any) {
    // Handle Cloudinary errors
    if (error.http_code === 404) {
      throw createError({
        statusCode: 404,
        statusMessage: `Poster not found: ${id}`
      })
    }

    throw createError({
      statusCode: 500,
      statusMessage: `Failed to fetch image from Cloudinary: ${error.message}`
    })
  }
})
