import styled from 'styled-components/native'
import { Platform, Dimensions } from 'react-native'
import { Button } from '~/components'

interface ContainerProps {
  fit: boolean
}

const { width, height } = Dimensions.get('window')

const isIOS = Platform.OS === 'ios'

export const Container = styled.View<ContainerProps>`
    flex: 1;
    background-color: ${({ theme }: any) => theme.colors.background};
    padding: 0 ${({ fit }: ContainerProps) => (!fit ? 0 : '20px')};
    ${({ fit }: ContainerProps) =>
      fit && `margin-top:  ${!isIOS ? '20px' : '10px'}`}};
`
export const ScrollContainer = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  background-color: ${({ theme }: any) => theme.colors.background};
  flex: 1;
`

export const FlatListView = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})<ContainerProps>`
  background-color: ${({ theme }: any) => theme.colors.background};
  margin: 0 ${({ fit }: ContainerProps) => (!fit ? 0 : '20px')};
`

export const SafeAreaView = styled.SafeAreaView`
  background-color: ${({ theme }: any) => theme.colors.background};
  flex: 1;
`

export const LoadingContainer = styled.View`
  position: absolute;
  top: 0;
  z-index: 2;
  background-color: ${({ theme }: any) => theme.colors.background};
`

export const LoadingView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }: any) => theme.colors.background};
`

export const Loading = styled.ActivityIndicator.attrs(
  ({ theme, size }: any) => ({
    size: size ?? 'large',
    color: theme.colors.white,
  }),
)``

export const KeyboardView = styled.KeyboardAvoidingView.attrs({
  behavior: Platform.OS == 'ios' ? 'padding' : 'height',
})`
  flex: 1;
  margin-bottom: 0px;
`

export const FooterButtonView = styled.View`
  position: absolute;
  bottom: ${({ isplayerActive }: any) => (!isplayerActive ? 0 : 55)}px;
  width: 100%;
  padding: 10px 20px 30px 20px;
  background-color: ${({ theme }: any) => theme.colors.background};
`

export const FooterButton = styled(Button).attrs({
  mode: 'contained',
})``
