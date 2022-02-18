import {
  addDays,
  addMonths,
  differenceInDays,
  differenceInMonths,
} from 'date-fns'

export enum PERIOD {
  DAY = 'day',
  MONTH = 'month',
}

export function dateRange(startDate: Date, endDate: Date, interval: PERIOD) {
  if (interval === PERIOD.DAY) {
    const days = differenceInDays(endDate, startDate)

    return [...Array(days + 1).keys()].map((i) => addDays(startDate, i))
  }

  if (interval === PERIOD.MONTH) {
    const months = differenceInMonths(endDate, startDate)

    return [...Array(months + 1).keys()].map((i) => addMonths(startDate, i))
  }
}
