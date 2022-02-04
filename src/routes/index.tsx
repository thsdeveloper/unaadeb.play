import React, { useEffect } from 'react'
import SplashScreen from 'react-native-splash-screen'
import { useAuth } from '~/contexts/auth'
import AppRoutes from '~/routes/app.routes'
import AuthRoutes from '~/routes/auth.routes'



const Routes: React.FC = () => {
  const {signed} = useAuth()

  useEffect(() => {
    SplashScreen.hide()
  })

  return signed ?  <AppRoutes /> : <AuthRoutes />
}

export default Routes
