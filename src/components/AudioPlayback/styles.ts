import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/Ionicons'
import { Animated, Dimensions } from 'react-native'

import { widthPixel, heightPixel } from '~/utils/responsive'
import { Text } from '~/components'

const { height } = Dimensions.get('window')

export const Container = styled.View`
  flex: 1;
  align-items: center;
`
export const TopBarContainer = styled.View`
  width: 100%;
  felx-direction: row;
  padding-horizontal: 20px;
  justify-content: flex-end;
`

export const QueueButtonText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #ffd479;
`
export const ImageHighLight = styled.Image`
  width: ${widthPixel(240)}px;
  height: ${heightPixel(240)}px;
  margin-top: 30px;
  background-color: grey;
`
export const TrackTitle = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: white;
  margin-top: 30px;
`
export const ArtistText = styled.Text`
  font-size: 16px;
  font-weight: 200;
  color: white;
`
export const ProgressLabelContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`

export const ProgressLabelText = styled.Text`
  color: white;
  font-variant: tabular-nums;
`
export const ActionRowContainer = styled.View`
  width: 60%;
  flex-direction: row;
  margin-bottom: 100px;
  justify-content: space-between;
`

export const SecondaryActionButton = styled.Text`
  font-size: 14px;
  color: #ffd479;
`

export const PrimaryActionButton = styled.Text`
  font-size: 18px
  font-weight: 600;
  color: #FFD479;
`

//minimalist

export const ContainerMinimalist = styled(Animated.View)`
  width: 100%;
  height: ${height}px;
  position: absolute;
  background-color: #03092b;
  padding-left: 10px;
  padding-right: 10px;
  top: ${height + 10}px;
`

export const ViewCurrentTrack = styled.View`
  padding-bottom: 30px;
  flex: 1;
  margin: 0 5px;
`
export const TrackTitleMinimalist = styled(Text).attrs(({ theme }: any) => ({
  size: 16,
  fontWeight: '600',
  color: theme.colors.white,
}))``

export const ViewButtons = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-bottom: 10px;
  align-items: center;
`

export const ActionButton = styled.TouchableOpacity``
export const PlayButtonIcon = styled(Icon).attrs(({ theme, active }: any) => ({
  name: !active ? 'play-circle' : 'pause-circle',
  size: 55,
  color: theme.colors.light,
}))`
  margin-top: 0px;
`

export const NextButtonIcon = styled(Icon).attrs(({ theme }: any) => ({
  name: 'play-skip-forward',
  size: 30,
  color: theme.colors.light,
}))`
  margin-left: 10px;
  margin-top: 10px;
`

export const PrevButtonIcon = styled(Icon).attrs(({ theme }: any) => ({
  name: 'play-skip-back',
  size: 30,
  color: theme.colors.light,
}))`
  margin-right: 10px;
  margin-top: 10px;
`

export const SkipContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 60px 20px 20px 20px;
`

export const SkipButton = styled.TouchableWithoutFeedback``

export const SkipButtonIcon = styled(Icon).attrs(({ theme }: any) => ({
  name: 'chevron-down-outline',
  size: 30,
  color: theme.colors.light,
}))`
  margin-right: 10px;
`

export const PlayIconMinimalist = styled(Icon).attrs(
  ({ theme, active }: any) => ({
    name: !active ? 'play' : 'pause',
    size: 30,
    color: theme.colors.light,
  }),
)`
  margin-top: 18px;
`

export const SkipText = styled(Text).attrs(({ theme, disabled }: any) => ({
  size: 18,
  fontWeight: '600',
  customColor: !disabled ? theme.colors.secondary : theme.colors.brown,
}))``
