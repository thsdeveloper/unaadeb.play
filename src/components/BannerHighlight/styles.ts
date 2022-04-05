import styled from 'styled-components/native'

export const Container = styled.View`
  height: 300px;
`

export const SliderView = styled.View`
  justify-content: center;
  align-items: center;
`

export const BannerImage = styled.Image.attrs({
  resizeMode: 'cover',
})`
  width: 100%;
  height: 250px;
`

export const BannerButton = styled.TouchableOpacity`
  width: 100%;
  height: 250px;
`
