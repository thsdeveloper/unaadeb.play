import React, { useState, useEffect, useContext, ReactNode } from 'react'
import { View, ImageSourcePropType } from 'react-native'
import { Card, Title } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Ionicons'
import { useTheme } from 'styled-components/native'

import { usePhotoCamera } from '~/hooks/usePhotoCamera'
import { usePhotoPicker } from '~/hooks/usePhotoPicker'
import { AppPage } from '~/components'
import AlertContext from '~/contexts/alert'

import * as S from './styles'

interface IProps {
  navigation: any
}

const ProfilePicture: React.FC<IProps> = ({ navigation }): JSX.Element => {
  const { image, pickSingleWithCamera, cameraError, imageUri } =
    usePhotoCamera()
  const { photoLibrary, pickSingle, photoLibUri, pickImageError } =
    usePhotoPicker()
  const theme = useTheme()
  const alert = useContext(AlertContext)

  const [avatar, setAvatar] = useState<
    ImageSourcePropType | ((props: { size: number }) => ReactNode)
  >()

  useEffect(() => {
    if (cameraError) {
      alert.error(cameraError)
    }
    if (pickImageError) {
      alert.error(pickImageError)
    }
  }, [cameraError, pickImageError])

  useEffect(() => {
    if (image && imageUri) {
      setAvatar(image)
    }
    if (photoLibrary && photoLibUri) {
      setAvatar(photoLibrary)
    }
  }, [image, imageUri, photoLibrary, photoLibUri])

  return (
    <AppPage
      safeArea
      scroll
      header={{
        title: 'Perfil',
        onBackPress: () => navigation.pop(),
      }}
    >
      {/* <S.QuitButton onPress={() => onDismiss && onDismiss()}>
        <Icon name='close' size={35} color={theme.colors.light} />
      </S.QuitButton> */}
      <S.Container
        style={{
          flex: 1,
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 120,
        }}
      >
        <Card>
          <Card.Content>
            <Title>Selecione como deseja selecionar sua foto</Title>
            <View style={{ marginTop: 30 }}>
              <S.ButtonPicture
                text='TIRAR FOTO'
                onPress={pickSingleWithCamera}
                icon={{
                  name: 'camerao',
                  size: 40,
                  color: theme.colors.secondary,
                  borderColor: theme.colors.lightRed,
                }}
              />
              <S.ButtonPicture
                text='ABRIR GALERIA'
                onPress={pickSingle}
                icon={{
                  name: 'picture',
                  size: 40,
                  color: theme.colors.secondary,
                  borderColor: theme.colors.lightRed,
                }}
              />
            </View>
          </Card.Content>
        </Card>
      </S.Container>
    </AppPage>
  )
}

export default ProfilePicture
