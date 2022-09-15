const addHours = (numHours: number, date: Date): Date => {
  date.setTime(date.getTime() + numHours * 60 * 60 * 1000)

  return date
}

const addHoursToDateString = (numHours: number, date: string): string => {
  // convert string to Date object
  const dateObj = new Date(date)
  // add num hours to date object
  addHours(numHours, dateObj)
  // convert date object back to string and return
  const newDateString = dateObj.toISOString()
  // format dateString so it is back to original format with +00:00 at the end
  const formattedDateString = newDateString.slice(0, -5).concat('+00:00')
  return formattedDateString
}

export default addHoursToDateString
