import React, { useState, useContext } from 'react'
import { useTheme } from 'styled-components/native'
import { View } from 'react-native'

import { AppPage, Button } from '~/components'
import AlertContext from '~/contexts/alert'
import { useAuth } from '~/contexts/auth'
import { validateEmail } from '~/utils/format'

import * as S from './styles'

const image = require('../../../assets/images/Login-bg.png')

interface UserProps {
  email?: string
  password?: string
}

const Login: React.FC = ({ navigation }: any) => {
  const EMPTY_FIELDS_MESSAGE = 'Campo obrigatório'
  const EMAIL_IS_NOT_VALID = 'Email inválido'

  const { signIn, signInForm, loading } = useAuth()
  const theme = useTheme()
  const alert = useContext(AlertContext)
  const [user, setUser] = useState<UserProps>({})
  const [isEmptyFields, setisEmptyFields] = useState<boolean>(false)
  const [isInvalidEmail, setIsInvalidEmail] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [alternateLogin, setAlternateLogin] = useState<boolean>(false)

  const handleSignIn = () => {
    signIn()
  }

  const handleSignUp = () => {
    navigation.navigate('SignUp')
  }

  const handleSignInForm = () => {
    const { email, password } = user
    if (!email || !password) {
      setisEmptyFields(true)
      return alert.error('Preencha os campos obrigatórios')
    }
    signInForm(email, password)
  }

  const onUserFieldChange = (field: UserProps) => {
    setUser((fields) => ({
      ...fields,
      ...field,
    }))
  }

  const emailValidation = () => {
    if (user?.email && !validateEmail(user?.email)) {
      setIsInvalidEmail(true)
      return
    }
    setIsInvalidEmail(false)
  }

  const alternateLoginHandler = () => {
    setAlternateLogin(!alternateLogin)
  }

  const goToResetPassword = () => {
    navigation.navigate('ResetPassword')
  }

  return (
    <AppPage
      fit={false}
      scroll={true}
      safeArea
      keyboardAvoidingView
      loading={isLoading || loading}
    >
      <S.Header>
        <S.Image source={image} />
      </S.Header>
      <S.H1 fontWeight='bold' size={35}>
        Junte-se a milhares de adolescentes com propósitos!
      </S.H1>
      <S.P fontWeight='400' size={18}>
        Entre agora com o login nas redes sociais ou cadastre-se com e-mail e
        senha.
      </S.P>
      {!alternateLogin && (
        <>
          <S.ContainerButtons>
            <Button
              text='Entrar com Google'
              mode='contained'
              onPress={handleSignIn}
              icon={{ name: 'google', size: 30 }}
              textSize={12}
            />

            <Button
              text='Ou entre com seu e-mail e senha'
              mode='text'
              onPress={alternateLoginHandler}
              color={theme.colors.primary}
              textSize={12}
            />
          </S.ContainerButtons>
          <S.ContainerButtons style={{ marginTop: 0 }}>
            <Button
              text='Cadastre-se com e-mail e senha'
              mode='text'
              onPress={handleSignUp}
              color={theme.colors.white}
              textSize={12}
            />
          </S.ContainerButtons>
        </>
      )}

      {alternateLogin && (
        <>
          <S.FieldsContainer>
            <S.InputText
              label='Email'
              placeholder='Email'
              type='e-mail'
              autoCapitalize='none'
              onChange={(e: any) =>
                onUserFieldChange({ email: e.nativeEvent.text })
              }
              hasError={(!user.email && isEmptyFields) || isInvalidEmail}
              errorDescription={
                isEmptyFields ? EMPTY_FIELDS_MESSAGE : EMAIL_IS_NOT_VALID
              }
              onEndEditing={emailValidation}
            />
            <S.InputText
              label='Senha'
              placeholder='Senha'
              type='password'
              autoCapitalize='none'
              hasError={!user?.password && isEmptyFields}
              errorDescription={isEmptyFields && EMPTY_FIELDS_MESSAGE}
              onChange={(e: any) =>
                onUserFieldChange({ password: e.nativeEvent.text })
              }
            />
          </S.FieldsContainer>

          <S.ViewSubmitButton>
            <Button
              text='ENTRAR'
              mode='contained'
              onPress={handleSignInForm}
              color={theme.colors.primary}
              textSize={14}
            />
          </S.ViewSubmitButton>
          <S.ViewSubmitButton>
            <Button
              text='Esqueceu a senha?'
              mode='text'
              onPress={goToResetPassword}
              color={theme.colors.secondary}
              textSize={14}
            />
          </S.ViewSubmitButton>
          <View
            style={{
              marginTop: 0,
              alignItems: 'center',
            }}
          >
            <Button
              text='Voltar'
              mode='text'
              onPress={alternateLoginHandler}
              color={theme.colors.white}
              textSize={12}
              icon={{ name: 'arrowleft', size: 20, bordered: false }}
              style={{ width: 130 }}
            />
          </View>
        </>
      )}
    </AppPage>
  )
}

export default Login
