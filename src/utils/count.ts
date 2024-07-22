export const getCounts = (counts: number): string => {
  if (!counts) return '0'

  if (counts >= 1000000) return (counts / 1000000).toFixed(2) + 'M'
  if (counts >= 1000) return (counts / 1000).toFixed(2) + 'k'

  return counts.toString()
}
