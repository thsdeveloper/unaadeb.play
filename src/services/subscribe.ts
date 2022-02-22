import firestore from '@react-native-firebase/firestore'

interface SubscribeProps {
  [key: string]: string
}

export function findSubscription(
  id: string,
  email: string,
): Promise<string | null> {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('agendaSubscriptions')
      .where(id, '==', email)
      .get()
      .then((doc) => {
        if (doc.empty) {
          resolve(null)
        } else {
          const id = doc.docs[0].id
          resolve(id)
        }
      })
      .catch((e) => {
        reject()
      })
  })
}

export function subscribe(id: string, email: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('agendaSubscriptions')
      .add({
        [id]: email,
      })
      .then(() => {
        resolve(true)
      })
      .catch((e) => {
        reject()
      })
  })
}

export function removeSubscription(id: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('agendaSubscriptions')
      .doc(id)
      .delete()
      .then(() => {
        resolve(true)
      })
      .catch((_e) => {
        reject()
      })
  })
}
