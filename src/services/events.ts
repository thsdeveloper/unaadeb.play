import firestore from '@react-native-firebase/firestore'
import { format } from 'date-fns'
import pt from 'date-fns/locale/pt'
import { dateRange, PERIOD } from '~/utils/dates'
import { getDeviceInfo } from '~/utils/device'

export interface Event {
  title: string
  subtitle: string
  flyer: string
  eventStartDate: string | Array<any>[]
  eventEndDate: string | Array<any>[]
  eventLocal: string
  agenda: Agenda[]
  dateIntervalDays?: string
  lastDate?: string
  eventLink?: string
}

export interface Agenda {
  [n: string]: [{ info: AgendaItem }]
}

export interface AgendaItem {
  confirmed: boolean
  date: number | Date | any
  image: string
  name: string
}

function parseEventData(data: Agenda[]): Agenda[] {
  const parse = data.map((item: Agenda) => {
    const index = Object.keys(item)[0]
    const child = item[index].map((subitem: { info: AgendaItem }) => {
      const { info } = subitem
      return { info: { ...info, date: info.date.toDate() } }
    })
    return { [index]: child }
  })
  return parse as Agenda[]
}

export function getUnaadebEvent(): Promise<Event[] | null> {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('unaadebCongress')
      .limit(1)
      .get()
      .then((doc) => {
        if (doc.empty) {
          resolve(null)
        } else {
          const event: Event[] = []
          doc.forEach((item) => {
            const {
              title,
              subtitle,
              flyer,
              eventStartDate,
              eventEndDate,
              eventLocal,
              agenda,
              eventLink,
            } = item.data() || {}

            const initialDate = eventStartDate.toDate()
            const finalDate = eventEndDate.toDate()
            const interval = dateRange(initialDate, finalDate, PERIOD.DAY) ?? []
            const dateIntervalDays = interval
              .map((date) => format(date, 'dd'))
              .join(', ')
            const lastDate = format(finalDate, "dd 'de' MMMM", {
              locale: pt,
            })

            event.push({
              title,
              subtitle,
              flyer,
              eventStartDate,
              eventEndDate,
              eventLocal,
              agenda: parseEventData(agenda),
              dateIntervalDays,
              lastDate,
              eventLink,
            })
          })
          resolve(event)
        }
      })
      .catch((_e) => {
        reject()
      })
  })
}

export function subscribeUnaadebEvent(
  email: string,
  device: string,
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('UnaadebEventSubscriptions')
      .doc(email)
      .set({
        date: firestore.FieldValue.serverTimestamp(),
        device,
      })
      .then(() => {
        resolve(true)
      })
      .catch((_error) => {
        reject()
      })
  })
}

export function checkIsSubscribed(email: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('UnaadebEventSubscriptions')
      .doc(email)
      .get()
      .then((doc) => {
        if (doc.exists) {
          resolve(true)
        }
      })
      .catch((_e) => {
        reject()
      })
  })
}
