import { useCallback, useContext, useEffect, useState, ReactNode } from 'react'
import { ImageSourcePropType } from 'react-native'
import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player'
import TrackContext from '~/contexts/track'

export const useAudioPlayback = () => {
  const playbackState = usePlaybackState()
  const progress = useProgress()
  const { playlist } = useContext(TrackContext)

  const [trackArtwork, setTrackArtwork] = useState<string | number>()
  const [trackTitle, setTrackTitle] = useState<string>()
  const [trackArtist, setTrackArtist] = useState<string>()
  const [trackId, setTrackId] = useState<string>()

  const setup = async () => {
    try {
      const currentTrack = await TrackPlayer.getCurrentTrack()
      if (currentTrack !== null) {
        return
      }

      await TrackPlayer.setupPlayer({})
      await TrackPlayer.updateOptions({
        stopWithApp: false,
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.Skip,
          Capability.SkipToPrevious,
          Capability.Stop,
        ],
        compactCapabilities: [Capability.Play, Capability.Pause],
        alwaysPauseOnInterruption: true,
      })
      await TrackPlayer.add(playlist)

      TrackPlayer.setRepeatMode(RepeatMode.Queue)
    } catch (e) {
      console.log(e)
    }
  }

  useTrackPlayerEvents([Event.PlaybackTrackChanged], async (event) => {
    if (
      event.type === Event.PlaybackTrackChanged &&
      event.nextTrack !== undefined
    ) {
      const trackFile = await TrackPlayer.getTrack(event.nextTrack)
      const { title, artist, artwork, id } = trackFile || {}
      setTrackTitle(title)
      setTrackArtist(artist)
      setTrackArtwork(artwork)
      setTrackId(id)
    }
  })

  useEffect(() => {
    playlist.length && setup()
  }, [playlist])

  return {
    trackArtwork,
    trackTitle,
    trackArtist,
    playbackState,
    progress,
    trackId,
  }
}
