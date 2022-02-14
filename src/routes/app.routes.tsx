import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Home from '~/pages/Home'
import Leadership from '~/pages/Leadership'

const AppStack = createStackNavigator()

const AppRoutes: React.FC = () => (
  <NavigationContainer>
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name='Home' component={Home} />
      <AppStack.Screen name='Leadership' component={Leadership} />
    </AppStack.Navigator>
  </NavigationContainer>
)

export default AppRoutes
