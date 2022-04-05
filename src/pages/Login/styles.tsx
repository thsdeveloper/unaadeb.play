import styled from 'styled-components/native'
import { Dimensions } from 'react-native'

import { widthPixel, heightPixel, pixelSizeVertical } from '~/utils/responsive'
import { Text, TextInput } from '~/components'

const { height, width } = Dimensions.get('window')

export const Header = styled.View`
  flex: 1;
  height: 40%;
  max-height: ${height / 3 + heightPixel(30)}px;
  margin-top: 10px;
  align-items: center;
`

export const BgLogin = styled.ImageBackground.attrs({
  resizeMode: 'contain',
})`
  width: ${width}px;
  height: 100%;
  position: absolute;
  bottom: 0;
`

export const Image = styled.Image.attrs({
  resizeMode: 'contain',
})`
  width: ${widthPixel(375)}px;
  height: ${heightPixel(331)}px;
  justify-content: center;
`

export const H1 = styled(Text)`
  text-align: center;
  padding: 0 ${pixelSizeVertical(20)}px;
  line-height: 32px;
`

export const ContainerButtons = styled.View`
  flex: 1;
  margin: ${pixelSizeVertical(40)}px ${pixelSizeVertical(40)}px
    ${pixelSizeVertical(10)}px ${pixelSizeVertical(40)}px;
`

export const P = styled(Text)`
  line-height: 23px;
  text-align: center;
  margin-top: ${pixelSizeVertical(20)}px;
  padding: 0 ${pixelSizeVertical(20)}px;
`

export const InputText = styled(TextInput).attrs(({ theme }: any) => ({
  textStyle: {
    color: theme.colors.brown,
  },
}))`
  font-weight: 500;
  height: 40px;
  font-size: 16px;
  padding-bottom: 5px;
  padding-top: 10px;
  height: 40px;
  line-height: 20px;
`

export const FieldsContainer = styled.View`
  flex: 1;
  margin: 10px 20px 0 20px;
`

export const ViewSubmitButton = styled.View`
  flex: 1;
  margin: 0 25% 0 25%;
  justify-content: center;
`
