export const getDuration = (duration: number): any => {
  if (!duration) return
  const m = Math.floor(duration / 1000 / 60).toString()
  const s = Math.floor((duration / 1000) % 60).toString()

  const mText = m.padStart(2, '0')
  const sText = s.padStart(2, '0')

  return mText + ':' + sText
}

export const getTime = (time: number): any => {
  var date = new Date(time)
  return date.toLocaleDateString()
}
