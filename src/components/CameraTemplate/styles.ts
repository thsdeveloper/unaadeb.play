import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/AntDesign'

export const Container = styled.View`
  flex: 1;
`

export const QuitButton = styled.TouchableOpacity`
  position: absolute;
  right: 20px;
  top: 30px;
  z-index: 1;
`

export const ButtonCameraRotate = styled.TouchableOpacity`
  position: absolute;
  right: 20px;
  top: 100px;
`

export const ButtonFlash = styled.TouchableOpacity`
  position: absolute;
  right: 20px;
  top: 180px;
`

export const ButtonSnapshot = styled.TouchableOpacity`
  position: absolute;
  right: 20px;
  left: 20px;
  bottom: 50px;
  align-items: center;
`

export const ButtonPickImage = styled.TouchableOpacity`
  position: absolute;
  left: 10%;
  bottom: 60px;
  align-items: center;
`

export const ViewIconCamera = styled.View`
  border-width: 4px;
  border-color: ${({ theme }: any) => theme.colors.white};
  border-radius: 50px;
  padding: 12px 15px;
`
