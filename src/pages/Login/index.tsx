import React from 'react'
import {AppPage , Button} from '~/components'
import { useAuth } from '~/contexts/auth'

import * as S from './styles'

const image = require('../../../assets/images/Login-bg.png')

const Login: React.FC = () => {
    const {signIn} = useAuth()

    const handleSignIn = () => signIn()

  return (
        <AppPage fit={false} scroll={true} safeArea>
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
                <Button 
                    text='Cadastre-se' 
                    mode='text' 
                    onPress={() => {
                        console.log('Cadastre-se')
                    }} color='#fff'
                />
            </S.ContainerButtons>
        </AppPage>
    )
}

export default Login