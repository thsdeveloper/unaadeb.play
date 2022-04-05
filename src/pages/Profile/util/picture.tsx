import React, { useState, useEffect, useContext, useCallback } from 'react'
import { View, ImageSourcePropType } from 'react-native'
import { Card, Title } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Ionicons'
import { useTheme } from 'styled-components/native'
import storage from '@react-native-firebase/storage'
import { useAuth } from '~/contexts/auth'
import { updateProfile } from '~/services/profile'

import { heightPixel, fontPixel } from '~/utils/responsive'
import { usePhotoCamera } from '~/hooks/usePhotoCamera'
import { usePhotoPicker } from '~/hooks/usePhotoPicker'
import { AppPage, Avatar, Button } from '~/components'
import AlertContext from '~/contexts/alert'
import { uploadPicture } from '~/services/storage'

import * as S from '../styles'

interface PhotoFileProps {
  uri: string
  name?: string
}

interface PictureModalProps {
  onDismiss?: () => void
  onPictureSelected: (picture: string) => void
}

export const Picture: React.FC<PictureModalProps> = ({
  onDismiss,
  onPictureSelected,
}) => {
  const { image, pickSingleWithCamera, cameraError, cameraFile } =
    usePhotoCamera()
  const { photoLibrary, pickSingle, pickImageError, photoLibFile } =
    usePhotoPicker()
  const theme = useTheme()
  const alert = useContext(AlertContext)
  const { user, updateUserState } = useAuth()

  const [avatar, setAvatar] = useState<ImageSourcePropType>()
  const [loading, setLoading] = useState<boolean>(false)
  const [photo, setPhoto] = useState<PhotoFileProps>()

  const clearImage = () => setAvatar(undefined)

  const handleUpload = useCallback(async () => {
    try {
      if (!photo)
        return alert.warning(
          'Falha ao selecionar foto, por favor selecione outra',
        )
      setLoading(true)
      const timestamp = new Date().getTime()
      const res = await uploadPicture(photo.uri, `${timestamp}_${photo.name}`)
      updateImageProfile(res)
    } catch (error) {
      alert.error('Erro ao salvar imagem')
      setLoading(false)
    }
  }, [photo])

  const updateImageProfile = useCallback(
    async (image) => {
      try {
        setLoading(true)
        if (user?.email) {
          await updateProfile(user?.email, { photo: image })
          await afterChange()
          onPictureSelected(image)
          alert.success('Imagem atualizada com sucesso!')
          return
        }
        throw new Error('Não foi possível atualizar a imagem')
      } catch (_e: any) {
        const errorMsg =
          _e.message ||
          'Ocorreu uma falha ao atualizar a image, por favor tente novamente.'
        alert.error(errorMsg)
      } finally {
        setLoading(false)
      }
    },
    [user?.email],
  )

  const afterChange = async () => await updateUserState()

  useEffect(() => {
    if (cameraError) {
      alert.error(cameraError)
    }
    if (pickImageError) {
      alert.error(pickImageError)
    }
  }, [cameraError, pickImageError])

  useEffect(() => {
    if (image && cameraFile) {
      setAvatar(image)
      setPhoto(cameraFile)
    }
  }, [image, cameraFile])

  useEffect(() => {
    if (photoLibrary && photoLibFile) {
      setAvatar(photoLibrary)
      setPhoto(photoLibFile)
    }
  }, [photoLibrary, photoLibFile])

  return (
    <AppPage safeArea scroll={!avatar ? false : true} loading={loading}>
      <S.QuitButton onPress={() => onDismiss && onDismiss()}>
        <Icon name='close' size={35} color={theme.colors.light} />
      </S.QuitButton>
      <S.Container
        style={{
          flex: 1,
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        {!avatar ? (
          <Card mode='outlined'>
            <Card.Content>
              <>
                <Title style={{ lineHeight: 22 }}>
                  Selecione como deseja alterar sua foto:
                </Title>
                <View style={{ marginTop: 30 }}>
                  <S.ButtonPicture
                    text='USAR CAMERA'
                    onPress={() => pickSingleWithCamera(true)}
                    icon={{
                      name: 'camerao',
                      size: 40,
                      color: theme.colors.secondary,
                      borderColor: theme.colors.lightRed,
                    }}
                  />
                  <S.ButtonPicture
                    text='ABRIR GALERIA'
                    onPress={() => pickSingle(true)}
                    icon={{
                      name: 'picture',
                      size: 40,
                      color: theme.colors.secondary,
                      borderColor: theme.colors.lightRed,
                    }}
                  />
                </View>
              </>
            </Card.Content>
          </Card>
        ) : (
          <View
            style={{
              flex: 1,
              marginTop: 100,
              alignItems: 'center',
            }}
          >
            <Avatar.Image source={avatar} type='circle' size={250} />
            <View style={{ marginTop: 30, flex: 1 }}>
              <Button
                text='SALVAR'
                mode='contained'
                textSize={12}
                onPress={handleUpload}
                style={{ width: '100%' }}
              />
            </View>
            <View style={{ marginTop: 20 }}>
              <Button
                text='ESCOLHER OUTRA'
                mode='text'
                textSize={12}
                onPress={clearImage}
                style={{ width: '100%' }}
              />
            </View>
          </View>
        )}
      </S.Container>
    </AppPage>
  )
}
