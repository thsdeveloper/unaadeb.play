import React from 'react'
import { View } from 'react-native'
import { Button } from 'react-native-paper'
import * as S from './styles'


export interface ISnackbarProps {
  visible: boolean
  action?: Omit<React.ComponentProps<typeof Button>, 'children'> & { label: string; }
  duration?: number
  onDismiss: () => void
  type?: 'default' | 'success' | 'info' | 'warning' | 'error'
  children: React.ReactNode
}

export const Snackbar : React.FC<ISnackbarProps> = ({
  visible,
  action,
  duration,
  onDismiss,
  children,
  type = 'default',
}):JSX.Element => {


  return (
    <View style={{flex:1, justifyContent: 'space-between'}}>
      <S.Snackbar
        visible={visible}
        onDismiss={onDismiss}
        action={action}
        duration={duration}
        type={type}
      >
        {children}
      </S.Snackbar>
    </View>
  )
}