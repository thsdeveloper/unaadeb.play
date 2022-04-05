import firestore from '@react-native-firebase/firestore'

export interface BannersProps {
  image: { uri: string }
}

export function listBanners(): Promise<BannersProps[]> {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('bannersHighlight')
      .limit(10)
      .get()
      .then((doc) => {
        if (doc.empty) {
          resolve([])
        } else {
          const banners: BannersProps[] = []
          doc.forEach((item) => {
            const data: any = item.data() || {}
            banners.push({ image: { uri: data?.image } })
          })
          resolve(banners)
        }
      })
      .catch((e) => {
        reject()
      })
  })
}
