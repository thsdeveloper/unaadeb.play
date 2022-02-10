import React, { useMemo, useEffect, useCallback, useState } from 'react'
import { FlatList } from 'react-native'

import {AppPage , ListItem, Avatar, Button, SmallCard, Text} from '~/components'
import { useAuth } from '~/contexts/auth'
import { getNews, NewsProps } from '~/services/storage'

import * as S from './styles'

const LogoIcon = require('../../../assets/images/icons/logo-icon.png')
const LeadIcon = require('../../../assets/images/icons/lead-icon.png')
const EventIcon = require('../../../assets/images/icons/date-icon.png')

const Home: React.FC = () => {
  const {user} = useAuth()
  const { signOut } = useAuth()
  const [news, setNews] = useState<NewsProps[] | null>([])
  const [loading, setLoading] = useState(true)

  const init = useCallback(async() => {
    try{
      const news = await getNews()
      if(news?.length){
        setNews(news)
      }
    } catch(e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  },[])

  useEffect(() => {
    init()
  },[])

  const cardData = [
    {
      title: 'Congresso 2022',
      image: LogoIcon,
      onPress: () => {},
    },
    {
      title: 'Liderança 2022',
      image: LeadIcon,
      onPress: () => {},
    },
    {
      title: 'Agenda 2022',
      image: EventIcon
    },
    {
      title: 'Congresso 2022',
      image: LogoIcon,
      onPress: () => {},
    },
  ]

  const renderAvatar = useMemo(() => {
    if(!user?.photo?.length){
      const givenName = user?.givenName?.split(' ')
      const initials = givenName?.map(name => name[0])?.join('')
      return <Avatar.Text label={initials || ' '} size={53} style={{marginTop: 10, marginRight: 10}} />
    }
    return <Avatar.Image size={53} source={{uri: user?.photo}} style={{marginTop: 10, marginRight: 10}}/>
  },[user?.photo])

  const _renderNews = ({item, index}: {item: NewsProps, index: number}) => (
    <ListItem 
      key={index}
      title={{text: item.title, size: 18}}
      customDescription={() => (
        <S.DescriptionView>
          <Text size={13}>{item?.short_description}</Text>
          <S.NewsDateView>
            <S.CalendarIcon />
            <Text size={13} fontWeight='500'>{item?.date}</Text>
          </S.NewsDateView>
        </S.DescriptionView>
      )}
      left={() => <Avatar.Image size={68} source={{uri: item.image}} style={{marginTop: 10, marginRight: 10}} />}
    />
  )

  return (
    <AppPage scroll safeArea fit loading={loading}>
      {user && (
        <ListItem 
          title={{text: `Olá, ${user?.givenName || ''}`, size: 24}} 
          description={{text: 'Hoje é dia de vitória'}} 
          left={(_props) => renderAvatar}
        />
      )}
      <S.CardView>
        <SmallCard data={cardData} />
      </S.CardView>

      <S.NewsTitle fontWeight='bold' size={20}>Últimas notícias da UNAADEB</S.NewsTitle>

      <FlatList 
        data={news}
        renderItem={_renderNews}
        scrollEnabled
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={false}
      />
    
      <Button text="Logout" mode='text' onPress={() => signOut()} />
    </AppPage>
  )
}

export default Home;