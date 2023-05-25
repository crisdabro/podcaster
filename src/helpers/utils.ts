const padTo2Digits = (value: number) => value.toString().padStart(2, '0')

export const convertMsToMinutesSeconds = (ms: number) => {
  const minutes = Math.floor(ms / 60000)
  const seconds = Math.round((ms % 60000) / 1000)

  return seconds === 60
    ? `${minutes + 1}:00`
    : `${minutes}:${padTo2Digits(seconds)}`
}

export const convertMsToHoursMinutesSeconds = (ms: number) => {
  const hours = Math.floor(ms / 3600000)
  const minutes = Math.floor((ms % 3600000) / 60000)
  const seconds = Math.round(((ms % 3600000) % 60000) / 1000)

  return `${hours}:${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`
}

export const timestampToDate = (timestamp: number) => {
  const date = new Date(timestamp)
  return date.toLocaleDateString()
}
