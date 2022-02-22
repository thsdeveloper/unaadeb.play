import styled from 'styled-components/native'

import { Text, Button } from '~/components'
import { heightPixel } from '~/utils/responsive'

export const Container = styled.View``

export const ContainerHeader = styled.View`
  min-height: ${heightPixel(226)}px;
  background-color: #000;
  justify-content: center;
`

export const AgendaBackground = styled.ImageBackground.attrs({
  resizeMode: 'cover',
})`
  width: 100%;
  height: 100%;
  opacity: 0.3;
  position: absolute;
`

export const HeaderTextContainer = styled.View`
  padding: 0 20px;
  flex: 1
  justify-content: flex-end;
  margin-bottom: 20px;
`

export const AgendaTitle = styled(Text).attrs({
  size: 28,
  fontWeight: 'bold',
})`
  margin-bottom: 10px;
`

export const AgendaSubTitle = styled(Text).attrs({
  size: 14,
  fontWeight: 'normal',
  lineHeight: 24,
})``

export const ContainerBody = styled.View`
  padding: 10px 0;
  margin: 20px 20px 100px 20px;
`

export const PrimaryTitle = styled(Text).attrs(({ theme }: any) => ({
  size: 40,
  fontWeight: 'bold',
  lineHeight: 45,
  customColor: theme.colors.secondary,
}))``

export const Title = styled(Text).attrs({
  size: 18,
  fontWeight: 'bold',
  lineHeight: 23,
})`
  margin: 3px 0;
`

export const ButtonRoundedView = styled.View`
  margin-top: 20px;
  flex-direction: row;
`

export const DescriptionView = styled.View`
  margin-top: 30px;
`

export const GeolocationButtonView = styled.View`
  margin-top: 30px;
`
