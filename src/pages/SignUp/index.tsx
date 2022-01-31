import React from 'react'
//import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, Platform } from 'react-native'
import { Switch } from 'react-native-paper'

import { AppPage, Button } from '~/components'

import * as S from './styles'

const SignUp : React.FC = ({ navigation }:any):JSX.Element => {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false)
  const [isNotAdult, setIsNotAdult] = React.useState(true)

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn)
  const onToggleSwitchAdult = () => setIsNotAdult(!isNotAdult)

  return (
    <>
        <AppPage 
          safeArea 
          scroll
          header={{
            title: 'Cadastro',
            onBackPress: () => navigation.pop(),
          }}
        >
          <S.Header>
            <S.HeadText fontWeight='bold' size={35}>Cadastre-se</S.HeadText>
            <S.HeadText fontWeight='normal' size={18} lineHeight={30}>
              Cadastre-se agora mesmo e tenha a <S.HeadText fontWeight='bold' size={22}>UNAADEB</S.HeadText> na palma da sua mão.
            </S.HeadText>
          </S.Header>
          {/* <KeyboardAvoidingView keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
              <S.FormContainer>
                <S.InputText
                  mode="outlined"
                  label="Nome"
                  placeholder="Nome"
                />
                <S.InputText
                  mode="outlined"
                  label="Email"
                  placeholder="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <S.InputText
                  mode="outlined"
                  label="Telefone"
                  placeholder="Telefone"
                  keyboardType="phone-pad"
                />
                <S.InputText
                  mode="outlined"
                  label="Data de nascimento"
                  placeholder="Data de nascimento"
                />
                <S.ViewSwitchField style={{marginBottom: 10}}>
                  <Switch value={isNotAdult} onValueChange={onToggleSwitchAdult} />
                  <S.HeadText fontWeight='700' size={16} align='left' style={{marginLeft: 10}}>É um usuário menor de idade?</S.HeadText>
                </S.ViewSwitchField>
                
                {isNotAdult && (
                  <>
                    <S.InputText
                      mode="outlined"
                      label="Nome do Pai, Mãe ou Responsável"
                      placeholder="Nome do Pai, Mãe ou Responsável"
                    />
                    <S.InputText
                      mode="outlined"
                      label="CPF do Responsável"
                      placeholder="CPF do Responsável"
                    />
                  </>
                )}

                <S.ViewSwitchField>
                  <Switch value={isSwitchOn} onValueChange={onToggleSwitch} style={{marginRight: 10}}/>
                  <S.HeadText fontWeight='500' size={15} align='left' style={{paddingRight: 60}}>
                    Li e concordo com os Termos e a <S.HeadText fontWeight='bold' size={16} style={{textDecorationLine: 'underline'}}>Política de Privacidade</S.HeadText>. E eu concordo em consentir que o ADEB colete meus dados.
                  </S.HeadText>
                </S.ViewSwitchField>

                <S.SubmitButtonView>
                  <Button 
                    text='Cadastrar' 
                    mode='contained' 
                    onPress={() => {}} 
                    style={{width: '100%'}}
                  />
                </S.SubmitButtonView>
                  
              </S.FormContainer>
            {/* </TouchableWithoutFeedback>
          </KeyboardAvoidingView> */}
            
        </AppPage>
      </>
  )
}

export default SignUp