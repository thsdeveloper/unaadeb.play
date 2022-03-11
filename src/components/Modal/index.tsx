import React, { useState, useEffect } from 'react'
import { Modal as RNModal, StyleProp, ViewStyle } from 'react-native'

import * as S from './styles'

export interface ModalProps {
  visible: boolean
  animationType?: 'none' | 'slide' | 'fade'
  transparent?: boolean
  onRequestClose?: () => void
  style?: StyleProp<ViewStyle>
  children?: React.ReactNode
}

export const Modal: React.FC<ModalProps> = ({
  visible,
  animationType = 'slide',
  transparent,
  onRequestClose,
  style,
  children,
}): JSX.Element => {
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    setModalVisible(visible)
  }, [visible])
  return (
    <S.Container style={style}>
      <RNModal
        visible={modalVisible}
        animationType={animationType}
        transparent={transparent}
        onRequestClose={() => {
          onRequestClose && onRequestClose()
          setModalVisible(!modalVisible)
        }}
      >
        {children}
      </RNModal>
    </S.Container>
  )
}
