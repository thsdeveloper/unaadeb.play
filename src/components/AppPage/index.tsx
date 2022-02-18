import React, { useEffect, useMemo, useRef, useCallback } from 'react'
import { Appbar } from 'react-native-paper'
import { useTheme } from 'styled-components/native'
import { getStatusBarHeight } from 'react-native-status-bar-height'

import { Snackbar, CustomBackdrop } from '~/components'
import { IButtonProps } from '~/components/Button'
import { ISnackbarProps } from '~/components/Snackbar'
import {
  BottomSheetModal,
  BottomSheetProps,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet'

import * as S from './styles'

interface IheaderProps {
  title: string
  subtitle?: string
  onBackPress?: () => void
  children?: React.ReactNode
}

interface BottomSheetItemProps extends BottomSheetProps {
  visible?: boolean
  onDismiss?: () => void
}

interface FooterButtonProps {
  onPress?: () => void
  buttonProps?: IButtonProps
}
interface IAppPageProps {
  fit?: boolean
  children: React.ReactNode
  scroll?: boolean
  safeArea?: boolean
  loading?: boolean
  header?: IheaderProps
  keyboardAvoidingView?: boolean
  snackbar?: ISnackbarProps
  bottomSheet?: BottomSheetItemProps
  footerButton?: FooterButtonProps
}

export const AppPage: React.FC<IAppPageProps> = ({
  fit = true,
  scroll = false,
  children,
  safeArea,
  loading,
  header,
  keyboardAvoidingView,
  snackbar,
  bottomSheet,
  footerButton,
}) => {
  const theme = useTheme()
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  const statusBarHeight = getStatusBarHeight()

  useEffect(() => {
    if (bottomSheet && bottomSheet?.visible && bottomSheetModalRef?.current) {
      bottomSheetModalRef.current.present()
    }
  }, [bottomSheet, bottomSheetModalRef?.current])

  const renderLoading = () => (
    <S.LoadingContainer>
      <S.LoadingView>
        <S.Loading />
      </S.LoadingView>
    </S.LoadingContainer>
  )

  const renderFooterButton = () => (
    <S.FooterButtonView>
      <S.FooterButton {...footerButton?.buttonProps} />
    </S.FooterButtonView>
  )

  const renderContent = () => (
    <>
      {scroll ? (
        <>
          <S.ScrollContainer>
            <S.Container fit={fit} children={children} />
          </S.ScrollContainer>

          {footerButton && renderFooterButton()}
        </>
      ) : (
        <>
          <S.Container fit={fit} children={children} />
          {footerButton && renderFooterButton()}
        </>
      )}
    </>
  )

  const renderHeader = useMemo(
    () =>
      header && (
        <Appbar.Header
          style={{ backgroundColor: theme.colors.blueLight, paddingBottom: 10 }}
          statusBarHeight={statusBarHeight}
        >
          <Appbar.BackAction onPress={header.onBackPress} />
          <Appbar.Content
            title={header.title}
            subtitle={header?.subtitle}
            titleStyle={{ fontWeight: 'bold', fontSize: 20 }}
          />
          {header?.children}
        </Appbar.Header>
      ),
    [header, theme.colors.blueLight, statusBarHeight],
  )

  const renderBodyContent = useMemo(
    () =>
      safeArea ? (
        <S.SafeAreaView>{renderContent()}</S.SafeAreaView>
      ) : (
        renderContent()
      ),
    [safeArea, renderContent],
  )

  const renderBottomSheet = () =>
    bottomSheet && (
      <BottomSheetModal
        {...bottomSheet}
        ref={bottomSheetModalRef}
        backgroundStyle={{ backgroundColor: theme.colors.light }}
        backdropComponent={CustomBackdrop}
      />
    )

  if (keyboardAvoidingView) {
    return (
      <S.KeyboardView>
        {renderHeader}
        {renderBodyContent}
        {renderBottomSheet()}
        {loading && renderLoading()}
      </S.KeyboardView>
    )
  }

  return (
    <>
      {renderHeader}
      {renderBodyContent}
      {snackbar && <Snackbar {...snackbar} />}
      {renderBottomSheet()}
      {loading && renderLoading()}
    </>
  )
}
