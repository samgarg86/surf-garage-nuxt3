import Stripe from 'stripe'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const stripe = new Stripe(config.stripeSecretKey)

  const { items } = await readBody(event)

  if (!items?.length) {
    throw createError({ statusCode: 400, message: 'Cart is empty' })
  }

  const subtotal = items.reduce((n: number, i: any) => n + i.price * i.quantity, 0)
  const shippingFree = subtotal >= config.public.freeShippingThreshold

  const toAbsoluteUrl = (url: string) => url.startsWith('//') ? `https:${url}` : url

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: items.map((item: any) => ({
      price_data: {
        currency: 'eur',
        unit_amount: Math.round(item.price * 100),
        product_data: {
          name: item.title,
          description: `${item.size} cm`,
          images: [toAbsoluteUrl(item.image)],
        },
      },
      quantity: item.quantity,
    })),
    shipping_address_collection: {
      allowed_countries: ['ES', 'DE', 'FR', 'NL', 'BE', 'IT', 'PT', 'GB', 'AT', 'CH', 'DK', 'SE', 'NO', 'FI', 'IE'],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: { amount: shippingFree ? 0 : 600, currency: 'eur' },
          display_name: shippingFree ? 'Free Shipping' : 'Standard Shipping',
          delivery_estimate: {
            minimum: { unit: 'business_day', value: 5 },
            maximum: { unit: 'business_day', value: 15 },
          },
        },
      },
    ],
    success_url: `${config.public.siteUrl}/checkout/success`,
    cancel_url: `${config.public.siteUrl}/checkout/cancel`,
  })

  return { url: session.url }
})
