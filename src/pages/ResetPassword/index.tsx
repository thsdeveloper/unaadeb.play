import React, { useState, useCallback, useContext } from 'react'
import { useTheme } from 'styled-components/native'

import { AppPage, Button } from '~/components'
import { validateEmail } from '~/utils/format'
import { isEmptyObject } from '~/utils/validations'
import { updatePassword } from '~/services/auth'
import AlertContext from '~/contexts/alert'

import * as S from './styles'

interface IProps {
  navigation: any
}

interface UserEmailProps {
  email: string
}

const ResetPassword: React.FC<IProps> = ({ navigation }): JSX.Element => {
  const EMPTY_FIELDS_MESSAGE = 'Campo obrigatório'
  const EMAIL_IS_NOT_VALID = 'Email inválido'
  const theme = useTheme()
  const alert = useContext(AlertContext)

  const [email, setEmail] = useState<UserEmailProps | null>(null)
  const [isEmptyFields, setisEmptyFields] = useState<boolean>(false)
  const [isInvalidEmail, setIsInvalidEmail] = useState<boolean>(false)
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const emailValidation = () => {
    if (email && !validateEmail(email?.email)) {
      setIsInvalidEmail(true)
      return
    }
    setIsInvalidEmail(false)
  }

  const onEmailChange = useCallback((e: UserEmailProps) => {
    const emailData = e.email.length ? e : null
    setEmail(emailData)
  }, [])

  const handleOnResetPassword = useCallback(() => {
    emailValidation()
    if (isEmptyObject(email)) {
      setisEmptyFields(true)
      return
    }
    if (isInvalidEmail) {
      return
    }
    setIsDialogOpen(true)
  }, [isInvalidEmail])

  const updatePasswordUser = useCallback(async () => {
    try {
      setIsDialogOpen(false)
      setIsLoading(true)
      if (email) {
        await updatePassword(email.email)
        alert.success(
          'Um email foi enviado para você com as instruções de recuperação de senha',
        )
        navigation.navigate('Login')

        return
      }
      throw new Error('Error')
    } catch (_e: any) {
      console.log(_e)
      alert.error('Falha ao atualizar a senha, por favor tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const hideDialog = () => {
    setIsDialogOpen(false)
  }

  return (
    <AppPage
      header={{
        title: 'Redefinir senha de acesso',
        onBackPress: () => navigation.pop(),
      }}
      loading={isLoading}
      safeArea
      scroll
      fit
      dialog={{
        visible: isDialogOpen,
        title: 'Redefinição de senha',
        description:
          'Uma mensagem com instruções de redefinição senha será enviada ao seu email de cadastro no UnaadebPlay',
        onConfirm: updatePasswordUser,
        onCancel: hideDialog,
        onDismiss: hideDialog,
        confirmText: 'OK entendi!',
      }}
    >
      <S.Container>
        <S.P size={20}>Informe abaixo seu email de cadastro no UnaadebPlay</S.P>
        <S.InputText
          label='Email'
          placeholder='Email'
          type='e-mail'
          autoCapitalize='none'
          onChange={(e: any) => onEmailChange({ email: e.nativeEvent.text })}
          hasError={(!email && isEmptyFields) || isInvalidEmail}
          errorDescription={
            isEmptyFields ? EMPTY_FIELDS_MESSAGE : EMAIL_IS_NOT_VALID
          }
          onEndEditing={emailValidation}
        />
        <S.ViewSubmitButton>
          <Button
            text='ENVIAR'
            mode='contained'
            onPress={handleOnResetPassword}
            color={theme.colors.secondary}
            textSize={14}
            disabled={!email}
          />
        </S.ViewSubmitButton>
      </S.Container>
    </AppPage>
  )
}

export default ResetPassword
