import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dvhajzz5s',
  api_key: '688541795839747',
  api_secret: 'Vp6puNKIrX_ioAn3us1ZIJI8pW4'
})

// Read the Contentful export JSON
const contentfulExport = JSON.parse(
  fs.readFileSync(
    './export/contentful-export-5im2bow6vhih-master-2025-12-27T11-21-14.json',
    'utf8'
  )
)

// Build asset lookup map
const assetMap = new Map(contentfulExport.assets.map((a) => [a.sys.id, a]))

// Filter artwork entries, skip artistKarolina
const artworkEntries = contentfulExport.entries.filter(
  (e) =>
    e.sys.contentType.sys.id === 'artwork' &&
    !e.metadata?.tags?.some((t) => t.sys.id === 'artistKarolina')
)

console.log(`Found ${artworkEntries.length} artwork entries to migrate`)

// ============================================================================
// UPLOAD HELPER
// ============================================================================
async function uploadImage(asset, folder, filename, options = {}) {
  const fileUrl = asset.fields.file?.en?.url
  if (!fileUrl) {
    throw new Error(`No file URL for asset ${asset.sys.id}`)
  }

  const fullUrl = `${fileUrl.startsWith('//') ? 'https:' : ''}${fileUrl}?w=3000&q=85&fm=jpg&fl=progressive`

  const result = await cloudinary.uploader.upload(fullUrl, {
    folder,
    public_id: filename,
    resource_type: 'auto',
    transformation: [
      {
        width: 1200,
        height: 1200,
        crop: 'limit',
        quality: 'auto:good',
        fetch_format: 'auto'
      }
    ],
    ...options
  })

  return result
}

// ============================================================================
// MAIN MIGRATION
// ============================================================================
async function migrateArtworks() {
  console.log(`\nMigrating ${artworkEntries.length} artwork entries...\n`)

  const results = {
    successful: [],
    failed: [],
    skipped: []
  }

  for (let i = 0; i < artworkEntries.length; i++) {
    const entry = artworkEntries[i]
    const entryId = entry.sys.id
    const title = entry.fields.title?.en || ''
    const description = entry.fields.description?.en || ''
    const entryTags = entry.metadata?.tags?.map((t) => t.sys.id) || []
    const imageLinks = entry.fields.images?.en || []

    console.log(
      `\n[${i + 1}/${artworkEntries.length}] Entry: ${entryId} — ${title}`
    )

    if (imageLinks.length === 0) {
      console.log(`  ⚠ No images, skipping`)
      results.skipped.push(entryId)
      continue
    }

    let entrySuccess = true

    for (let j = 0; j < imageLinks.length; j++) {
      const link = imageLinks[j]
      const assetId = link.sys.id
      const asset = assetMap.get(assetId)

      if (!asset) {
        console.log(`  ✗ Asset ${assetId} not found in export`)
        entrySuccess = false
        continue
      }

      try {
        if (j === 0) {
          // Main image
          const mainAssetFileName = asset.fields.file?.en?.fileName || ''

          console.log(`  Uploading main image -> posters/${entryId}/main`)

          const result = await uploadImage(
            asset,
            `posters/${entryId}`,
            'main',
            {
              context: {
                caption: title,
                alt: description,
                contentful_id: entryId
              },
              tags: entryTags,
              metadata: {
                original_filename: mainAssetFileName,
                contentful_created_at: entry.sys.createdAt?.split('T')[0]
              }
            }
          )

          console.log(`  ✓ main -> ${result.public_id}`)

          results.successful.push({
            entryId,
            imageIndex: j,
            cloudinaryId: result.public_id,
            url: result.secure_url
          })
        } else {
          // Secondary images — keep original filename, no extra metadata
          const fileName = asset.fields.file?.en?.fileName || assetId
          const baseName = fileName.replace(/\.[^.]+$/, '') // strip extension

          console.log(
            `  Uploading secondary image -> posters/${entryId}/${baseName}`
          )

          const result = await uploadImage(
            asset,
            `posters/${entryId}`,
            baseName
          )

          console.log(`  ✓ ${baseName} -> ${result.public_id}`)

          results.successful.push({
            entryId,
            imageIndex: j,
            cloudinaryId: result.public_id,
            url: result.secure_url
          })
        }
      } catch (error) {
        console.error(
          `  ✗ Error uploading image ${j} for entry ${entryId}:`,
          error.message
        )
        entrySuccess = false
        results.failed.push({
          entryId,
          imageIndex: j,
          assetId,
          error: error.message
        })
      }
    }

    if (!entrySuccess && imageLinks.length > 0) {
      // Only mark entry as failed if no images succeeded at all
      const entrySuccesses = results.successful.filter(
        (r) => r.entryId === entryId
      )
      if (entrySuccesses.length === 0) {
        results.failed.push({ entryId, error: 'All images failed' })
      }
    }

    // Delay between entries to avoid rate limiting
    if (i < artworkEntries.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 500))
    }
  }

  // Save results
  fs.writeFileSync(
    'artwork-migration-results.json',
    JSON.stringify(results, null, 2)
  )

  console.log('\n=== Migration Complete ===')
  console.log(`Successful uploads: ${results.successful.length}`)
  console.log(`Failed: ${results.failed.length}`)
  console.log(`Skipped entries: ${results.skipped.length}`)
  console.log('\nResults saved to artwork-migration-results.json')
}

// ============================================================================
// RETRY FAILED MIGRATIONS
// ============================================================================
async function retryFailedArtworks() {
  let existingResults
  try {
    existingResults = JSON.parse(
      fs.readFileSync('./artwork-migration-results.json', 'utf8')
    )
  } catch (error) {
    console.error(
      'Error reading artwork-migration-results.json:',
      error.message
    )
    console.log(
      'Make sure artwork-migration-results.json exists in the cloudinary folder'
    )
    return
  }

  const failedItems = existingResults.failed || []

  if (failedItems.length === 0) {
    console.log('No failed uploads to retry!')
    return
  }

  console.log(`Found ${failedItems.length} failed uploads to retry\n`)

  const retryResults = {
    successful: [],
    stillFailed: []
  }

  for (let i = 0; i < failedItems.length; i++) {
    const { entryId, imageIndex, assetId } = failedItems[i]
    const entry = artworkEntries.find((e) => e.sys.id === entryId)

    if (!entry) {
      console.log(
        `[${i + 1}/${failedItems.length}] Entry ${entryId} not found, skipping`
      )
      retryResults.stillFailed.push(failedItems[i])
      continue
    }

    const imageLinks = entry.fields.images?.en || []
    const link = imageLinks[imageIndex]
    const resolvedAssetId = assetId || link?.sys?.id
    const asset = assetMap.get(resolvedAssetId)

    if (!asset) {
      console.log(
        `[${i + 1}/${failedItems.length}] Asset not found for entry ${entryId} image ${imageIndex}`
      )
      retryResults.stillFailed.push(failedItems[i])
      continue
    }

    console.log(
      `\n[${i + 1}/${failedItems.length}] Retrying: ${entryId} image ${imageIndex}`
    )

    try {
      let result
      if (imageIndex === 0) {
        const title = entry.fields.title?.en || ''
        const description = entry.fields.description?.en || ''
        const entryTags = entry.metadata?.tags?.map((t) => t.sys.id) || []
        const mainAssetFileName = asset.fields.file?.en?.fileName || ''

        result = await uploadImage(asset, `posters/${entryId}`, 'main', {
          context: { caption: title, alt: description, contentful_id: entryId },
          tags: entryTags,
          metadata: {
            original_filename: mainAssetFileName,
            contentful_created_at: entry.sys.createdAt?.split('T')[0]
          }
        })
      } else {
        const fileName = asset.fields.file?.en?.fileName || resolvedAssetId
        const baseName = fileName.replace(/\.[^.]+$/, '')
        result = await uploadImage(asset, `posters/${entryId}`, baseName)
      }

      console.log(`  ✓ -> ${result.public_id}`)
      retryResults.successful.push({
        entryId,
        imageIndex,
        cloudinaryId: result.public_id,
        url: result.secure_url
      })
    } catch (error) {
      console.error(`  ✗ Still failed:`, error.message)
      retryResults.stillFailed.push({ ...failedItems[i], error: error.message })
    }

    await new Promise((resolve) => setTimeout(resolve, 500))
  }

  // Update existing results
  existingResults.successful.push(...retryResults.successful)
  existingResults.failed = retryResults.stillFailed

  fs.writeFileSync(
    'artwork-migration-results.json',
    JSON.stringify(existingResults, null, 2)
  )

  console.log('\n=== Retry Complete ===')
  console.log(`Successfully uploaded: ${retryResults.successful.length}`)
  console.log(`Still failed: ${retryResults.stillFailed.length}`)
  console.log(`\nTotal successful: ${existingResults.successful.length}`)
  console.log(`Total failed: ${existingResults.failed.length}`)
  console.log('\nUpdated results saved to artwork-migration-results.json')
}

// ============================================================================
// RUN
// ============================================================================

// STEP 1: Run migration
migrateArtworks().catch(console.error)

// STEP 2: Re-run failed uploads (comment out migrateArtworks above first)
// retryFailedArtworks().catch(console.error)
