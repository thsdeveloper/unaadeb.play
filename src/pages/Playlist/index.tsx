import React, {
  useEffect,
  useState,
  useCallback,
  useContext,
  useMemo,
} from 'react'
import { FlatList, Text } from 'react-native'
import { Divider } from 'react-native-paper'
import TrackPlayer, { State } from 'react-native-track-player'
import { useTheme } from 'styled-components/native'

import { AppPage, ListItem, Avatar } from '~/components'
import { listRepertories, RepertoryProps } from '~/services/repertory'
import { useAudioPlayback } from '~/hooks/useAudioPlayback'

import AlertContext from '~/contexts/alert'
import TrackContext from '~/contexts/track'

import * as S from './styles'

interface PlaylistProps {
  url: string
  title: string
  artist?: string
  artwork?: string
  duration?: number
  id: string
  key?: number
}

interface ListProps {
  item: { [key: string]: PlaylistProps[] }
  index: number
}

interface IProps {
  navigation: any
}

const repertorio: { [key: string]: PlaylistProps[] }[] = [
  {
    'Grande Conjunto': [
      {
        url: 'https://firebasestorage.googleapis.com/v0/b/unaadebplayprod.appspot.com/o/repertorio%2FCaminho%20no%20deserto.mp3?alt=media&token=54a0183e-a68a-4bf1-b354-1ca27be62e1a',
        title: 'Caminho no deserto',
        artist: 'Ministério Bálsamo',
        artwork:
          'https://i.scdn.co/image/e5c7b168be89098eb686e02152aaee9d3a24e5b6',
        duration: 432,
        id: 'xmpuanqskqmjkaihfabpejeudcmqxliu',
      },
    ],
  },
  {
    'Ministério de Louvor': [
      {
        url: 'https://firebasestorage.googleapis.com/v0/b/unaadebplayprod.appspot.com/o/repertorio%2FCaminho%20no%20deserto.mp3?alt=media&token=54a0183e-a68a-4bf1-b354-1ca27be62e1a',
        title: 'Caminho no deserto',
        artist: 'Ministério Bálsamo',
        artwork:
          'https://i.scdn.co/image/e5c7b168be89098eb686e02152aaee9d3a24e5b6',
        duration: 432,
        id: 'xmpuanqskqmjkaihfabpejeudcmqxliu',
      },
    ],
  },
  {
    'Hinos da Harpa': [
      {
        url: 'https://firebasestorage.googleapis.com/v0/b/unaadebplayprod.appspot.com/o/repertorio%2FCaminho%20no%20deserto.mp3?alt=media&token=54a0183e-a68a-4bf1-b354-1ca27be62e1a',
        title: 'Caminho no deserto',
        artist: 'Ministério Bálsamo',
        artwork:
          'https://i.scdn.co/image/e5c7b168be89098eb686e02152aaee9d3a24e5b6',
        duration: 432,
        id: 'xmpuanqskqmjkaihfabpejeudcmqxliu',
      },
    ],
  },
]

const Playlist: React.FC<IProps> = ({ navigation }): JSX.Element => {
  const theme = useTheme()
  const alert = useContext(AlertContext)
  const { playlist, addPlaylist, togglePlayer, addTrackList, trackList } =
    useContext(TrackContext)
  const [loading, setLoading] = useState(false)

  const { trackId, playbackState } = useAudioPlayback()

  const isPlaying = playbackState === State.Playing

  const init = useCallback(async () => {
    setLoading(true)
    try {
      const dataPlayList = await listRepertories()
      const newPlaylist: Array<any> = []
      if (dataPlayList) {
        addTrackList(dataPlayList)
        const data = dataPlayList.map((item, key) => {
          for (const k in item) {
            item[k].map((subItem, i) => {
              newPlaylist.push(subItem)
            })
          }
        })
        const sanitizeData = newPlaylist.map((item, key) => ({ ...item, key }))
        console.log(sanitizeData)
        addPlaylist(sanitizeData)
      }
    } catch (_e) {
      alert.error('Falha ao carregar a lista de músicas')
      console.log(_e)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!playlist.length) {
      init()
    }
    console.log('playlist', playlist)
  }, [playlist, init])

  const playSound = useCallback(
    async (id: string) => {
      const currentTrack = await TrackPlayer.getCurrentTrack()
      const currId = playlist.filter((item: PlaylistProps) => item.id === id)[0]
      if (!currId) {
        return
      }
      if (currentTrack == null) {
        return
      }
      if (trackId != id) {
        await TrackPlayer.skip(currId.key)
        if (playbackState !== State.Playing) {
          await TrackPlayer.play()
        }
      } else {
        if (playbackState !== State.Playing) {
          await TrackPlayer.play()
        } else {
          await TrackPlayer.pause()
        }
      }
      togglePlayer(true)
    },
    [trackId, State.Playing, playbackState],
  )

  const parseDuration = (duration: number): string => {
    const minutes = Math.floor(duration / 60)
    const seconds = duration % 60
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
  }

  const renderList = (data: PlaylistProps[], group: number) =>
    data.map((item, index) => (
      <>
        <ListItem
          key={`${index}_${group}`}
          title={{
            text: item.title,
            size: 22,
            color:
              item.id === trackId && isPlaying
                ? theme.colors.secondary
                : theme.colors.light,
          }}
          customDescription={() => (
            <S.descriptionView>
              <S.DescriptionText
                color={
                  item.id === trackId && isPlaying
                    ? theme.colors.secondary
                    : null
                }
              >{`${item?.artist}`}</S.DescriptionText>
            </S.descriptionView>
          )}
          onPress={() => playSound(item.id)}
          left={() => (
            <S.PlayButtonView>
              <Avatar.Image
                size={60}
                source={{ uri: item?.artwork }}
                style={{ marginTop: 10, marginRight: 10 }}
              />
              <S.PlayIcon
                active={item.id === trackId && isPlaying ? true : false}
              />
            </S.PlayButtonView>
          )}
          right={() =>
            item?.duration && (
              <S.DurationText
                color={
                  item.id === trackId && isPlaying && theme.colors.secondary
                }
              >
                {parseDuration(item?.duration)}
              </S.DurationText>
            )
          }
        />
        <Divider />
      </>
    ))

  const _renderItem = ({ item, index }: ListProps): JSX.Element => (
    <S.ContainerItem key={index}>
      <S.ItemCategoryTitle>{Object.keys(item)[0]}</S.ItemCategoryTitle>
      {renderList(item[Object.keys(item)[0]], index)}
    </S.ContainerItem>
  )

  return (
    <AppPage
      scroll
      scrolType='flatlist'
      safeArea
      fit
      loading={loading}
      header={{
        title: 'Repertório Unaadeb 2022',
        onBackPress: () => navigation.goBack(),
      }}
    >
      <S.MainContainer>
        <FlatList
          data={trackList}
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

export default Playlist
