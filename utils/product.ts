export const validateUrl = (id, host, type) => {
  return `https://${host}/api/validate?id=${id}&type=${type}`
}

export const priceOptions = (priceEntries) => {
  const basePrice = priceEntries[0][1]
  return priceEntries.reduce((accumulator, [size, price], index) => {
    if (index === 0) { return size }
    return `${accumulator}|${size}[+${price - basePrice}]`
  }, '')
}
