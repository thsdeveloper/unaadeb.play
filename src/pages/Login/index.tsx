import React, { useContext, useState } from 'react'
import { useTheme } from 'styled-components/native'
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

const Login: React.FC = ({ navigation }:any) => {
    const EMPTY_FIELDS_MESSAGE = 'Campo obrigatório'
    const EMAIL_IS_NOT_VALID = 'Email inválido'

    const {signIn, signInForm, loading } = useAuth()
    const theme = useTheme()
    const alert = useContext(AlertContext)
    const [user, setUser] = useState<UserProps>({})
    const [isEmptyFields, setisEmptyFields] = useState<boolean>(false)
    const [isInvalidEmail, setIsInvalidEmail] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleSignIn = () => {
        setIsLoading(true)
        signIn()
    }

    const handleSignUp = () => {
        
        navigation.navigate('SignUp')
    }

    const handleSignInForm = () => {
        const {email, password} = user
        if(!email || !password) {
            setisEmptyFields(true)
            return alert.error('Preencha os campos obrigatórios')
        }
        signInForm(email, password)
    }

    const onUserFieldChange = (field: UserProps) => {
        setUser((fields) => ({
            ...fields,
            ...field
            })
        )
    }

    const emailValidation = () => {
        if (user?.email && !validateEmail(user?.email)) {
            setIsInvalidEmail(true)
            return
        }
        setIsInvalidEmail(false)
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
            <S.P fontWeight='400' size={15}>
                Entre agora com o login nas redes sociais
                ou cadastre-se com e-mail e senha.
            </S.P>

            <S.ContainerButtons>
                <Button 
                    text='Entrar com Google' 
                    mode='contained' 
                    onPress={handleSignIn}
                    icon={{name: 'google', size: 30}}
                />
            </S.ContainerButtons>

            <S.H1 fontWeight='bold' size={15}>
                ou entre com seu e-mail e senha
            </S.H1>
            
            <S.FieldsContainer>
                <S.InputText
                    label="Email"
                    placeholder="Email"
                    type="e-mail"
                    autoCapitalize="none"
                    onChange={(e: any) => onUserFieldChange({ email: e.nativeEvent.text })}
                    hasError={!user.email && isEmptyFields || isInvalidEmail}
                    errorDescription={isEmptyFields ? EMPTY_FIELDS_MESSAGE : EMAIL_IS_NOT_VALID}
                    onEndEditing={emailValidation}
                />
                 <S.InputText
                    label="Senha"
                    placeholder="Senha"
                    type="password"
                    autoCapitalize="none"
                    hasError={!user?.password && isEmptyFields}
                    errorDescription={isEmptyFields && EMPTY_FIELDS_MESSAGE}
                    onChange={(e: any) => onUserFieldChange({ password: e.nativeEvent.text })}
                />
            </S.FieldsContainer>

            <S.ViewSubmitButton>
                <Button 
                    text='ENTRAR' 
                    mode='text' 
                    onPress={handleSignInForm} 
                    color={theme.colors.primary}
                />
            </S.ViewSubmitButton>
                
             <S.ContainerButtons style={{marginTop: 0}}>
                <Button 
                    text='Cadastre-se' 
                    mode='text' 
                    onPress={handleSignUp} 
                    color={theme.colors.white}
                />
            </S.ContainerButtons>
            
        </AppPage>
    )
}

export default Login