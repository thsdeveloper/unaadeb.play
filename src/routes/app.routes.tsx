import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Home from '~/pages/Home'
import Leadership from '~/pages/Leadership'
import News from '~/pages/News'
import MainEvent from '~/pages/MainEvent'
import Agenda from '~/pages/Agenda'
import AgendaDetails from '~/pages/AgendaDetails'
import Profile from '~/pages/Profile'
import ProfilePicture from '~/pages/ProfilePicture'

const AppStack = createStackNavigator()

const AppRoutes: React.FC = () => (
  <NavigationContainer>
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name='Home' component={Home} />
      <AppStack.Screen name='Leadership' component={Leadership} />
      <AppStack.Screen name='News' component={News} />
      <AppStack.Screen name='MainEvent' component={MainEvent} />
      <AppStack.Screen name='Agenda' component={Agenda} />
      <AppStack.Screen name='AgendaDetails' component={AgendaDetails} />
      <AppStack.Screen name='Profile' component={Profile} />
      <AppStack.Screen name='ProfilePicture' component={ProfilePicture} />
    </AppStack.Navigator>
  </NavigationContainer>
)

export default AppRoutes
