import React from 'react'
import { AppPage } from '~/components'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'

import * as S from './styles'

interface IProps {
  navigation: any
}

const MainEvent: React.FC<IProps> = ({ navigation }): JSX.Element => {
  return (
    <AppPage
      fit={false}
      scroll
      safeArea
      header={{
        title: 'Congresso 2022',
        onBackPress: () => navigation.pop(),
        children: (
          <TouchableOpacity style={{ marginRight: 20 }}>
            <Icon name='share-alt' size={20} color='#E51C44' />
          </TouchableOpacity>
        ),
      }}
    >
      <S.Container></S.Container>
    </AppPage>
  )
}

export default MainEvent
