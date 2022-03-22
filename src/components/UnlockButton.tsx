import React from 'react'
import { GradientButton, useWalletModal } from '@apeswapfinance/uikit'
import useAuth from 'hooks/useAuth'
import { useTranslation } from 'react-i18next'

const UnlockButton = (props) => {
  const { t } = useTranslation()
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)

  return (
    <GradientButton onClick={onPresentConnectModal} height="36px" fontSize="14px" {...props}>
      {t('Connect wallet')}
    </GradientButton>
  )
}

export default UnlockButton
