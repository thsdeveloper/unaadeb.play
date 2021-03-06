import React, { useMemo, useEffect, useCallback, useState } from 'react'
import { FlatList, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { useTheme } from 'styled-components/native'

import {
  AppPage,
  ListItem,
  Avatar,
  Menu,
  SmallCard,
  Text,
  BannerHighlight,
} from '~/components'
import { useAuth } from '~/contexts/auth'
import { getNews, NewsProps } from '~/services/storage'
import { listBanners, BannersProps } from '~/services/banners'

import * as S from './styles'

interface IProps {
  navigation: any
}

const LogoIcon = require('../../../assets/images/icons/logo-icon.png')
const LeadIcon = require('../../../assets/images/icons/lead-icon.png')
const EventIcon = require('../../../assets/images/icons/date-icon.png')
const PlayListIcon = require('../../../assets/images/icons/music-icon.png')

const Home: React.FC<IProps> = ({ navigation }) => {
  const { user } = useAuth()
  const { colors } = useTheme()
  const { width } = Dimensions.get('window')
  const { signOut } = useAuth()
  const [news, setNews] = useState<NewsProps[] | null>([])
  const [loading, setLoading] = useState(true)
  const [menuVisible, setMenuVisible] = useState(true)
  const [banners, setBanners] = useState<BannersProps[]>([])

  const init = useCallback(async () => {
    try {
      const news = await getNews()
      if (news?.length) {
        setNews(news)
      }
    } catch (e) {
      setNews([])
    } finally {
      setLoading(false)
    }
  }, [])

  const loadBanners = useCallback(async () => {
    try {
      setLoading(true)
      const banners = await listBanners()
      if (banners?.length) {
        setBanners(banners)
      }
    } catch (e) {
      setBanners([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    init()
    loadBanners()
  }, [])

  const cardData = [
    {
      title: 'Congresso 2022',
      image: LogoIcon,
      onPress: () => navigation.navigate('MainEvent'),
    },
    {
      title: 'Liderança 2022',
      image: LeadIcon,
      onPress: () => navigation.navigate('Leadership'),
    },
    {
      title: 'Agenda 2022',
      image: EventIcon,
      onPress: () => navigation.navigate('Agenda'),
    },
    {
      title: 'Repertório',
      image: PlayListIcon,
      onPress: () => navigation.navigate('Playlist'),
    },
  ]

  const renderAvatar = useMemo(() => {
    if (!user?.photo?.length) {
      const givenName = user?.givenName?.split(' ')
      const initials = givenName?.map((name) => name[0])?.join('')
      return (
        <Avatar.Text
          label={initials || ' '}
          size={53}
          style={{ marginTop: 10, marginRight: 10 }}
        />
      )
    }
    return (
      <Avatar.Image
        size={53}
        source={{ uri: user?.photo }}
        style={{ marginTop: 10, marginRight: 10 }}
      />
    )
  }, [user?.photo])

  const goToProfile = () => {
    setMenuVisible(false)
    setTimeout(() => {
      navigation.navigate('Profile')
    }, 300)
  }

  const renderEllipsis = () => (
    <S.EllipsisMenuView>
      <S.EllipsisButton onPress={() => setMenuVisible(true)}>
        <Icon name='ellipsis-vertical' size={26} color={colors.secondary} />
      </S.EllipsisButton>
      <Menu
        visible={menuVisible}
        anchor={{ x: width - 60, y: 80 }}
        onDismiss={() => setMenuVisible(false)}
        items={[
          {
            title: 'Perfil',
            icon: 'account-circle',
            onPress: goToProfile,
          },
          {
            title: 'Sair',
            onPress: () => signOut(),
            icon: 'logout',
          },
        ]}
      />
    </S.EllipsisMenuView>
  )

  const _renderNews = ({ item, index }: { item: NewsProps; index: number }) => (
    <ListItem
      key={index}
      title={{ text: item.title, size: 20 }}
      onPress={() => navigation.navigate('News', { id: item.id })}
      customDescription={() => (
        <S.DescriptionView>
          <Text size={16}>{item?.short_description}</Text>
          <S.NewsDateView>
            <S.CalendarIcon />
            <S.DateText>{item?.date}</S.DateText>
          </S.NewsDateView>
        </S.DescriptionView>
      )}
      left={() => (
        <Avatar.Image
          size={68}
          source={{ uri: item.image }}
          style={{ marginTop: 10, marginRight: 10 }}
        />
      )}
    />
  )

  return (
    <AppPage scroll scrolType='flatlist' safeArea fit={false} loading={loading}>
      <S.Container>
        {user && (
          <ListItem
            title={{ text: `Olá, ${user?.givenName || ''}`, size: 26 }}
            description={{ text: 'Hoje é dia de vitória' }}
            left={(_props) => renderAvatar}
            right={() => renderEllipsis()}
            style={{ marginTop: 20 }}
          />
        )}
      </S.Container>
      <BannerHighlight itens={banners} style={{ marginTop: 10 }} />
      <S.Container style={{ marginBottom: 80 }}>
        <S.CardView>
          <SmallCard data={cardData} fit={cardData.length > 3} />
        </S.CardView>

        <S.NewsTitle fontWeight='bold' size={24}>
          Últimas notícias da UNAADEB
        </S.NewsTitle>

        <FlatList
          data={news}
          renderItem={_renderNews}
          scrollEnabled
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={false}
        />
      </S.Container>
    </AppPage>
  )
}

export default Home
