import React from 'react'
import styled from 'styled-components'
import { Flex, Text, useMatchBreakpoints } from '@apeswapfinance/uikit'
import { formatLongNumber } from 'views/Info/config'
import BigNumber from 'bignumber.js'
import { BASE_EXCHANGE_URL } from 'config'
import { ResponsivePoolsGrid, ResponsiveTokensGrid } from './TablesAtom'

const StyledText = styled(Text)`
  color: inherit;
  transition: 0.1s ease-out;
  font-weight: 500;
`

const RowWrapper = styled.div`
  color: ${({ theme }) => theme.colors.secondary};
  cursor: pointer;
  &:hover {
    color: #fff !important;
    background: ${({ theme }) => theme.colors.tertiary};
  }
`

const StyledImage = styled.img<{ size: string }>`
  width: ${({ size }) => size};
  box-shadow: 0 5px 12px rgba(0, 0, 0, 0.1);
  border-radius: 50%;
`

const TokenLogo = ({ token, size = '24px', ...rest }) => {
  const src = `/images/tokens/${token}.svg`
  return <StyledImage src={src} size={size} {...rest} />
}

const TableRow = ({ index, data }) => {
  const { isXs, isSm } = useMatchBreakpoints()
  const { tokenAddresses, quoteTokenAdresses } = data
  return (
    <RowWrapper as="a" href={`${BASE_EXCHANGE_URL}/trade/add/${tokenAddresses[97]}/${quoteTokenAdresses[97]}`}>
      <ResponsivePoolsGrid>
        <Flex>
          <StyledText>{index}</StyledText>
        </Flex>
        <Flex alignItems="center">
          <TokenLogo token={data?.tokenSymbol} size="20px" />
          <TokenLogo token={data?.quoteTokenSymbol} size="20px" />
          {(isXs || isSm) && (
            <StyledText ml="8px" fontSize="14px">
              {data?.tokenSymbol}/{data?.quoteTokenSymbol}
            </StyledText>
          )}
          {!isXs && !isSm && (
            <Flex marginLeft="10px">
              {/* <StyledText>Wrapped BNB</StyledText> */}
              <StyledText>
                {data?.tokenSymbol}/{data?.quoteTokenSymbol}
              </StyledText>
            </Flex>
          )}
        </Flex>
        <StyledText fontWeight={400}>{formatLongNumber(data?.volume24h)}</StyledText>
        <StyledText fontWeight={400}>{formatLongNumber(data?.volume7d)}</StyledText>
        <StyledText fontWeight={400}>
          {data?.lpReward24h < 10 ** -5 ? '$0' : formatLongNumber(data?.lpReward24h)}
        </StyledText>

        <StyledText fontWeight={400}>{data?.apr?.toLocaleString().slice(0, -1)}%</StyledText>
        <StyledText fontWeight={400}>{formatLongNumber(data.liquidity)}</StyledText>
      </ResponsivePoolsGrid>
    </RowWrapper>
  )
}

export default React.memo(TableRow)
