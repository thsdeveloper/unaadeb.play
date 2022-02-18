import React, { useEffect, useCallback, useState, useContext } from 'react'

import { AppPage, Html, NotFound } from '~/components'
import AlertContext from '~/contexts/alert'
import { NewsProps } from '~/services/storage'
import { getNewsItem } from '~/services/storage'

import * as S from './styles'

interface IProps {
  navigation: any
  route: any
}

const News: React.FC<IProps> = ({ route, navigation }): JSX.Element => {
  const alert = useContext(AlertContext)
  const [data, setData] = useState<NewsProps | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const init = useCallback(async () => {
    const { id } = route.params
    try {
      setIsLoading(true)
      const data = await getNewsItem(id)
      if (data) {
        setData(data)
      }
    } catch (err) {
      alert.error('Erro ao carregar notícia')
    } finally {
      setIsLoading(false)
    }
  }, [route.params])

  useEffect(() => {
    init()
  }, [init])

  return (
    <AppPage
      fit={false}
      loading={isLoading}
      safeArea
      scroll
      header={{
        title: data?.title || 'Notícias',
        onBackPress: () => navigation.pop(),
      }}
    >
      <>
        {data && !isLoading ? (
          <>
            <S.ContainerHeader>
              <S.NewsBackground source={{ uri: data?.image }} />
              <S.NewsHeader>
                <S.NewsTitle>{data?.title}</S.NewsTitle>
                <S.NewsDescription>{data?.subtitle}</S.NewsDescription>
              </S.NewsHeader>
            </S.ContainerHeader>
            <S.Container>
              {data?.long_description && (
                <Html html={{ html: `${data?.long_description}` }} />
              )}
              <S.NewsFooter>
                <S.CalendarIcon />
                <S.NewsDate>{`Postado ${data?.date}`}</S.NewsDate>
              </S.NewsFooter>
            </S.Container>
          </>
        ) : (
          <NotFound description='Desculpe mas não foi possível exibir esse conteúdo' />
        )}
      </>
    </AppPage>
  )
}

export default News
