import styled from "styled-components/native"

interface ContainerProps {
    fit: boolean
}


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