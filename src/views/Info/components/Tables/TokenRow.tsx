import React from 'react'
import styled from 'styled-components'
import { Flex, Text, useMatchBreakpoints } from '@apeswapfinance/uikit'
import { formatLongNumber } from 'views/Info/config'
import { ResponsiveTokensGrid } from './TablesAtom'
import Percent from '../Percent'

const StyledText = styled(Text)`
  color: inherit;
  transition: 0.1s ease-out;
  font-weight: 500;
`

const RowWrapper = styled.div`
  color: ${({ theme }) => theme.colors.secondary};
  &:hover {
    color: #fff !important;
    background: ${({ theme }) => theme.colors.tertiaryContainer};
  }
`

const StyledImage = styled.img<{ size: string }>`
  width: ${({ size }) => size};
  box-shadow: 0 5px 12px rgba(0, 0, 0, 0.1);
  border-radius: 50%;
`

const TokenLogo = ({ token, size = '24px' }) => {
  const src = `/images/tokens/${token}.svg`
  return <StyledImage src={src} size={size} />
}
const TableRow = ({ index, data }) => {
  const { isXs, isSm } = useMatchBreakpoints()
  return (
    <RowWrapper>
      <ResponsiveTokensGrid>
        <Flex>
          <StyledText>{index}</StyledText>
        </Flex>
        <Flex alignItems="center">
          {/* <ResponsiveLogo address={tokenData.address} /> */}
          <TokenLogo token={data?.symbol} />
          {(isXs || isSm) && <StyledText ml="8px">{data?.symbol}</StyledText>}
          {!isXs && !isSm && (
            <Flex marginLeft="10px">
              <StyledText>{data?.name}</StyledText>
              <StyledText ml="8px">({data?.symbol})</StyledText>
            </Flex>
          )}
        </Flex>
        <StyledText fontWeight={400}>${data?.tokenPrice?.toFixed(3)} </StyledText>
        <StyledText fontWeight={400}>
          <Percent value={data?.priceChange} />
        </StyledText>
        <StyledText fontWeight={400}>{formatLongNumber(data?.volume24h)}</StyledText>
        <StyledText fontWeight={400}>{formatLongNumber(data?.liquidity)}</StyledText>
      </ResponsiveTokensGrid>
    </RowWrapper>
  )
}

export default TableRow
