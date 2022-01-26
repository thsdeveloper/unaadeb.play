import styled from "styled-components/native"
import { Dimensions, StatusBar } from 'react-native'

import { Text } from '../../components'

const { height } = Dimensions.get('window')

export const Header = styled.View`
    flex: 1;
    height: 40%;
    max-height: ${height / 2}px;
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