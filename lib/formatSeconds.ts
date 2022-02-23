/**
 * function to format seconds in 00:00 based on given seconds
 * @param    { number } secs    seconds
 * @return   { String }         formated time
 */
const formatSeconds = (secs: number): string => {
  const minutes = Math.floor(secs / 60)
  const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
  const seconds = Math.floor(secs % 60)
  const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`
  return `${returnedMinutes}:${returnedSeconds}`
}

export { formatSeconds }
