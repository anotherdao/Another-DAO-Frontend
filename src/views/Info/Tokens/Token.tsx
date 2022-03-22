import React from 'react'
import { Card, Flex, Text } from '@apeswapfinance/uikit'
import styled from 'styled-components'

const MainWrapper = styled.div`
  --gap: 2rem;
  max-width: 1440px;
  margin: 0 auto;
  padding: 2rem;
  padding-bottom: 5rem;
  ${({ theme }) => theme.mediaQueries.md} {
    padding-top: 2rem;
  }
`

const FlexWrapper = styled(Flex)`
  margin: 0;
  ${({ theme }) => theme.mediaQueries.md} {
    margin: 0 calc(var(--gap) * -1);
  }
`

const InforWrapper = styled.div`
  height: 500px;
  margin-bottom: var(--gap);
  width: 100%;
  ${({ theme }) => theme.mediaQueries.md} {
    padding: 0 var(--gap);
    :first-child {
      width: 30%;
    }
    :last-child {
      width: 70%;
    }
  }
`

const TokenInfor = styled(Card)`
  width: 100%;
  padding: 2rem;
  height: 500px;
  border: 1px solid ${({ theme }) => theme.colors.textSubtle};
`

const TokenCharts = styled(Card)`
  width: 100%;
  padding: 2rem;
  height: 500px;
  border: 1px solid ${({ theme }) => theme.colors.textSubtle};
`

const StyledText = styled(Text)``

const Token = ({ address }) => {
  return (
    <MainWrapper>
      <FlexWrapper flexWrap="wrap">
        <InforWrapper>
          <TokenInfor>
            <StyledText fontSize="24px" bold>Liquidity</StyledText>
            <StyledText fontSize="24px" bold>Liquidity</StyledText>
            <StyledText fontSize="24px" bold>Liquidity</StyledText>
            <StyledText fontSize="24px" bold>Liquidity</StyledText>
          </TokenInfor>
        </InforWrapper>
        <InforWrapper>
          <TokenCharts>asdsadasdsa</TokenCharts>
        </InforWrapper>
      </FlexWrapper>
    </MainWrapper>
  )
}

export default Token
