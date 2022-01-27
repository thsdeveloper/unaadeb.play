import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import Login from '~/pages/Login'

const AuthStack = createStackNavigator()

const AuthRoutes: React.FC = () => (
  <NavigationContainer>
    <AuthStack.Navigator 
      initialRouteName='Login'
      screenOptions={{ headerShown: false }}
     >
      <AuthStack.Screen name="Login" component={Login} />
    </AuthStack.Navigator>
  </NavigationContainer>
)

export default AuthRoutes
