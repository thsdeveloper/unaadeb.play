import auth from '@react-native-firebase/auth'
import React, { useCallback, useContext, useState } from 'react'
import { Switch } from 'react-native-paper'
import { AppPage, Button } from '~/components'
import AlertContext from '~/contexts/alert'
import { subscription } from '~/services/signUp'
import * as S from './styles'

interface IFieldsProps {
  customer?: CustomerProps
  user?: UserProps
}

interface CustomerProps {
  name?: string
  email?: string
  phone?: string
  birthDate?: string
  parentName?: string
  parentCPF?: string
}

interface UserProps {
  email?: string
  password?: string
  passwordConfirmation?: string
}
interface IProps {
  navigation: any
}

const SignUp: React.FC<IProps> = ({ navigation }): JSX.Element => {
  const EMPTY_FIELDS_MESSAGE = 'Campo obrigatório'
  const PASSWORDS_NOT_MATCH = 'As senhas não conferem'

  const alert = useContext(AlertContext)

  const [isSwitchOn, setIsSwitchOn] = useState(true)
  const [isNotAdult, setIsNotAdult] = useState(false)
  const [formFields, setFormFields] = useState<IFieldsProps>({})
  const [isEmptyFields, setisEmptyFields] = useState<boolean>(false)
  const [isPasswordsNotMatch, setIsPasswordsNotMatch] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn)

  const onCustomerFieldChange = useCallback(
    (field: CustomerProps) => {
      setFormFields((fields) => ({
        ...fields,
        customer: {
          ...fields.customer,
          ...field,
        },
      }))
    },
    [setFormFields, formFields.customer],
  )

  const onUserFieldChange = useCallback(
    (field: UserProps) => {
      setFormFields((fields) => ({
        ...fields,
        user: {
          ...fields.user,
          ...field,
        },
      }))
    },
    [setFormFields, formFields.user],
  )

  const checkIsNotAdult = useCallback(() => {
    const { birthDate } = formFields?.customer || {}
    if (birthDate) {
      const formattedDate = birthDate.split('/').reverse().join('-')
      const date = new Date(formattedDate)
      const currentDate = new Date()
      const age = currentDate.getFullYear() - date.getFullYear()
      if (age < 18) {
        setIsNotAdult(true)
      } else {
        setIsNotAdult(false)
      }
    }
  }, [formFields.customer])

  const createUser = async (email: string, password: string) => {
    try {
      await auth().createUserWithEmailAndPassword(email, password)
      return true
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        alert.error(
          'O email informado já esta em uso, por favor informe outro email',
        )
      }

      if (error.code === 'auth/invalid-email') {
        alert.error('O email informado é inválido')
      } else {
        alert.error(
          'Ocorreu um erro ao efetuar cadastro, por favor tente novamente',
        )
      }

      return false
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmit = useCallback(async () => {
    const { name, email, phone, birthDate } = formFields?.customer || {}
    const { password, passwordConfirmation } = formFields?.user || {}

    if (
      !name ||
      !email ||
      !phone ||
      !birthDate ||
      !password ||
      !passwordConfirmation
    ) {
      setisEmptyFields(true)
      return alert.error('Por favor, preencha todos os campos')
    }

    if (password !== passwordConfirmation) {
      setIsPasswordsNotMatch(true)
      return alert.error('As senhas não conferem')
    }
    setisEmptyFields(false)
    setIsPasswordsNotMatch(false)

    setIsLoading(true)
    const isUserCreated = await createUser(email, password)
    if (!isUserCreated) {
      return
    }
    addCustomer()
  }, [formFields])

  const addCustomer = useCallback(async () => {
    if (formFields?.customer) {
      try {
        const subscribe = await subscription(formFields.customer)
        if (subscribe) {
          alert.success('Parabéns! Você já pode fazer login no app!')
          return
        }
        throw new Error(
          'Erro ao realizar cadastro, por favor tente novamente em alguns instantes',
        )
      } catch (error) {
        alert.error(
          'Ocorreu um erro ao efetuar cadastro, por favor tente novamente',
        )
      } finally {
        setIsLoading(false)
        setFormFields({})
      }
    }
  }, [formFields])

  return (
    <>
      <AppPage
        safeArea
        scroll
        loading={isLoading}
        header={{
          title: 'Cadastro',
          onBackPress: () => navigation.pop(),
        }}
        keyboardAvoidingView
      >
        <S.Header>
          <S.HeadText fontWeight='bold' size={35}>
            Cadastre-se
          </S.HeadText>
          <S.HeadText fontWeight='normal' size={18} lineHeight={30}>
            Cadastre-se agora mesmo e tenha a{' '}
            <S.HeadText fontWeight='bold' size={22}>
              UNAADEB
            </S.HeadText>{' '}
            na palma da sua mão.
          </S.HeadText>
        </S.Header>

        <S.FormContainer>
          <S.InputText
            label='Nome'
            placeholder='Nome'
            onChange={(e: any) =>
              onCustomerFieldChange({ name: e.nativeEvent.text })
            }
            hasError={!formFields?.customer?.name && isEmptyFields}
            errorDescription={EMPTY_FIELDS_MESSAGE}
          />
          <S.InputText
            label='Email'
            placeholder='Email'
            keyboardType='email-address'
            autoCapitalize='none'
            onChange={(e: any) =>
              onCustomerFieldChange({ email: e.nativeEvent.text })
            }
            hasError={!formFields?.customer?.email && isEmptyFields}
            errorDescription={EMPTY_FIELDS_MESSAGE}
          />
          <S.InputText
            label='Telefone'
            placeholder='Telefone'
            keyboardType='phone-pad'
            type='phone'
            hasError={!formFields?.customer?.phone && isEmptyFields}
            errorDescription={EMPTY_FIELDS_MESSAGE}
            valueIsControlled={true}
            valueControlled={formFields?.customer?.phone}
            onChangeText={(e: any) => onCustomerFieldChange({ phone: e })}
          />
          <S.InputText
            label='Data de nascimento'
            placeholder='Data de nascimento'
            type='date'
            hasError={!formFields?.customer?.birthDate && isEmptyFields}
            errorDescription={EMPTY_FIELDS_MESSAGE}
            valueIsControlled={true}
            valueControlled={formFields?.customer?.birthDate}
            onChangeText={(e: any) => onCustomerFieldChange({ birthDate: e })}
            onEndEditing={checkIsNotAdult}
          />

          {isNotAdult && (
            <>
              <S.InputText
                label='Nome do Pai, Mãe ou Responsável'
                placeholder='Nome do Pai, Mãe ou Responsável'
                hasError={!formFields?.customer?.parentName && isEmptyFields}
                errorDescription={EMPTY_FIELDS_MESSAGE}
                onChange={(e: any) =>
                  onCustomerFieldChange({ parentName: e.nativeEvent.text })
                }
              />
              <S.InputText
                label='CPF do Responsável'
                placeholder='CPF do Responsável'
                type='cpf'
                hasError={!formFields?.customer?.parentCPF && isEmptyFields}
                errorDescription={EMPTY_FIELDS_MESSAGE}
                valueIsControlled={true}
                valueControlled={formFields?.customer?.parentCPF}
                onChangeText={(e: any) =>
                  onCustomerFieldChange({ parentCPF: e })
                }
              />
            </>
          )}

          <S.InputText
            label='Senha'
            placeholder='Senha'
            type='password'
            autoCapitalize='none'
            hasError={
              (!formFields?.user?.password && isEmptyFields) ||
              isPasswordsNotMatch
            }
            errorDescription={
              isEmptyFields ? EMPTY_FIELDS_MESSAGE : PASSWORDS_NOT_MATCH
            }
            onChange={(e: any) =>
              onUserFieldChange({ password: e.nativeEvent.text })
            }
          />
          <S.InputText
            label='Confirmar senha'
            placeholder='Confirmar senha'
            type='password'
            autoCapitalize='none'
            hasError={
              (!formFields?.user?.passwordConfirmation && isEmptyFields) ||
              isPasswordsNotMatch
            }
            errorDescription={
              isEmptyFields ? EMPTY_FIELDS_MESSAGE : PASSWORDS_NOT_MATCH
            }
            onChange={(e: any) =>
              onUserFieldChange({ passwordConfirmation: e.nativeEvent.text })
            }
          />

          <S.ViewSwitchField>
            <Switch
              value={isSwitchOn}
              onValueChange={onToggleSwitch}
              style={{ marginRight: 10 }}
            />
            <S.HeadText
              fontWeight='500'
              size={15}
              align='left'
              style={{ paddingRight: 60 }}
            >
              Li e concordo com os Termos e a{' '}
              <S.HeadText
                fontWeight='bold'
                size={16}
                style={{ textDecorationLine: 'underline' }}
              >
                Política de Privacidade
              </S.HeadText>
              . E eu concordo em consentir que o ADEB colete meus dados.
            </S.HeadText>
          </S.ViewSwitchField>

          <S.SubmitButtonView>
            <Button
              text='Cadastrar'
              mode='contained'
              onPress={onSubmit}
              style={{ width: '100%' }}
              disabled={!isSwitchOn}
            />
          </S.SubmitButtonView>
        </S.FormContainer>
      </AppPage>
    </>
  )
}

export default SignUp
