import React from 'react'
import { Card, CardBody, Heading, Text } from '@apeswapfinance/uikit'
import styled from 'styled-components'
import { useFetchHomepageStats, useHomepageStats } from 'state/hooks'
import useI18n from 'hooks/useI18n'
import { BANANA_PER_BLOCK } from 'config'
import CardValue from './CardValue'

const StyledBananaStats = styled(Card)`
  width: 336px;
  height: 203px;
  margin-top: 40px;
  @media screen and (max-width: 350px) {
    width: 320px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    margin-top: 0px;
  }
  @media screen and (min-width: 1375px) {
    margin-top: 40px;
  }
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  padding-bottom: 4px;
  padding-top: 0.5px;
  padding-left: 12px;
  padding-right: 10px;

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-left: 12px;
    padding-right: 10px;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    padding-left: 6px;
    padding-right: 6px;
  }
`
const GreyRow = styled(Row)`
  background: rgb(196, 196, 196, 0.2);
  background:rgb(255,240,241);
`

const StyledCardBody = styled(CardBody)`
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 8px;
  padding-bottom: 15px;
  ${({ theme }) => theme.mediaQueries.xl} {
    padding-left: 10px;
    padding-right: 10px;
  }
`

const StyledText = styled(Text)`
  font-family: Montserrat;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  text-align: left;
  font-weight: 400;
  margin-right: 10px;
  margin-top: 3px;
  color:rgb(120,0,44);
`

const ApeSwapStats = () => {
  useFetchHomepageStats()
  const TranslateString = useI18n()
  const bananaPerBlock = BANANA_PER_BLOCK.toNumber()
  const stats = useHomepageStats()

  return (
    <StyledBananaStats>
      <StyledCardBody>
        <Heading size="lg" mb="8px" textAlign="center" fontFamily="Titan One" color="rgb(120,0,44)" fontWeight={700}>
          {TranslateString(534, 'Winery Stats')}
        </Heading>
        <GreyRow>
          <StyledText fontSize="14px" fontFamily="Montserrat">
            {TranslateString(536, 'TOTAL VALUE LOCKED')}
          </StyledText>
          {stats?.tvl && <CardValue fontSize="14px" value={stats?.tvl} prefix="$" text="Montserrat" fontWeight={700} />}
        </GreyRow>
        <Row>
          <StyledText fontSize="14px" fontFamily="Montserrat">
            {TranslateString(536, 'USD MARKET CAP')}
          </StyledText>
          {stats?.marketCap && (
            <CardValue
              fontSize="14px"
              value={stats?.marketCap}
              decimals={0}
              prefix="$"
              text="Montserrat"
              fontWeight={700}
            />
          )}
        </Row>
        <GreyRow>
          <StyledText fontSize="14px" fontFamily="Montserrat">
            {TranslateString(536, 'WINERY IN CIRCULATION')}
          </StyledText>
          {stats?.circulatingSupply && (
            <CardValue fontSize="14px" value={stats?.circulatingSupply} text="Montserrat" fontWeight={700} />
          )}
        </GreyRow>
        <Row>
          <StyledText fontSize="14px" fontFamily="Montserrat">
            {TranslateString(536, 'GNANA IN CIRCULATION')}
          </StyledText>
          {stats?.gnanaCirculatingSupply && (
            <CardValue
              fontSize="14px"
              value={stats?.gnanaCirculatingSupply}
              decimals={0}
              text="Montserrat"
              fontWeight={700}
            />
          )}
        </Row>
        <GreyRow>
          <StyledText fontSize="14px" fontFamily="Montserrat">
            {TranslateString(538, 'TOTAL BANANA BURNED')}
          </StyledText>
          {stats?.burntAmount && (
            <CardValue fontSize="14px" decimals={0} value={stats?.burntAmount} text="Montserrat" fontWeight={700} />
          )}
        </GreyRow>
        <Row>
          <StyledText fontSize="14px" fontFamily="Montserrat">
            <a href="https://apeswap.gitbook.io/apeswap-finance/product-and-features/tokenomics/banana"  target="_blank" rel="noopener noreferrer">{TranslateString(540, 'DISTRIBUTED BANANA/BLOCK')}</a>
          </StyledText>
          <CardValue fontSize="14px" decimals={0} value={bananaPerBlock} text="Montserrat" fontWeight={900} />
        </Row>
      </StyledCardBody>
    </StyledBananaStats>
  )
}

export default ApeSwapStats
