import React, { useState, useCallback, useEffect, useContext } from 'react'
import { FlatList, Linking, TouchableOpacity } from 'react-native'

import { AppPage, ListItem, Avatar, NotFound } from '~/components'
import AlertContext from '~/contexts/alert'
import { getLeadership, LeadershipProps } from '~/services/storage'

import * as S from './styles'

interface ListProps {
  item: LeadershipProps
  index: number
}

interface IProps {
  navigation: any
}

const NoPhoto = require('../../../assets/images/no-photo.png')

const Leadership: React.FC<IProps> = ({ navigation }): JSX.Element => {
  const alert = useContext(AlertContext)

  const [data, setData] = useState<LeadershipProps[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const init = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await getLeadership()
      if (data) {
        setData(data)
      }
    } catch (err) {
      alert.error('Erro ao carregar as informações de liderança')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    init()
  }, [init])

  const _renderItem = ({ item, index }: ListProps): JSX.Element => (
    <S.ContainerItem key={index}>
      <S.ItemTitle>{item.title}</S.ItemTitle>
      <>
        {item.items.map((item, index) => (
          <ListItem
            key={index}
            title={{ text: item.name, size: 22 }}
            customDescription={() => (
              <S.descriptionView>
                <TouchableOpacity
                  onPress={() => Linking.openURL(item.socialMediaUrl)}
                >
                  <S.DescriptionText>{item.description}</S.DescriptionText>
                </TouchableOpacity>
              </S.descriptionView>
            )}
            left={() => (
              <Avatar.Image
                size={68}
                source={{ uri: item.avatar }}
                style={{ marginTop: 10, marginRight: 10 }}
              />
            )}
          />
        ))}
      </>
    </S.ContainerItem>
  )

  return (
    <AppPage
      fit={true}
      loading={isLoading}
      safeArea
      header={{
        title: 'Liderança',
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

export default Leadership
