import React, { useCallback, useEffect, useState, useContext } from 'react'
import { format } from 'date-fns'
import pt from 'date-fns/locale/pt'
import { showLocation } from 'react-native-map-link'
import { useTheme } from 'styled-components/native'

import AlertContext from '~/contexts/alert'
import { AppPage, Button, Html, NotFound } from '~/components'
import { getAgenda, AgendaProps } from '~/services/agenda'
import {
  findSubscription,
  subscribe,
  removeSubscription,
} from '~/services/subscribe'
import { useAuth } from '~/contexts/auth'

import * as S from './styles'

interface IProps {
  navigation: any
  route: any
}

const AgendaDetails: React.FC<IProps> = ({
  navigation,
  route,
}): JSX.Element => {
  const alert = useContext(AlertContext)
  const { user } = useAuth()
  const { colors } = useTheme()

  const { id } = route.params

  const [data, setData] = useState<AgendaProps | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [subscribeId, setSubscribeId] = useState<string | null>(null)
  const [isSubscribing, setIsSubscribing] = useState<boolean>(false)

  const init = useCallback(async () => {
    try {
      setIsLoading(true)
      const data = await getAgenda(id)
      if (data) {
        setData(data)
        checkSubscribed()
      }
    } catch (err) {
      alert.error('Erro ao carregar notícia')
    } finally {
      setIsLoading(false)
    }
  }, [route.params])

  const openMap = useCallback((): void => {
    const geolocation = data?.geolocation
    if (geolocation) {
      showLocation({
        latitude: parseFloat(geolocation.latitude),
        longitude: parseFloat(geolocation.longitude),
        title: 'Escolha um app para abrir o mapa',
        googleForceLatLon: false,
        directionsMode: 'walk',
      })
    }
  }, [data?.geolocation])

  const checkSubscribed = useCallback(async () => {
    const email = user?.email
    if (id && email) {
      try {
        const sId = await findSubscription(id, email)
        setSubscribeId(sId)
      } catch (err) {
        setSubscribeId(null)
      }
    }
  }, [route.params, user?.email])

  const subscribeAgenda = useCallback(async () => {
    const email = user?.email
    if (id && email) {
      try {
        setIsSubscribing(true)
        await subscribe(id, email)
        await checkSubscribed()
        alert.success('Presença confirmada com sucesso')
      } catch (err) {
        alert.error('Falha ao confirmar presença na agenda, tente novamente')
        setSubscribeId(null)
      } finally {
        setIsSubscribing(false)
      }
    }
  }, [id, user?.email])

  const unsubscribe = useCallback(async () => {
    if (subscribeId) {
      try {
        setIsSubscribing(true)
        const unsubsubscribe = await removeSubscription(subscribeId)
        if (unsubsubscribe) {
          setSubscribeId(null)
          alert.success('Confirmação no evento cancelada com sucesso')
        }
      } catch (_err) {
        alert.error('Falha ao cancelar presença na agenda, tente novamente')
      } finally {
        setIsSubscribing(false)
      }
    }
  }, [])

  useEffect(() => {
    init()
  }, [init])

  return (
    <AppPage
      fit={false}
      scroll
      safeArea
      loading={isLoading}
      header={{
        title: data?.date
          ? format(data.date, "dd 'de' MMMM 'de' yyyy", { locale: pt })
          : 'Agenda',
        onBackPress: () => navigation.pop(),
      }}
    >
      <>
        {data && !isLoading ? (
          <S.Container>
            <S.ContainerHeader>
              {data?.image && (
                <S.AgendaBackground
                  source={{
                    uri: data?.image,
                  }}
                />
              )}
              <S.HeaderTextContainer>
                {data?.title && <S.AgendaTitle>{data?.title}</S.AgendaTitle>}
                {data?.subtitle && (
                  <S.AgendaSubTitle>{data?.subtitle}</S.AgendaSubTitle>
                )}
              </S.HeaderTextContainer>
            </S.ContainerHeader>
            <S.ContainerBody>
              {data?.date && <S.Title>Dia, horário e local</S.Title>}
              <S.PrimaryTitle>
                {format(data?.date, "dd/MM 'às' HH:mm'h'", {
                  locale: pt,
                })}
              </S.PrimaryTitle>
              {data?.address && <S.Title>{`Local: ${data?.address}`}</S.Title>}
              <S.ButtonRoundedView>
                <Button
                  mode='rounded'
                  onPress={!!subscribeId ? unsubscribe : subscribeAgenda}
                  text={`${
                    !subscribeId ? 'Confirmar presença' : 'Presença confirmada'
                  }`}
                  icon={!!subscribeId ? { name: 'check', size: 24 } : {}}
                  loading={isSubscribing}
                  color={!!subscribeId ? colors.darkGreen : colors.secondary}
                  textSize={20}
                />
              </S.ButtonRoundedView>
              {data?.longDescription && (
                <S.DescriptionView>
                  <Html html={{ html: `${data?.longDescription}` }} />
                </S.DescriptionView>
              )}
              <>
                {data?.geolocation && (
                  <S.GeolocationButtonView>
                    <Button
                      text='Abrir localização do evento'
                      mode='contained'
                      icon={{ name: 'enviroment', size: 30 }}
                      onPress={openMap}
                      textSize={12}
                    />
                  </S.GeolocationButtonView>
                )}
              </>
            </S.ContainerBody>
          </S.Container>
        ) : (
          <NotFound description='Desculpe mas não foi possível exibir esse conteúdo' />
        )}
      </>
    </AppPage>
  )
}

export default AgendaDetails
