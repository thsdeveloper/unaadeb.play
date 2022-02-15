import Config from 'react-native-config'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

interface Response {
  idToken: string
  user: {
    name: string
    givenName: string
    email: string
    photo?: string
  }
}

export function signIn(): Promise<Response | null> {
  return new Promise((resolve, reject) => {
    GoogleSignin.configure({
      iosClientId: Config.GOOGLE_IOS_CLIENT_ID,
    })
    GoogleSignin.hasPlayServices()
      .then((hasPlayService) => {
        if (hasPlayService) {
          GoogleSignin.signIn()
            .then((userInfo) => {
              if (userInfo) {
                const authInfo = userInfo as Response
                resolve({
                  idToken: authInfo?.idToken,
                  user: {
                    name: authInfo?.user?.name,
                    email: authInfo?.user?.email,
                    givenName: authInfo?.user?.givenName,
                    photo: authInfo?.user?.photo,
                  },
                })
              } else {
                reject({
                  error:
                    'Falha ao realizar login, verifique seus dados e tente novamente',
                })
              }
            })
            .catch((e) => {
              reject({ warning: 'Login cancelado' })
            })
        }
      })
      .catch((e) => {
        reject({
          error: 'Falha ao realizar login, tente novamente em alguns instantes',
        })
      })
  })
}

export function signInForm(email: string, password: string): Promise<any> {
  return new Promise((resolve, reject) => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((userInfo) => {
        resolve(true)
      })
      .catch((e) => {
        if (e.code === 'auth/wrong-password') {
          resolve({ error: 'Senha incorreta' })
        }
        if (e.code === 'auth/user-not-found') {
          resolve({ error: 'Email não cadastrado' })
        }
        reject({
          error:
            'Desculpe-nos, estamos com problemas. Tente novamente mais tarde.',
        })
      })
  })
}

export function getUserInfo(email: string): Promise<any> {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('customers')
      .doc(email)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const { name, email } = doc.data() || {}
          resolve({
            user: {
              name: name,
              email: email,
              photo: '',
              givenName: name.split(' ')[0],
            },
          })
        } else {
          resolve(null)
        }
      })
      .catch((e) => {
        resolve(null)
      })
  })
}
