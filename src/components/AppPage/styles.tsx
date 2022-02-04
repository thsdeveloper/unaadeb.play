import styled from "styled-components/native"
import { Platform, Dimensions } from "react-native"

interface ContainerProps {
    fit: boolean
}

const { width, height } = Dimensions.get("window")


export const Container = styled.View<ContainerProps>`
    flex: 1;
    background-color: ${({ theme }:any) => theme.colors.background};
    padding: 0 ${({fit}:ContainerProps) => !fit ? 0 : '20px'};
`
export const ScrollContainer = styled.ScrollView.attrs({
    showsVerticalScrollIndicator: false,
})`
    background-color: ${({ theme }:any) => theme.colors.background};
    flex: 1;
`

export const SafeAreaView = styled.SafeAreaView`
    background-color: ${({ theme }:any) => theme.colors.background};
    flex: 1;
`

export const LoadingContainer = styled.View`
    width: ${width}px;
    height: ${height}px;
    position: absolute;
    top: 0;
    z-index: 2;
    background-color: ${({ theme }:any) => theme.colors.background};
`

export const LoadingView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }:any) => theme.colors.background};
`

export const Loading = styled.ActivityIndicator.attrs(({theme, size}:any) => ({
    size: size ?? 'large',
    color: theme.colors.white,
}))``

export const KeyboardView = styled.KeyboardAvoidingView.attrs({
    behavior: Platform.OS == 'ios' ? 'padding' : 'height',
  })`
    flex: 1;
    margin-bottom: 0px;
  `