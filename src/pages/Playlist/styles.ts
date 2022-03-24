import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/Ionicons'

import { Text } from '~/components'

export const MainContainer = styled.View`
  flex: 1;
  margin-top: 30px;
  margin-bottom: 100px;
`

export const ContainerItem = styled.View`
  padding-bottom: 10px;
`

export const ItemTitle = styled(Text).attrs(({ theme }: any) => ({
  fontWeight: 'bold',
  size: 24,
  customColor: theme.colors.secondary,
}))`
  padding-left: 10px;
`

export const ItemCategoryTitle = styled(Text).attrs(({ theme }: any) => ({
  fontWeight: 'bold',
  size: 22,
  customColor: theme.colors.brown,
}))`
  padding-left: 10px;
`

export const descriptionView = styled.View`
  margin-top: 8px;
`

export const DescriptionText = styled(Text).attrs(({ theme, color }: any) => ({
  size: 16,
  fontWight: '300',
  customColor: color ?? theme.colors.white,
}))``

export const PlayButtonView = styled.View`
  align-items: center;
`
export const PlayIcon = styled(Icon).attrs(({ theme, active }: any) => ({
  name: !active ? 'play' : 'pause',
  size: 35,
  color: theme.colors.white,
}))`
  position: absolute;
  right: 15px;
  left: 15px;
  top: 20px;
  width: 35px;
  height: 40px;
  opacity: 0.7;
`

export const DurationText = styled(Text).attrs(({ theme, color }: any) => ({
  size: 16,
  fontWeight: '300',
  customColor: color ?? theme.colors.light,
}))`
  margin-top: 20px;
`
