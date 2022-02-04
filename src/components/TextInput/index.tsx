import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { 
  TextInputProps, 
  StyleProp, 
  TextStyle, 
  KeyboardTypeOptions, 
  ReturnKeyType,
  View 
} from 'react-native'
import { useTheme } from 'styled-components/native'
import { 
  TextInput as Input, 
  DefaultTheme as PaperTheme,
  HelperText  
} from 'react-native-paper'

import { 
  nothingFormatter,
  formatterPhoneNumber,
  formatterDate,
  numberFormatter,
  cpfFormatter
} from '~/utils/format'

interface IInputType {
  name: string
  mask: any
  length: number
  keyboardType: KeyboardTypeOptions
}

export interface ITextInputProps extends TextInputProps {
  ref?: any
  testID?: string
  mode?: 'flat' | 'outlined'
  left?: React.ReactNode
  right?: React.ReactNode
  disabled?: boolean
  label?: string
  placeholder?: string
  hasError?: boolean
  errorDescription?: string
  onChangeText?: (text: string) => void
  selectionColor?: string
  primaryTextInputColor?: string
  underlineColor?: string
  dense?: boolean
  multiline?: boolean
  numberOfLines?: number
  onFocus?: (args: any) => void
  onBlur?: (args: any) => void
  render?: (props: any) => React.ReactNode
  value?: string
  style?: StyleProp<TextStyle>
  name?: string
  loading?: boolean
  prefix?: string
  type?:
    | 'text'
    | 'phone'
    | 'date'
    | 'number'
    | 'cpf'
    | 'password'
    | 'e-mail'
  enableEmojis?: boolean
  rightIcon?: string
  rightIconPress?: () => void
  rightIconColor?: string
  rightButton?: any
  rightButtonPress?: () => void
  rightButtonText?: string
  leftIcon?: string
  leftIconPress?: () => void
  leftIconColor?: string
  description?: string
  maxLength?: number
  enableVisibilityOption?: boolean
  keyboardType?: KeyboardTypeOptions
  valueIsControlled?: boolean
  valueControlled?: string
  returnKeyType?: ReturnKeyType
}

export const TextInput : React.FC<ITextInputProps> = ({
  mode = 'outlined',
  name,
  hasError = false,
  errorDescription = '',
  loading,
  type = 'text',
  prefix,
  placeholder,
  rightIcon,
  rightIconPress,
  rightIconColor,
  rightButton,
  rightButtonPress,
  rightButtonText,
  leftIcon,
  leftIconPress,
  description = '',
  maxLength,
  enableVisibilityOption = false,
  onChangeText,
  keyboardType = 'default',
  enableEmojis = false,
  valueIsControlled = false,
  valueControlled = undefined,
  underlineColor,
  selectionColor,
  primaryTextInputColor,
  leftIconColor,
  returnKeyType = 'done',
  ...props
}):JSX.Element => {
  const theme = useTheme()
  const [textValue, setTextValue] = useState<string>('')
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const [securedVisibilityIcon, setSecuredVisibilityIcon] = useState<boolean>(
    type === 'password'
  )
  const rgFindEmoji = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g

  useEffect(() => {
    if (!valueIsControlled) {
      onChangeText && onChangeText(textValue)
    }
  }, [onChangeText, textValue, valueIsControlled])

  const renderRightIcon = useCallback(() => {
    if (type === 'password' && enableVisibilityOption) {
      return {
        right: (
          <Input.Icon
            name={securedVisibilityIcon ? 'eye-outline' : 'eye-off-outline'}
            size={24}
            color={theme.colors.main}
            style={{
              marginRight: 16,
              marginTop: 16,
            }}
            onPress={() => setSecuredVisibilityIcon(!securedVisibilityIcon)}
          />
        ),
      }
    }

    if (rightIcon) {
      return {
        right: (
          <Input.Icon
            name={rightIcon}
            color={rightIconColor}
            onPress={rightIconPress}
          />
        ),
      }
    }
    return
  }, [
    type,
    enableVisibilityOption,
    rightIcon,
    securedVisibilityIcon,
    theme.colors.main,
    rightIconColor,
    rightIconPress,
  ])

  const renderLeftIcon = useCallback(
    () =>
      leftIcon && {
        left: (
          <Input.Icon
            color={leftIconColor}
            name={leftIcon}
            onPress={leftIconPress}
          />
        ),
      },
    [leftIcon, leftIconPress, leftIconColor]
  )

  const _inputInfo: IInputType[] = [
    {
      name: 'text',
      mask: nothingFormatter,
      length: 200,
      keyboardType: 'default',
    },
    {
      name: 'phone',
      mask: formatterPhoneNumber,
      length: 20,
      keyboardType: 'phone-pad',
    },
    {
      name: 'date',
      mask: formatterDate,
      length: 10,
      keyboardType: 'number-pad',
    },
    {
      name: 'number',
      mask: numberFormatter,
      length: 100,
      keyboardType: 'number-pad',
    },
    {
      name: 'cpf',
      mask: cpfFormatter,
      length: 14,
      keyboardType: 'number-pad',
    },
    {
      name: 'e-mail',
      mask: nothingFormatter,
      length: 40,
      keyboardType: 'email-address',
    },
    {
      name: 'password',
      mask: nothingFormatter,
      length: 20,
      keyboardType: 'default',
    },
  ]

  const inputType: IInputType =
    _inputInfo.find((i) => i.name === type) || _inputInfo[0]

  const inputTheme = {
    ...PaperTheme,
    roundness: 10,
    colors: {
      primary: theme.colors.secondary,
      text: theme.colors.black,
      placeholder: theme.colors.brown,
    },
  }

  const renderInput = useMemo(
    () => (
      <Input
        mode={mode}
        style={{ backgroundColor: 'transparent'}}
        label={name}
        disabled={loading}
        error={hasError}
        value={valueIsControlled ? valueControlled : textValue}
        placeholder={placeholder}
        maxLength={maxLength || inputType.length}
        secureTextEntry={securedVisibilityIcon}
        onChangeText={(text) => {
          const _text = enableEmojis
            ? text
            : String(text).replace(rgFindEmoji, '')
          const textInput = inputType.mask(_text, isDeleting) || ''
          if (valueIsControlled) onChangeText?.(textInput)
          else setTextValue(textInput)
          setIsDeleting(false)
        }}
        keyboardType={inputType?.keyboardType || keyboardType}
        onKeyPress={(event) =>
          setIsDeleting(event.nativeEvent.key === 'Backspace' ? true : false)
        }
        {...renderLeftIcon()}
        {...renderRightIcon()}
        {...props}
        theme={inputTheme}
        selectionColor={selectionColor || theme.colors.black}
        underlineColor={underlineColor || theme.input.underline}
        returnKeyType={returnKeyType}
      />
    ),
    [
      mode,
      name,
      loading,
      hasError,
      valueIsControlled,
      valueControlled,
      textValue,
      placeholder,
      maxLength,
      inputType,
      securedVisibilityIcon,
      keyboardType,
      renderLeftIcon,
      renderRightIcon,
      props,
      inputTheme,
      selectionColor,
      theme.colors.main,
      theme.input.underline,
      underlineColor,
      returnKeyType,
      enableEmojis,
      rgFindEmoji,
      isDeleting,
      onChangeText,
    ]
  )

  const renderError = useMemo(
    () => (
      <HelperText
        type={hasError ? 'error' : 'info'}
        visible={hasError ? hasError : !!description}
        theme={inputTheme}
      >
        {hasError ? errorDescription : description}
      </HelperText>
    ),
    [description, errorDescription, hasError, inputTheme]
  )

  return (
    <>
      <View style={{ position: 'relative' }}>
        {renderInput}
      </View>
      {renderError}
    </>
  )
}