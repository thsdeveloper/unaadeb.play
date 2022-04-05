import styled from 'styled-components/native'
import { Text } from '~/components'
import Icon from 'react-native-vector-icons/FontAwesome5'

export const Container = styled.View`
  flex: 1;
  padding: 0 20px;
  margin-top: 30px;
  margin-bottom: 100px;
`

export const ContainerHeader = styled.View`
  height: 174px;
  background-color: #000;
`

export const NewsBackground = styled.ImageBackground.attrs({
  resizeMode: 'cover',
})`
  width: 100%;
  height: 174px;
  opacity: 0.3;
  position: absolute;
`

export const NewsHeader = styled.View`
  flex: 1;
  justify-content: center;
`

export const NewsTitle = styled(Text).attrs({
  size: 25,
  fontWeight: 'bold',
})`
  padding: 0 20px;
  margin-bottom: 5px;
`

export const NewsDescription = styled(Text).attrs({
  size: 15,
  fontWeight: '400',
})`
  padding: 0 20px;
`

export const NewsLongDescription = styled(Text).attrs({
  size: 15,
  fontWeight: '400',
  lineHeight: 22,
})``

export const NewsFooter = styled.View`
  flex-direction: row;
  margin-top: 30px;
`

export const NewsDate = styled(Text).attrs({
  size: 15,
  fontWeight: '400',
  customColor: '#666',
})``

export const CalendarIcon = styled(Icon).attrs(({ theme }: any) => ({
  name: 'calendar',
  size: 18,
  color: theme.colors.secondary,
}))`
  margin-right: 10px;
`
