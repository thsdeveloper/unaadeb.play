import React, { useState, useEffect, useCallback, useContext } from 'react'
import { FlatList } from 'react-native'
import { format } from 'date-fns'
import pt from 'date-fns/locale/pt'

import AlertContext from '~/contexts/alert'
import { AppPage, NotFound, ListItem, Avatar } from '~/components'
import { list, AgendaProps } from '~/services/agenda'

import * as S from './styles'

interface IProps {
  navigation: any
}

interface ListProps {
  item: any
  index: number
}

const Agenda: React.FC<IProps> = ({ navigation }): JSX.Element => {
  const alert = useContext(AlertContext)

  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<AgendaProps[]>([])

  const init = useCallback(async () => {
    try {
      const agenda = await list()
      if (agenda) {
        setData(agenda)
      }
    } catch {
      alert.error('Erro ao carregar agenda')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    init()
  }, [init])

  const _renderItem = ({ item, index }: ListProps): JSX.Element => (
    <S.ContainerItem key={index}>
      <S.ItemTitle>
        {format(item.date, "dd 'de' MMMM 'de' yyyy", { locale: pt })}
      </S.ItemTitle>
      <>
        <ListItem
          key={index}
          title={{ text: item.title, size: 18 }}
          customDescription={() => (
            <S.descriptionView>
              <S.DescriptionText>{`Local: ${item.address}`}</S.DescriptionText>
            </S.descriptionView>
          )}
          onPress={() => navigation.navigate('AgendaDetails', { id: item.id })}
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
      loading={isLoading}
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
