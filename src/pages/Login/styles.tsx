import styled from 'styled-components/native'
import { Dimensions, StatusBar } from 'react-native'

import { Text, TextInput } from '../../components'

const { height } = Dimensions.get('window')

export const Header = styled.View`
  flex: 1;
  height: 40%;
  max-height: ${height / 3 + 30}px;
  margin-top: 10px;
`

export const BgLogin = styled.ImageBackground.attrs({
  resizeMode: 'contain',
})`
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0;
`

export const Image = styled.Image.attrs({
  resizeMode: 'cover',
})`
  width: 100%;
  height: 100%;
  justify-content: center;
`

export const H1 = styled(Text)`
  text-align: center;
  padding: 0 20px;
  line-height: 35px;
`

export const ContainerButtons = styled.View`
  flex: 1;
  margin: 40px 40px 10px 40px;
`

export const P = styled(Text)`
  line-height: 25px;
  text-align: center;
  margin-top: 20px;
  padding: 0 20px;
`

export const InputText = styled(TextInput).attrs(({ theme }: any) => ({
  textStyle: {
    color: theme.colors.brown,
  },
}))`
  font-weight: 500;
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
