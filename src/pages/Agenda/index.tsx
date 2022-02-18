import React, { useState } from 'react'
import { FlatList, TouchableOpacity, Linking } from 'react-native'

import { AppPage, NotFound, ListItem, Avatar } from '~/components'

import * as S from './styles'

interface IProps {
  navigation: any
}

interface ListProps {
  item: any
  index: number
}

const Agenda: React.FC<IProps> = ({ navigation }): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false)

  const data = [
    {
      date: '05 de Março de 2022 - Sábado',
      image:
        'https://firebasestorage.googleapis.com/v0/b/unaadeb-a6c93.appspot.com/o/news_1.png?alt=media&token=c64af2e4-6d83-4604-adbc-efec9557329d',
      title: 'Reunião de liderança',
      subtitle: 'Auditório da UFSCar',
      shortDescription: 'Reunião de liderança',
      longDescription: 'Reunião de liderança',
      geolocation: '',
    },
    {
      date: '05 de Março de 2022 - Sábado',
      image:
        'https://firebasestorage.googleapis.com/v0/b/unaadeb-a6c93.appspot.com/o/news_1.png?alt=media&token=c64af2e4-6d83-4604-adbc-efec9557329d',
      title: 'Reunião de liderança',
      subtitle: 'Auditório da UFSCar',
      shortDescription: 'Reunião de liderança',
      longDescription: 'Reunião de liderança',
      geolocation: '',
    },
  ]

  const _renderItem = ({ item, index }: ListProps): JSX.Element => (
    <S.ContainerItem key={index}>
      <S.ItemTitle>{item.date}</S.ItemTitle>
      <>
        <ListItem
          key={index}
          title={{ text: item.title, size: 18 }}
          customDescription={() => (
            <S.descriptionView>
              <S.DescriptionText>{item.subtitle}</S.DescriptionText>
            </S.descriptionView>
          )}
          onPress={() => navigation.navigate('AgendaDetails')}
          left={() => (
            <Avatar.Image
              size={68}
              source={{ uri: item.image }}
              style={{ marginTop: 10, marginRight: 10 }}
            />
          )}
        />
      </>
    </S.ContainerItem>
  )

  return (
    <AppPage
      fit={true}
      safeArea
      scroll
      header={{
        title: 'Agenda',
        onBackPress: () => navigation.pop(),
      }}
    >
      <S.MainContainer>
        {data.length && !isLoading ? (
          <FlatList
            data={data}
            renderItem={_renderItem}
            scrollEnabled
            horizontal={false}
            showsHorizontalScrollIndicator={false}
            pagingEnabled={false}
          />
        ) : (
          <NotFound description='Desculpe mas não foi possível exibir esse conteúdo' />
        )}
      </S.MainContainer>
    </AppPage>
  )
}

export default Agenda
