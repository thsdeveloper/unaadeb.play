import { useState, useCallback } from 'react'
import ImagePicker from 'react-native-image-crop-picker'

interface ImageProps {
  uri: string
  width: number
  height: number
  mime: string
}

interface PhotoFileProps {
  uri: string
  name: string
}

type mediaType = 'photo' | 'video' | 'any'

export const usePhotoCamera = () => {
  const [image, setImage] = useState<ImageProps>()
  const [cameraError, setCameraError] = useState<string>()
  const [cameraFile, setCameraFile] = useState<PhotoFileProps>()

  const pickSingleWithCamera = useCallback(
    (cropping: boolean, mediaType: mediaType = 'photo') => {
      ImagePicker.openCamera({
        cropping: cropping,
        width: 500,
        height: 500,
        includeExif: true,
        mediaType,
      })
        .then((image) => {
          const fileName = image.path?.split('/').reverse()[0]

          setImage({
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime,
          })
          setCameraFile({ uri: image.path, name: fileName })
        })
        .catch((e) => {
          if (e.code === 'E_NO_IMAGE_DATA_FOUND') {
            setCameraError('Nenuma imagem encontrada')
          } else if (e.code === 'E_NO_CAMERA_PERMISSION') {
            setCameraError('Sem permissão para usar a câmera')
          } else if (e.code === 'E_PICKER_CANCELLED') {
            return
          } else {
            setCameraError('Falha ao abrir a câmera')
          }
        })
    },
    [],
  )

  return { image, pickSingleWithCamera, cameraError, cameraFile }
}
