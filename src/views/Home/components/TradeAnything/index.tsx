import React from 'react'
import styled from 'styled-components'
import { Text, Flex, Button } from '@apeswapfinance/uikit'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { BASE_ADD_LIQUIDITY_URL } from 'config'

const TradeWrapper = styled.div`
  width: 100%;
  padding: 2rem;
  margin-bottom: 2rem;
  background: ${({ theme }) => theme.isDark ? theme.colors.tertiary : theme.colors.primaryBright};
  transition: background 0.1s ease-in-out;
  position: relative;
  ${({ theme }) => theme.mediaQueries.md} {
    padding: 2rem 8rem 4rem;
  }
`
const StyledImg = styled.img`
  position: absolute;
  left: 3rem;
  top: 50%;
  transform: translateY(-50%);
  display: none;
  ${({ theme }) => theme.mediaQueries.lg} {
    display: block;
  }
`

const ContentWrapper = styled.div`
  color: #fff;
  display: flex;
  justify-content: end;
  align-items: center;
`

export const HeadingText = styled(Text)`
  line-height: 64px;
  margin-bottom: 24px;
  font-size: 36px;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 50px;
  }
`

const SubTitle = styled(Text)`
  font-size: 22px;
  text-align:center;
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: ${({ fontSize }) => fontSize};
  }
`

const ContentWrap = styled.div`
  ${({theme}) => theme.mediaQueries.md} {
    max-width: 600px;
  }
`

export const ButtonFlexWrapper = styled(Flex)`
  & > * + * {
    margin-left: 1.5rem;
  }
`
const OutlineButton = styled(Button)`
  text-transform: uppercase;
  font-weight: 600;
  border: 1px solid #fff;
  color: #fff;
  transition: 0.2s ease-out;
  background: transparent;
  padding: 0 24px;
  height: 48px;
  display: flex;
  align-items: center;
  border-radius: 10px;
  &:hover {
    background: #fff !important;
    color: ${({ theme }) => theme.colors.primaryBright};
  }
  &:focus:not(:active) {
    box-shadow: none;
  }
  font-size: 16px;
`

const TradeAnything = () => {
  const { t } = useTranslation()
  return (
    <TradeWrapper>
      <ContentWrapper>
        <StyledImg src="/images/home/barrels.png" />
        <ContentWrap>
          <Flex flexWrap="wrap" mb="30px">
            <HeadingText textAlign="right" color="#fff" bold>
              {t('Trade Anything')}
            </HeadingText>
            <Flex justifyContent="space-between" flex={1}>
              <SubTitle color="#fff" fontSize="36px" fontWeight={600}>
                {t('No register')}
              </SubTitle>
              <SubTitle color="#fff" fontSize="36px" fontWeight={600}>
                {t('No hassle')}
              </SubTitle>
            </Flex>
          </Flex>
          <Text mb="24px" textAlign="right" color="#fff" fontWeight={400}>
            {t(
              'Wineryswap offers a full suite of tools for users and partners to take advantage of decentralized finance opportunities.',
            )}
          </Text>
          <ButtonFlexWrapper justifyContent="end">
            <OutlineButton
              as="a"
              href="https://winery.gitbook.io/internal-wiki/product-information/trade"
              target="_blank"
            >
              {t('learn')}
            </OutlineButton>
            <OutlineButton as="a" href={BASE_ADD_LIQUIDITY_URL}>
              {t('trade now')}
            </OutlineButton>
          </ButtonFlexWrapper>
        </ContentWrap>
      </ContentWrapper>
    </TradeWrapper>
  )
}

export default TradeAnything
