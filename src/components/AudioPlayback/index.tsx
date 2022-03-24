import React, { useState, useContext, useCallback, useEffect } from 'react'
import {
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  View,
  Text,
} from 'react-native'
import Slider from '@react-native-community/slider'
import TrackPlayer, { State } from 'react-native-track-player'
import { useTheme } from 'styled-components/native'
import { useAudioPlayback } from '~/hooks/useAudioPlayback'
import { ListItem, Avatar } from '~/components'

import AlertContext from '~/contexts/alert'
import TrackContext from '~/contexts/track'

import * as S from './styles'

interface PlaylistProps {
  url: string
  title: string
  artist: string
  artwork?: string
  duration: number
}

interface AnimationProps {
  value: number
  duration: number
  expand: boolean
}

export const AudioPlayback: React.FC = (): JSX.Element => {
  const alert = useContext(AlertContext)
  const { colors } = useTheme()
  const { trackArtwork, trackTitle, trackArtist, playbackState, progress } =
    useAudioPlayback()

  const togglePlayback = useCallback(async (playbackState: State) => {
    const currentTrack = await TrackPlayer.getCurrentTrack()
    if (currentTrack == null) {
      alert.error('Não foi possível carregar a playlist')
    } else {
      if (playbackState !== State.Playing) {
        await TrackPlayer.play()
      } else {
        await TrackPlayer.pause()
      }
    }
  }, [])

  return (
    <S.Container>
      <S.ImageHighLight source={{ uri: trackArtwork }} />
      <S.TrackTitle>{trackTitle}</S.TrackTitle>
      <S.ArtistText>{trackArtist}</S.ArtistText>
      <Slider
        style={{
          height: 40,
          width: '100%',
          marginTop: 25,
          flexDirection: 'row',
        }}
        value={progress.position}
        minimumValue={0}
        maximumValue={progress.duration}
        thumbTintColor={colors.secondary}
        minimumTrackTintColor={colors.secondary}
        maximumTrackTintColor={colors.light}
        onSlidingComplete={async (value) => {
          await TrackPlayer.seekTo(value)
        }}
      />
      <S.ProgressLabelContainer>
        <S.ProgressLabelText>
          {new Date(progress.position * 1000).toISOString().substr(14, 5)}
        </S.ProgressLabelText>
        <S.ProgressLabelText>
          {new Date((progress.duration - progress.position) * 1000)
            .toISOString()
            .substr(14, 5)}
        </S.ProgressLabelText>
      </S.ProgressLabelContainer>
      <S.ActionRowContainer>
        <TouchableWithoutFeedback onPress={() => TrackPlayer.skipToPrevious()}>
          <S.PrevButtonIcon />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => togglePlayback(playbackState)}>
          <S.PlayButtonIcon
            active={playbackState === State.Playing ? true : false}
          />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => TrackPlayer.skipToNext()}>
          <S.NextButtonIcon />
        </TouchableWithoutFeedback>
      </S.ActionRowContainer>
    </S.Container>
  )
}

export const PlayerMinimalist: React.FC = (): JSX.Element => {
  const { playlist, showPlayer, togglePlayer } = useContext(TrackContext)
  const alert = useContext(AlertContext)
  const { playbackState, trackArtist, trackTitle, trackArtwork } =
    useAudioPlayback()

  const [redSquareAnim] = useState(new Animated.Value(0))
  const [expanded, setExpanded] = useState<boolean>(false)
  const { height } = Dimensions.get('window')

  const togglePlayback = useCallback(async () => {
    const currentTrack = await TrackPlayer.getCurrentTrack()
    if (currentTrack == null) {
      alert.error('Não foi possível carregar a playlist')
    } else {
      if (playbackState !== State.Playing) {
        await TrackPlayer.play()
      } else {
        await TrackPlayer.pause()
      }
    }
  }, [playbackState])

  const setAnimations = useCallback((params: AnimationProps) => {
    Animated.timing(redSquareAnim, {
      toValue: params.value,
      duration: params.duration,
      useNativeDriver: true,
    }).start()
    setExpanded(params.expand)
  }, [])

  const onPressTiming = useCallback(() => {
    setAnimations({ value: -height - 20, duration: 300, expand: true })
  }, [])

  const onSkipPress = useCallback(() => {
    setAnimations({ value: -100, duration: 300, expand: false })
  }, [])

  const isPlaying = playbackState === State.Playing

  const onHidePlayer = useCallback(() => {
    if (!isPlaying) {
      togglePlayer(false)
      setAnimations({ value: height + 20, duration: 300, expand: false })
    } else {
      alert.warning('Para ocultar o player, pause a música')
    }
  }, [isPlaying, togglePlayer])

  useEffect(() => {
    showPlayer && setAnimations({ value: -100, duration: 300, expand: false })
  }, [showPlayer])

  return (
    <S.ContainerMinimalist
      style={{ transform: [{ translateY: redSquareAnim }] }}
    >
      <>
        {!expanded ? (
          <S.ViewCurrentTrack>
            <ListItem
              title={{ text: trackTitle || 'carregando...', size: 20 }}
              description={{ text: trackArtist || 'carregando ...' }}
              onPress={onPressTiming}
              left={(_props) =>
                trackArtwork && (
                  <Avatar.Image
                    source={{ uri: trackArtwork as string }}
                    size={40}
                    style={{ marginTop: 10, marginRight: 10 }}
                  />
                )
              }
              right={() => (
                <TouchableWithoutFeedback onPress={togglePlayback}>
                  <S.PlayIconMinimalist active={isPlaying} />
                </TouchableWithoutFeedback>
              )}
            />
          </S.ViewCurrentTrack>
        ) : (
          <S.SkipContainer>
            <S.SkipButton onPress={onHidePlayer}>
              <S.SkipText disabled={isPlaying}>Ocultar</S.SkipText>
            </S.SkipButton>
            <S.SkipButton onPress={onSkipPress}>
              <S.SkipButtonIcon />
            </S.SkipButton>
          </S.SkipContainer>
        )}

        {playlist && <AudioPlayback />}
      </>
    </S.ContainerMinimalist>
  )
}
