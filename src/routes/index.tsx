import React, { useEffect } from 'react'
import SplashScreen from 'react-native-splash-screen'

import { useAuth } from '~/contexts/auth'

import AuthRoutes from '~/routes/auth.routes'
import AppRoutes from '~/routes/app.routes'

const Routes: React.FC = () => {
  const { signed } = useAuth()

  useEffect(() => {
    SplashScreen.hide()
  })

  return signed ? <AppRoutes /> : <AuthRoutes />
}

export default Routes
