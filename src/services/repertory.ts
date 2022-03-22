import firestore from '@react-native-firebase/firestore'

export interface PlaylistProps {
  url: string
  title: string
  artist?: string
  artwork?: string
  duration?: number
  id: string
  key?: number
}

export type RepertoryProps = { [key: string]: PlaylistProps[] }

export function listRepertories(): Promise<RepertoryProps[]> {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('repertory')
      .limit(30)
      .get()
      .then((doc) => {
        if (doc.empty) {
          resolve([])
        } else {
          const repertory: RepertoryProps[] = []
          doc.forEach((item) => {
            const data = item.data() || {}
            repertory.push(data)
          })
          console.log(JSON.stringify(repertory))
          resolve(repertory)
        }
      })
      .catch((e) => {
        reject()
      })
  })
}
