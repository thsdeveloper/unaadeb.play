import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Login from '~/pages/Login'
import SignUp from '~/pages/SignUp'
import ResetPassword from '~/pages/ResetPassword'

const AuthStack = createStackNavigator()

const AuthRoutes: React.FC = () => (
  <NavigationContainer>
    <AuthStack.Navigator
      initialRouteName='Login'
      screenOptions={{ headerShown: false }}
    >
      <AuthStack.Screen name='Login' component={Login} />
      <AuthStack.Screen name='SignUp' component={SignUp} />
      <AuthStack.Screen name='ResetPassword' component={ResetPassword} />
    </AuthStack.Navigator>
  </NavigationContainer>
)

export default AuthRoutes
