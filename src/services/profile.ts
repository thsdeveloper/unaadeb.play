import firestore from '@react-native-firebase/firestore'

import { Response } from './auth'

export function updateProfile(
  email: string,
  user: Pick<Response, 'user'>,
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('customers')
      .doc(email)
      .update(user)
      .then(() => {
        resolve(true)
      })
      .catch((_e) => {
        reject()
      })
  })
}
