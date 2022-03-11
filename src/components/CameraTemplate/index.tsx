import React, { useRef, useState, useCallback, useMemo } from 'react'
import { StyleSheet } from 'react-native'
import { useTheme } from 'styled-components/native'
import Icon from 'react-native-vector-icons/Ionicons'
import {
  Camera,
  useCameraDevices,
  TakePhotoOptions,
  TakeSnapshotOptions,
} from 'react-native-vision-camera'

import * as S from './styles'

interface IProps {
  hasPermission: boolean
  onPressClose?: () => void
}

export const CameraTemplate: React.FC<IProps> = ({
  hasPermission,
  onPressClose,
}): JSX.Element => {
  const theme = useTheme()
  const camera = useRef<Camera>(null)
  const devices = useCameraDevices('wide-angle-camera')

  const [flash, setFlash] = useState<'off' | 'on'>('off')
  const [cameraPosition, setCameraPosition] = useState<'front' | 'back'>(
    'front',
  )

  const device = devices[cameraPosition]
  const supportsFlash = device?.hasFlash ?? false

  const takePhotoOptions = useMemo<TakePhotoOptions & TakeSnapshotOptions>(
    () => ({
      photoCodec: 'jpeg',
      qualityPrioritization: 'speed',
      flash: flash,
      quality: 90,
      skipMetadata: true,
    }),
    [flash],
  )

  const onFlashPressed = useCallback(() => {
    setFlash((f) => (f === 'off' ? 'on' : 'off'))
  }, [])

  const onFlipCameraPressed = useCallback(() => {
    setCameraPosition((p) => (p === 'back' ? 'front' : 'back'))
  }, [])

  const takePhoto = useCallback(async () => {
    try {
      if (camera.current == null) throw new Error('Camera ref is null!')

      console.log('Taking photo...')
      const photo = await camera.current.takePhoto(takePhotoOptions)
      console.log(JSON.stringify(photo))
    } catch (e) {
      console.error('Failed to take photo!', e)
    }
  }, [camera])

  return (
    <S.Container>
      {device != null && hasPermission && (
        <Camera
          ref={camera}
          isActive
          device={device}
          photo={true}
          style={StyleSheet.absoluteFill}
        />
      )}
      {onPressClose && (
        <S.QuitButton onPress={onPressClose}>
          <Icon name='close-circle' size={35} color={theme.colors.light} />
        </S.QuitButton>
      )}
      <S.ButtonCameraRotate onPress={onFlipCameraPressed}>
        <Icon name='camera-reverse' size={40} color={theme.colors.light} />
      </S.ButtonCameraRotate>
      {supportsFlash && (
        <S.ButtonFlash onPress={onFlashPressed}>
          <Icon
            name={flash === 'off' ? 'flash-off' : 'flash'}
            size={35}
            color={theme.colors.light}
          />
        </S.ButtonFlash>
      )}
      <S.ButtonPickImage>
        <Icon name='image' size={42} color={theme.colors.light} />
      </S.ButtonPickImage>
      <S.ButtonSnapshot onPress={takePhoto}>
        <S.ViewIconCamera>
          <Icon name='camera-outline' size={40} color={theme.colors.light} />
        </S.ViewIconCamera>
      </S.ButtonSnapshot>
    </S.Container>
  )
}
