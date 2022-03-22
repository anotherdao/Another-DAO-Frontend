import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import { Button, GradientButton, Text, useWalletModal } from '@apeswapfinance/uikit'
import { useWeb3React } from '@web3-react/core'
import { Link } from 'react-router-dom'
import useAuth from 'hooks/useAuth'
import { BASE_ADD_LIQUIDITY_URL } from 'config'

const HomeWelcomeBg = styled.div`
  width: 100%;
  background: url('images/home/home-welcome.png') center no-repeat;
  background-size: cover;
  padding-left: 2rem;
  padding-top: 38px;
  padding-bottom: 60px;
  position: relative;
  border-radius: 30px;
  ${({ theme }) => theme.mediaQueries.md} {
    padding-left: 60px;
  }
`

const HomeWelcomeContent = styled.div`
  max-width: 486px;
`

export const TitleText = styled(Text)`
  line-height: 70px;
  margin-bottom: 20px;
  font-size: 40px;
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: ${({ fontSize }) => fontSize};
  }
`

const ContentText = styled(Text)`
  font-size: 12px;
`

const HomeWelcomeBtn = styled.div`
  display: flex;
  & > * + * {
    margin-left: 20px;
  }
`

const StyledImg = styled.img`
  position: absolute;
  right: 0;
  top: -20px;
  width: 50%;
  display: none;

  ${({ theme }) => theme.mediaQueries.md} {
    width: 574px;
    height: 100%;
    display: block;
  }
`

const StyledOutlineButton = styled(Button)`
  text-transform: uppercase;
  font-weight: 500;
  border: 1px solid ${({ theme }) => theme.colors.primaryBright};
  transition: 0.2s ease-out;
  background: transparent;
  padding: 0 24px;
  height: 48px;
  display: flex;
  align-items: center;
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.primaryBright};
  &:hover {
    background-image: ${({ theme }) => theme.colors.gradients.ltr};
    color: white;
  }
  &:focus:not(:active) {
    box-shadow: none;
  }
  font-size: 16px;
`

const A = styled.a`
  display: flex;
  width: 100%;
  height: 100%;
`
const HomeHero = () => {
  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)
  const { account } = useWeb3React()
  const { t } = useTranslation()
  return (
    <HomeWelcomeBg>
      <HomeWelcomeContent>
        <TitleText fontSize="64px" bold color="primary">
          {t('Wanna have a drink')}
        </TitleText>
        <Text fontWeight={500} mb="2rem">
          {t('Trade, earn, and win crypto on the most popular decentralized platform in the galaxy')}
        </Text>
        <HomeWelcomeBtn>
          <StyledOutlineButton as="a" href={BASE_ADD_LIQUIDITY_URL}>
            {t('trade now')}
          </StyledOutlineButton>

          {/* Button to open modal */}
          {!account && (
            <GradientButton size="sm" onClick={onPresentConnectModal}>
              {t('Connect wallet')}
            </GradientButton>
          )}
        </HomeWelcomeBtn>
        <StyledImg src="images/home/cat.svg" />
      </HomeWelcomeContent>
    </HomeWelcomeBg>
  )
}

export default HomeHero
