import React, { useState, useEffect } from 'react'
import {
  Paragraph,
  Dialog as NPDialog,
  Portal,
  Button as NPButton,
} from 'react-native-paper'

import * as S from './styles'

export interface IDialogProps {
  visible: boolean
  title?: string
  description?: string
  confirmText?: string
  cancelText?: string
  onDismiss?: () => void
  onConfirm?: () => void
  onCancel?: () => void
}

export const Dialog: React.FC<IDialogProps> = ({
  visible,
  title,
  description,
  confirmText = 'OK',
  cancelText = 'Cancelar',
  onDismiss,
  onConfirm,
  onCancel,
  children,
}): JSX.Element => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)

  useEffect(() => {
    setModalVisible(visible)
    console.log('visible', visible)
  }, [visible])

  return (
    <Portal>
      <NPDialog
        visible={modalVisible}
        onDismiss={() => {
          onDismiss && onDismiss()
          setModalVisible(false)
        }}
      >
        <NPDialog.Title>{title}</NPDialog.Title>
        <NPDialog.Content>
          {description && <Paragraph>{description}</Paragraph>}
          {children}
        </NPDialog.Content>
        <NPDialog.Actions>
          {onCancel && (
            <NPButton mode='text' onPress={onCancel}>
              {cancelText}
            </NPButton>
          )}
          <NPButton mode='text' onPress={onConfirm}>
            {confirmText}
          </NPButton>
        </NPDialog.Actions>
      </NPDialog>
    </Portal>
  )
}
