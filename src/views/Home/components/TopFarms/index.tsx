import React from 'react'
import { SwapVertIcon, Text, ApeSwapRoundIcon, IconButton } from '@apeswapfinance/uikit'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { orderBy } from 'lodash'
import { FarmWithStakedValue } from 'views/Farms/components/FarmCard/FarmCard'
import { Pool } from 'state/types'

const testArr = [1, 2, 3, 4, 5]
const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 4rem;
`

const TitleTopFarms = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100%);
  padding-bottom: 2rem;
  ${({ theme }) => theme.mediaQueries.md} {
    width: calc(100% / 6);
    border-right: 2px solid ${({ theme }) => theme.colors.textSubtle};
    padding: 0;
    justify-content: start;
  }
`

const FarmsPriceWrapper = styled.div`
  width: calc(100%);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.mediaQueries.md} {
    width: calc(100% / 6 * 5);
    justify-content: start;
  }
`

const FarmsPrice = styled.div`
  padding: 0 1rem;
  text-align: center;
  width: calc(100% / 3);
  &:last-child {
    border: none;
  }
  &:nth-child(3) {
    border: none;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    margin-bottom: 0;
    width: calc(100% / 5);
    padding: 0 2rem;
    &:nth-child(3) {
      border-right: 2px solid ${({ theme }) => theme.colors.textSubtle};
    }
  }
  border-right: 2px solid ${({ theme }) => theme.colors.textSubtle};
  margin-bottom: 2rem;
`

const StyledSwapIcon = styled(IconButton)`
  background: transparent;
  box-shadow: none;
  border-radius: 50%;
  &:hover {
    background: ${({ theme }) => theme.colors.textSubtle} !important;
  }
  &:focus:not(:active) {
    box-shadow: none;
  }
`

const sortFarms = (farms, sortDirection) => {
  return orderBy(
    farms,
    (farm: FarmWithStakedValue) => {
      return farm?.apr
    },
    sortDirection,
  )
}

const sortPools = (pools, sortDirection) => {
  return orderBy(pools, (pool: Pool) => pool?.apr, sortDirection)
}

const OAK = true
const CHAMPAGNE = false

const TopFarms = ({ farmsApr, poolsApr }) => {
  const [earnGrid, setEarnGrid] = React.useState(OAK)
  const onEarnGridChangeHandler = () => {
    setEarnGrid((prev) => !prev)
  }

  return (
    <Wrapper>
      <TitleTopFarms>
        <ApeSwapRoundIcon width="28px" />
        <Text color="textLight" mx="0.5rem" fontWeight={500}>
          Top {earnGrid === OAK ? 'OAK Barrel' : 'Champagne'}
        </Text>
        <StyledSwapIcon onClick={onEarnGridChangeHandler}>
          <SwapVertIcon />
        </StyledSwapIcon>
      </TitleTopFarms>
      <FarmsPriceWrapper>
        {(earnGrid === OAK &&
          sortFarms(farmsApr, 'desc').map((farm) => (
            <FarmsPrice key={farm.pid}>
              <Text color="primaryBright" fontWeight={600} mb="0.5rem">
                {farm?.lpSymbol}
              </Text>
              <Text color="textLight" fontWeight={600}>
                {farm?.apr?.toLocaleString().slice(0, -1)}%
              </Text>
              <Text color="textLight" fontWeight={600}>
                APR
              </Text>
            </FarmsPrice>
          ))) ||
          (earnGrid === CHAMPAGNE &&
            sortPools(poolsApr, 'desc').map((pool) => (
              <FarmsPrice key={pool.apr}>
                <Text color="primaryBright" fontWeight={600} mb="0.5rem">
                  {pool?.tokenName}
                </Text>
                <Text color="textLight" fontWeight={600}>
                  {Math.round(pool?.apr * 100) / 100}%
                </Text>
                <Text color="textLight" fontWeight={600}>
                  APR
                </Text>
              </FarmsPrice>
            )))}
      </FarmsPriceWrapper>
    </Wrapper>
  )
}

export default TopFarms
