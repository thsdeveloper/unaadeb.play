import React, { useState } from 'react'

import { RepertoryProps } from '~/services/repertory'

interface TrackContextData {
  playlist: any
  showPlayer: boolean
  trackList: RepertoryProps[]
  addPlaylist: (playlist: any) => void
  clearPlaylist: () => void
  togglePlayer: (e: boolean) => void
  addTrackList: (trackList: RepertoryProps[]) => void
}

const TrackContext = React.createContext<TrackContextData>(
  {} as TrackContextData,
)

const TrackProvider: React.FC = ({ children }) => {
  const [playlist, setPlaylist] = useState([])
  const [showPlayer, setShowPlayer] = useState<boolean>(false)
  const [trackList, setTrackList] = useState<RepertoryProps[]>([])

  return (
    <TrackContext.Provider
      value={{
        playlist: playlist,
        showPlayer: showPlayer,
        trackList: trackList,
        addPlaylist: (playlist: any) => {
          setPlaylist(playlist)
        },
        clearPlaylist: () => {
          setPlaylist([])
        },
        togglePlayer: (state) => {
          setShowPlayer(state)
        },
        addTrackList: (trackList: RepertoryProps[]) => {
          setTrackList(trackList)
        },
      }}
    >
      {children}
    </TrackContext.Provider>
  )
}

export { TrackProvider }
export default TrackContext
