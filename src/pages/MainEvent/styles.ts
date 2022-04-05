import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { Badge } from 'react-native-paper'
import { Dimensions } from 'react-native'

import { Text, Button } from '~/components'
import { heightPixel } from '~/utils/responsive'

interface StatusProps {
  confirmed: boolean
}

const { height } = Dimensions.get('window')

export const Container = styled.View`
  margin-bottom: 40px;
`

export const ButtonShareHeader = styled.TouchableOpacity`
  margin-right: 20px;
`

export const IconShare = styled(Icon).attrs(({ theme }: any) => ({
  name: 'share-alt',
  size: 20,
  color: theme.colors.secondary,
}))``

export const ContainerHeader = styled.View`
  min-height: ${heightPixel(226)}px;
  background-color: #000;
  justify-content: center;
`

export const EventBackground = styled.ImageBackground.attrs({
  resizeMode: 'cover',
})`
  width: 100%;
  height: 174px;
  opacity: 0.7;
  position: absolute;
`
export const HeaderTextConteainer = styled.View`
  padding: 0 20px;
  flex: 1
  justify-content: flex-end;
  margin-bottom: 20px;
`

export const EventTitle = styled(Text).attrs({
  size: 32,
  fontWeight: 'bold',
})`
  margin-bottom: 10px;
`

export const EventSubTitle = styled(Text).attrs({
  size: 18,
  fontWeight: 'normal',
  lineHeight: 22,
})``

export const ContainerBody = styled.View`
  padding: 10px 0;
  margin: 30px 20px 100px 20px;
`

export const EventDate = styled(Text).attrs({
  size: 26,
  fontWeight: 'bold',
  lineHeight: 23,
})``

export const EventLocal = styled(Text).attrs({
  size: 22,
  fontWeight: 'bold',
  lineHeight: 23,
})`
  margin: 10px 0;
`

export const HeadlineList = styled.View`
  flex-direction: row;
  margin: 20px 0;
  justify-content: space-between;
  flex: 1;
`

export const HeadLineText = styled(Text).attrs({
  size: 22,
  fontWeight: 'bold',
  lineHeight: 23,
})`
  text-transform: capitalize;
`

export const HeadLineCount = styled(Text).attrs({
  size: 16,
  fontWeight: 'normal',
  lineHeight: 23,
})``

export const EventDescView = styled.View`
  flex-direction: row;
  align-items: center;
`

export const EventDescText = styled(Text).attrs({
  size: 16,
  fontWeight: 'normal',
  lineHeight: 18,
})``

export const BadgeStatus = styled(Badge).attrs({
  size: 8,
})<StatusProps>`
  margin-right: 8px;
  margin-bottom: 5px;
  background-color: ${({ theme, confirmed }: any) =>
    confirmed ? theme.colors.green : theme.colors.orange};
`

export const ContainerSkipButton = styled.View`
  margin-top: 40px;
  width: 100%;
`

export const ButtonSkip = styled(Button).attrs({
  mode: 'outlined',
})``

export const EventInfoView = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: #1d2766;
  padding-bottom: 10px;
  margin-top: 5px;
`
