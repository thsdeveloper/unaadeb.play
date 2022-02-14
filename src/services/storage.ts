import firestore from '@react-native-firebase/firestore'
import { format } from 'date-fns'
import pt from 'date-fns/locale/pt'

export interface NewsProps {
  title: string
  image?: string
  short_description?: string
  date?: string
}

export interface LeadershipItemsProps {
  name: string
  description: string
  avatar: string
  socialMediaUrl: string
}

export interface LeadershipProps {
  title: string
  items: LeadershipItemsProps[]
}

export function getNews(): Promise<NewsProps[] | null> {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('news')
      .limit(20)
      .get()
      .then((doc) => {
        if (doc.empty) {
          resolve(null)
        } else {
          const news: NewsProps[] = []
          doc.forEach((item) => {
            const { title, short_description, image, date } = item.data() || {}
            const dateConverted = date.toDate()
            news.push({
              title,
              short_description,
              image,
              date: format(dateConverted, "EEE dd/MM 'às' HH:mm'h'", {
                locale: pt,
              }),
            })
          })
          resolve(news)
        }
      })
      .catch((e) => {
        reject()
      })
  })
}

export function getLeadership(): Promise<LeadershipProps[] | null> {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('leadership')
      .limit(20)
      .get()
      .then((doc) => {
        if (doc.empty) {
          resolve(null)
        } else {
          const leadership: LeadershipProps[] = []
          doc.forEach((item) => {
            const { items, title } = item.data() || {}
            leadership.push({
              title,
              items,
            })
          })
          resolve(leadership)
        }
      })
      .catch((e) => {
        reject()
      })
  })
}
