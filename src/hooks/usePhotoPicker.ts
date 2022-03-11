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
  name?: string
}

export const usePhotoPicker = () => {
  const [photoLibrary, setPhotoLibrary] = useState<ImageProps>()
  const [pickImageError, setPickImageError] = useState<string>()
  const [photoLibFile, setPhotoLibFile] = useState<PhotoFileProps>()

  const pickSingle = useCallback((cropit: boolean, circular = false) => {
    ImagePicker.openPicker({
      width: 500,
      height: 500,
      cropping: cropit,
      cropperCircleOverlay: circular,
      sortOrder: 'none',
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
      compressImageQuality: 1,
      compressVideoPreset: 'MediumQuality',
      includeExif: true,
      cropperStatusBarColor: 'white',
      cropperToolbarColor: 'white',
      cropperActiveWidgetColor: 'white',
      cropperToolbarWidgetColor: '#3498DB',
    })
      .then((image) => {
        setPhotoLibrary({
          uri: image.path,
          width: image.width,
          height: image.height,
          mime: image.mime,
        })
        setPhotoLibFile({ uri: image.path, name: image?.filename })
      })
      .catch((e) => {
        if (e.code === 'E_NO_IMAGE_DATA_FOUND') {
          setPickImageError('Nenuma imagem encontrada')
        } else if (e.code === 'E_NO_LIBRARY_PERMISSION') {
          setPickImageError('Sem permissão para usar a câmera')
        } else if (e.code === 'E_PICKER_CANCELLED') {
          return
        } else {
          setPickImageError('Falha ao abrir a câmera')
        }
      })
  }, [])

  return {
    photoLibrary,
    pickSingle,
    pickImageError,
    photoLibFile,
  }
}
