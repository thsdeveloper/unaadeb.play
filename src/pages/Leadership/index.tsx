import React, { useState, useCallback, useEffect } from 'react'
import { FlatList, Linking, TouchableOpacity } from 'react-native'

import { AppPage, ListItem, Avatar } from '~/components'
import {
  getLeadership,
  LeadershipProps,
  LeadershipItemsProps,
} from '~/services/storage'

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
  const [data, setData] = useState<LeadershipProps[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const init = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await getLeadership()
      if (data) {
        setData(data)
      }
    } catch (err) {
      console.log(err)
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
            title={{ text: item.name, size: 18 }}
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
        <FlatList
          data={data}
          renderItem={_renderItem}
          scrollEnabled
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={false}
        />
      </S.MainContainer>
    </AppPage>
  )
}

export default Leadership
