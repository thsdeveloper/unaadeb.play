import Config from 'react-native-config'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

export interface User {
  id?: string
  name: string
  givenName: string
  email: string
  photo?: string
  birthDate?: string
  sector?: string
  phone?: string
  parentCPF?: string
  parentName?: string
  userType?: 'google' | 'firebase'
  authProvider?: 'google' | 'local'
}

interface Response {
  user: User
  idToken?: string
}

export interface CustomerProps {
  name?: string
  email?: string
  phone?: string
  birthDate?: string
  parentName?: string
  parentCPF?: string
  sector?: string
  userType?: 'google' | 'firebase'
  photo?: string
}

export function signIn(): Promise<
  Response | { error?: string; warning?: string }
> {
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
                  user: {
                    name: authInfo?.user?.name,
                    email: authInfo?.user?.email,
                    givenName: authInfo?.user?.givenName,
                    photo: authInfo?.user?.photo,
                    userType: 'google',
                    id: authInfo?.user?.id,
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

export function signInForm(
  email: string,
  password: string,
): Promise<boolean | { error: string }> {
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

export function getUserInfo(email: string): Promise<Response | null> {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('customers')
      .doc(email)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const {
            name,
            email,
            birthDate,
            parentCPF,
            parentName,
            phone,
            photo,
            sector,
            userType,
          } = doc.data() || {}
          resolve({
            user: {
              name,
              email,
              photo,
              givenName: name.split(' ')[0],
              birthDate,
              parentCPF,
              parentName,
              phone,
              sector,
              userType,
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

export function addCustomer(customer: CustomerProps): Promise<boolean> {
  return new Promise((resolve, reject) => {
    if (!customer?.userType) {
      customer.userType = 'firebase'
    }
    firestore()
      .collection('customers')
      .doc(customer.email)
      .set(customer)
      .then(() => {
        resolve(true)
      })
      .catch((_error) => {
        reject()
      })
  })
}

export function updatePassword(email: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        resolve(true)
      })
      .catch((_e) => {
        reject()
      })
  })
}
