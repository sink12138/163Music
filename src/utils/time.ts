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

export const formatSeconds = (time: number): any => {
  let mins = Math.floor(time / 60).toString()
  if (mins.length === 1) mins = '0' + mins
  let secs = Math.floor(time % 60).toString()
  if (secs.length === 1) secs = '0' + secs
  return `${mins}:${secs}`
}
