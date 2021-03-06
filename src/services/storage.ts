import firestore from '@react-native-firebase/firestore'
import { format } from 'date-fns'
import pt from 'date-fns/locale/pt'
import storage from '@react-native-firebase/storage'

export interface NewsProps {
  title: string
  subtitle?: string
  image?: string
  short_description?: string
  long_description?: string
  date?: string
  id?: string
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

            const newsData: NewsProps = {
              title,
              short_description,
              image,
              date: format(dateConverted, "EEE dd/MM 'às' HH:mm'h'", {
                locale: pt,
              }),
              id: item.id,
            }
            news.push(newsData)
          })
          resolve(news)
        }
      })
      .catch((_e) => {
        reject()
      })
  })
}

export function getNewsItem(id: string): Promise<NewsProps | null> {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('news')
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const {
            title,
            short_description,
            image,
            date,
            long_description,
            subtitle,
          } = doc.data() || {}
          const dateConverted = date.toDate()

          const newsData: NewsProps = {
            title,
            subtitle,
            short_description,
            long_description,
            image,
            date: format(dateConverted, "EEEE dd/MM/yy 'às' HH:mm'h'", {
              locale: pt,
            }),
          }

          resolve(newsData)
        }
      })
      .catch((_e) => {
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

// export function uploadPicture(uri: string, name: string): Promise<string> {
//   return new Promise((resolve, reject) => {
//     storage()
//       .ref(`profile/${name}`)
//       .putFile(uri)
//       .then((snapshot) => {
//         console.log('Uploaded a blob or file!', snapshot)
//         resolve(snapshot.ref.getDownloadURL())
//       })
//       .catch((e) => {
//         reject(e)
//       })
//   })
// }

export function uploadPicture(uri: string, file: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const path = `profile/${file}`
    const ref = storage().ref(path)
    const task = ref.putFile(uri)
    task
      .then(() => {
        ref
          .getDownloadURL()
          .then((url) => {
            resolve(url)
          })
          .catch((e) => {
            reject(e)
          })
      })
      .catch((_e) => {
        reject()
      })
  })
}
