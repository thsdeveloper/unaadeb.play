import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from 'react'
import AsyncStorage from '@react-native-community/async-storage'

import AlertContext from '~/contexts/alert'
import * as auth from '../services/auth'

interface User {
  name: string
  email: string
  photo?: string
  givenName: string
}

interface AuthContextData {
  signed: boolean
  user: User | null
  loading: boolean
  signIn(): Promise<void>
  signInForm(email: string, pass: string): Promise<void>
  signOut(): void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider: React.FC = ({ children }) => {
  const alert = useContext(AlertContext)

  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    init()
  }, [])

  const init = useCallback(async () => {
    const storagedUser = await AsyncStorage.getItem('@RNAuth:user')
    if (storagedUser) {
      setUser(JSON.parse(storagedUser))
    }
    setLoading(false)
  }, [])

  async function signIn() {
    const response = await auth.signIn()
    if (response) {
      setUser(response?.user)

      await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.user))
      //await AsyncStorage.setItem('@RNAuth:token', response?.idToken)
    }
  }

  async function signInForm(email: string, password: string) {
    try {
      setLoading(true)
      const response = await auth.signInForm(email, password)
      if (response?.error) {
        alert.error(response.error)
        return
      }

      const getUserInfo = await await auth.getUserInfo(email)
      if (getUserInfo) {
        setUser(getUserInfo?.user)
        await AsyncStorage.setItem(
          '@RNAuth:user',
          JSON.stringify(getUserInfo?.user),
        )
      }
    } catch (error) {
      alert.error('Falha na autenticação, verifique seus dados')
    } finally {
      setLoading(false)
    }
  }

  async function signOut() {
    await AsyncStorage.clear()
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, loading, signIn, signOut, signInForm }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.')
  }

  return context
}

export { AuthProvider, useAuth }
