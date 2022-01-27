import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import Home from '~/pages/Home'

const AppStack = createStackNavigator()

const AppRoutes: React.FC = () => (
  <NavigationContainer>
    <AppStack.Navigator>
      <AppStack.Screen name="Home" component={Home} />
    </AppStack.Navigator>
  </NavigationContainer>
)

export default AppRoutes
