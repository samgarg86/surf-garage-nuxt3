import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dvhajzz5s',
  api_key: '688541795839747',
  api_secret: 'Vp6puNKIrX_ioAn3us1ZIJI8pW4' // Click 'View API Keys' above to copy your API secret
})

// ============================================================================
// SETUP: Create metadata fields (run this once before migration)
// ============================================================================
async function createMetadataFields () {
  try {
    // Create original_filename field
    await cloudinary.api.add_metadata_field({
      external_id: 'original_filename',
      label: 'Original Filename',
      type: 'string'
    })
    console.log('✓ Created metadata field: original_filename')

    // Create contentful_created_at field
    await cloudinary.api.add_metadata_field({
      external_id: 'contentful_created_at',
      label: 'Contentful Created At',
      type: 'date'
    })
    console.log('✓ Created metadata field: contentful_created_at')

    console.log('\n✓ Metadata fields created! Now uncomment migrateAllAssets() and run again.')
  } catch (error) {
    console.error('Error creating metadata fields:', error.message)
  }
}

async function uploadAssetToCloudinary (asset) {
  try {
    // Extract asset data
    const assetId = asset.sys.id
    const title = asset.fields.title?.en || ''
    const description = asset.fields.description?.en || ''
    const fileUrl = asset.fields.file?.en?.url
    const fileName = asset.fields.file?.en?.fileName || ''

    // Extract tags from metadata
    const tags = asset.metadata?.tags?.map(tag => tag.sys.id) || []

    if (!fileUrl) {
      console.log(`Skipping asset ${assetId} - no file URL`)
      return null
    }

    // Build URL with protocol and Contentful Image API parameters to reduce file size
    const fullUrl = `${fileUrl.startsWith('//') ? 'https:' : ''}${fileUrl}?w=3000&q=85&fm=jpg&fl=progressive`

    console.log(`Uploading: ${title || fileName}`)

    // Upload to Cloudinary with transformations
    const result = await cloudinary.uploader.upload(fullUrl, {
      public_id: assetId, // Use Contentful asset ID as public_id
      folder: 'contentful-migration', // Optional: organize in a folder
      resource_type: 'auto',
      // Image transformations
      transformation: [
        {
          width: 1200, // Maximum width
          height: 1200, // Maximum height
          crop: 'limit', // Don't upscale, only downscale if larger
          quality: 'auto:good', // Automatic quality optimization
          fetch_format: 'auto' // Automatic format selection (WebP when supported)
        }
      ],
      // eager: [
      //   // Generate additional sizes immediately
      //   { width: 800, height: 800, crop: 'limit', quality: 'auto:good' },
      //   { width: 400, height: 400, crop: 'limit', quality: 'auto:good' }
      // ],
      context: {
        caption: title, // Built-in Title field
        alt: description, // Built-in Description/Alt field
        contentful_id: assetId
      },
      tags,
      // Store original filename as metadata
      metadata: {
        original_filename: fileName,
        contentful_created_at: asset.sys.createdAt?.split('T')[0]
      }
    })

    console.log(`✓ Uploaded: ${title || fileName} -> ${result.public_id}`)
    return result
  } catch (error) {
    console.error(`✗ Error uploading asset ${asset.sys.id}:`, error.message)
    return null
  }
}

async function migrateAllAssets () {
  const assets = contentfulExport.assets || []
  console.log(`Found ${assets.length} assets to migrate\n`)

  const results = {
    successful: [],
    failed: [],
    skipped: []
  }

  // Process assets sequentially to avoid rate limiting
  for (let i = 0; i < assets.length; i++) {
    const asset = assets[i]
    console.log(`\n[${i + 1}/${assets.length}]`)

    const result = await uploadAssetToCloudinary(asset)

    if (result) {
      results.successful.push({
        contentfulId: asset.sys.id,
        cloudinaryId: result.public_id,
        url: result.secure_url
      })
    } else {
      results.failed.push(asset.sys.id)
    }

    // Add a small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500))
  }

  // Save results to file
  fs.writeFileSync(
    'migration-results.json',
    JSON.stringify(results, null, 2)
  )

  console.log('\n=== Migration Complete ===')
  console.log(`Successful: ${results.successful.length}`)
  console.log(`Failed: ${results.failed.length}`)
  console.log(`Skipped: ${results.skipped.length}`)
  console.log('\nResults saved to migration-results.json')
}

// ============================================================================
// RETRY FAILED MIGRATIONS
// ============================================================================
async function retryFailedAssets () {
  // Load existing results
  let existingResults
  try {
    existingResults = JSON.parse(
      fs.readFileSync('./migration-results.json', 'utf8')
    )
  } catch (error) {
    console.error('Error reading migration-results.json:', error.message)
    console.log('Make sure migration-results.json exists in the cloudinary folder')
    return
  }

  const failedIds = existingResults.failed || []

  if (failedIds.length === 0) {
    console.log('No failed assets to retry!')
    return
  }

  console.log(`Found ${failedIds.length} failed assets to retry\n`)

  // Find the failed assets in the export
  const assets = contentfulExport.assets || []
  const failedAssets = assets.filter(asset => failedIds.includes(asset.sys.id))

  console.log(`Matched ${failedAssets.length} assets from the export\n`)

  const retryResults = {
    successful: [],
    stillFailed: []
  }

  // Process failed assets sequentially
  for (let i = 0; i < failedAssets.length; i++) {
    const asset = failedAssets[i]
    console.log(`\n[${i + 1}/${failedAssets.length}] Retrying: ${asset.sys.id}`)

    const result = await uploadAssetToCloudinary(asset)

    if (result) {
      retryResults.successful.push({
        contentfulId: asset.sys.id,
        cloudinaryId: result.public_id,
        url: result.secure_url
      })
    } else {
      retryResults.stillFailed.push(asset.sys.id)
    }

    // Add a small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500))
  }

  // Update the existing results
  existingResults.successful.push(...retryResults.successful)
  existingResults.failed = retryResults.stillFailed

  // Save updated results
  fs.writeFileSync(
    'migration-results.json',
    JSON.stringify(existingResults, null, 2)
  )

  console.log('\n=== Retry Complete ===')
  console.log(`Successfully uploaded: ${retryResults.successful.length}`)
  console.log(`Still failed: ${retryResults.stillFailed.length}`)
  console.log(`\nTotal successful: ${existingResults.successful.length}`)
  console.log(`Total failed: ${existingResults.failed.length}`)
  console.log('\nUpdated results saved to migration-results.json')
}

// Read the Contentful export JSON
const contentfulExport = JSON.parse(
  fs.readFileSync('../export/contentful-export-5im2bow6vhih-master-2025-12-27T11-21-14.json', 'utf8')
)

// STEP 1: Run this first to create metadata fields
// createMetadataFields().catch(console.error)

// Run the migration
// migrateAllAssets().catch(console.error)

// Re-run failed
retryFailedAssets().catch(console.error)
