import firestore from '@react-native-firebase/firestore'

export interface AgendaProps {
  title: string
  subtitle?: string
  image: string
  date: Date | number
  longDescription?: string
  geolocation?: { latitude: string; longitude: string } | null
  shortDescription?: string
  address: string
  id?: string
}

export function list(): Promise<AgendaProps[] | null> {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('agenda')
      .limit(20)
      .get()
      .then((doc) => {
        if (doc.empty) {
          resolve(null)
        } else {
          const agenda: AgendaProps[] = []
          doc.forEach((item) => {
            const { title, address, image, date } = item.data() || {}
            const dateConverted = date.toDate()

            const newsData: AgendaProps = {
              title,
              address,
              image,
              date: dateConverted,
              id: item.id,
            }
            agenda.push(newsData)
          })
          resolve(agenda)
        }
      })
      .catch((_e) => {
        reject()
      })
  })
}

export function getAgenda(id: string): Promise<AgendaProps | null> {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('agenda')
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const {
            title,
            shortDescription,
            image,
            date,
            longDescription,
            subtitle,
            address,
            geolocation,
          } = doc.data() || {}
          const dateConverted = date.toDate()

          const sanitizeGeolocation = !geolocation ? null : geolocation

          const agendaData: AgendaProps = {
            title,
            subtitle,
            shortDescription,
            longDescription,
            address,
            image,
            geolocation: sanitizeGeolocation,
            date: dateConverted,
          }

          resolve(agendaData)
        } else {
          resolve(null)
        }
      })
      .catch((_e) => {
        reject()
      })
  })
}
