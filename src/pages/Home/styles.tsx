import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/FontAwesome5'

import { Text } from '~/components'

export const Container = styled.View`
  margin: 0 10px;
`

export const CardView = styled.View`
  margin-top: 20px;
`

export const NewsTitle = styled(Text)`
  margin-top: 20px;
  margin-bottom: 10px;
`

export const DescriptionView = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: #1d2766;
  padding-bottom: 15px;
`

export const NewsDateView = styled.View`
  flex-direction: row;
  margin-top: 10px;
`

export const CalendarIcon = styled(Icon).attrs(({ theme }: any) => ({
  name: 'calendar',
  size: 18,
  color: theme.colors.secondary,
}))`
  margin-right: 10px;
`

export const DateText = styled(Text).attrs(({ theme }: any) => ({
  size: 16,
  fontWeight: 'normal',
  customColor: theme.colors.white,
}))``

export const EllipsisMenuView = styled.View`
  margin-top: 20px;
  flex-direction: row;
`

export const EllipsisButton = styled.TouchableOpacity``

export const MenuItemView = styled.View``
