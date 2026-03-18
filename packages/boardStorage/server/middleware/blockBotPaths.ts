export default defineEventHandler((event) => {
  const url = event.path
  const botPatterns = ['/wp-', '/.env', '/.git', '/admin', '/phpmyadmin', '/xmlrpc']
  if (botPatterns.some((p) => url.includes(p))) {
    throw createError({ statusCode: 404, statusMessage: 'Not Found' })
  }
})
