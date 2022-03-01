import React, {
  useContext,
  useEffect,
  useCallback,
  useState,
  useMemo,
} from 'react'
import { FlatList, Share, View, Linking } from 'react-native'
import { format } from 'date-fns'
import pt from 'date-fns/locale/pt'

import { AppPage, ListItem, Avatar, NotFound } from '~/components'
import AlertContext from '~/contexts/alert'
import {
  getUnaadebEvent,
  Event,
  Agenda,
  AgendaItem,
  subscribeUnaadebEvent,
  checkIsSubscribed,
} from '~/services/events'
import { useAuth } from '~/contexts/auth'
import { getDeviceInfo } from '~/utils/device'

import * as S from './styles'

interface IProps {
  navigation: any
}

const MainEvent: React.FC<IProps> = ({ navigation }): JSX.Element => {
  const alert = useContext(AlertContext)
  const { user } = useAuth()

  const [events, setEvents] = useState<Event>()
  const [loading, setLoading] = useState<boolean>(true)
  const [subscribed, setSubscribed] = useState<boolean>(false)

  const init = useCallback(async () => {
    try {
      const response = await getUnaadebEvent()
      if (response) {
        setEvents(response[0])
        handleIsSubscribe()
      }
    } catch (err) {
      alert.error('Erro ao carregar evento')
    } finally {
      setLoading(false)
    }
  }, [])

  const handleIsSubscribe = useCallback(async () => {
    if (user?.email) {
      try {
        const isSubscribed = await checkIsSubscribed(user.email)
        setSubscribed(isSubscribed)
      } catch (err) {
        setSubscribed(false)
      }
    }
  }, [user?.email])

  useEffect(() => {
    init()
  }, [])

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'https://www.unaadeb.com.br/',
      })
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          alert.success('Conteúdo compartilhado com sucesso')
        }
      }
    } catch (error) {
      alert.error('Ocorreu uma falha ao compartilhar essa informação')
    }
  }

  const subscribeUnaadeb = useCallback(async () => {
    if (user?.email) {
      const deviceInfo = await getDeviceInfo()
      setLoading(true)
      try {
        const response = await subscribeUnaadebEvent(user?.email, deviceInfo)
        if (response) {
          alert.success('Inscrição realizada com sucesso')
          setSubscribed(true)
        }
      } catch (err) {
        alert.error('Ocorreu uma falha ao realizar a inscrição')
      } finally {
        setLoading(false)
      }
    }
  }, [user?.email])

  const subscribeBtnIcon = useMemo(() => {
    return { name: subscribed ? 'youtube' : 'plus', size: 30 }
  }, [subscribed])

  const _renderEvent = ({ item, index }: { item: Agenda; index: number }) => {
    const title: string = Object.keys(item)[0]
    return (
      <View key={index}>
        <S.HeadlineList>
          <S.HeadLineText>{title}</S.HeadLineText>
          <S.HeadLineCount>{`Total ${item[title].length}`}</S.HeadLineCount>
        </S.HeadlineList>
        <>
          {item[title].map((event: { info: AgendaItem }, key: number) => (
            <ListItem
              key={key}
              title={{ text: event.info.name, size: 22 }}
              customDescription={() => (
                <S.EventInfoView>
                  <S.EventDescView>
                    <S.BadgeStatus confirmed={event.info.confirmed} />
                    <S.EventDescText>
                      {`${
                        event.info.confirmed ? 'Confirmado' : 'Em confirmação'
                      } `}
                    </S.EventDescText>
                  </S.EventDescView>
                  <S.EventDescView>
                    <S.EventDescText>
                      {`${format(
                        event.info.date,
                        "iiii 'período' BBBBB '-' dd/MM",
                        {
                          locale: pt,
                        },
                      )} `}
                    </S.EventDescText>
                  </S.EventDescView>
                </S.EventInfoView>
              )}
              left={() => (
                <Avatar.Image
                  size={55}
                  source={{ uri: event.info.image }}
                  style={{ marginTop: 10, marginRight: 10 }}
                />
              )}
            />
          ))}
        </>
      </View>
    )
  }

  const watchEvent = () =>
    events?.eventLink && Linking.openURL(events?.eventLink)

  return (
    <AppPage
      fit={false}
      scroll
      scrolType='flatlist'
      safeArea
      loading={loading}
      header={{
        title: 'Congresso 2022',
        onBackPress: () => navigation.pop(),
        children: events && (
          <S.ButtonShareHeader onPress={onShare}>
            <S.IconShare />
          </S.ButtonShareHeader>
        ),
      }}
      footerButton={
        events && {
          buttonProps: {
            onPress: !subscribed ? subscribeUnaadeb : watchEvent,
            text: !subscribed
              ? 'INSCREVER-SE JÁ'
              : 'Assistir ao Congresso - ao vivo',
            mode: 'contained',
            icon: subscribeBtnIcon,
            textSize: 12,
          },
        }
      }
    >
      {events && !loading ? (
        <S.Container>
          <S.ContainerHeader>
            {events?.flyer && (
              <S.EventBackground
                source={{
                  uri: events?.flyer,
                }}
              />
            )}
            <S.HeaderTextConteainer>
              {events?.title && <S.EventTitle>{events?.title}</S.EventTitle>}
              {events?.subtitle && (
                <S.EventSubTitle>{events?.subtitle}</S.EventSubTitle>
              )}
            </S.HeaderTextConteainer>
          </S.ContainerHeader>
          <S.ContainerBody>
            {events?.dateIntervalDays && events?.lastDate && (
              <S.EventDate>{`Data: ${events?.dateIntervalDays} e ${events?.lastDate}`}</S.EventDate>
            )}
            {events?.eventLocal && (
              <S.EventLocal>{`Local: ${events?.eventLocal}`}</S.EventLocal>
            )}

            <FlatList
              data={events?.agenda}
              renderItem={_renderEvent}
              scrollEnabled
              horizontal={false}
              showsHorizontalScrollIndicator={false}
              pagingEnabled={false}
              initialNumToRender={20}
            />
          </S.ContainerBody>
        </S.Container>
      ) : (
        <NotFound
          description='Desculpe mas não foi possível exibir esse conteúdo'
          children={
            <S.ContainerSkipButton>
              <S.ButtonSkip onPress={() => navigation.pop()} text='SAIR' />
            </S.ContainerSkipButton>
          }
        />
      )}
    </AppPage>
  )
}

export default MainEvent
