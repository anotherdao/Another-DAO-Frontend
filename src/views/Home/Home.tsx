import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { CHAIN_ID } from 'config/constants/chains'
import {
  useNetworkChainId,
  useFarms,
  usePriceBananaBusd,
  usePriceBnbBusd,
  usePriceEthBusd,
  usePools,
} from 'state/hooks'
import { useWeb3React } from '@web3-react/core'
import { BLOCKS_PER_YEAR, BANANA_PER_BLOCK, BANANA_POOL_PID } from 'config'
import { QuoteToken } from 'config/constants/types'

import BigNumber from 'bignumber.js'
import HotFarms from './components/HotFarms/HotFarms'
import CoolPools from './components/CoolPools/CoolPools'
import DualHotFarms from './components/DualFarms/DualHotFarms'
import VauluableVaults from './components/ValuableVaults/ValuableVaults'
import UserGrid from './components/UserGrid'
import TradeAnything from './components/TradeAnything'
import PassiveIncome from './components/PassiveIncome'
import TopFarms from './components/TopFarms'
import HomeHero from './components/HomeHero'

export interface GridWidth {
  spanFirst?: number
  spanLast?: number
}

const Page = styled.div`
  min-height: calc(100vh - 64px);
  padding-bottom: 64px;
  background: ${({ theme }) => (theme.isDark ? '#333' : '#fff')};
  width: 100%;
`
const PageContainer = styled.div`
  padding: 2rem 1rem 0;
  ${({ theme }) => theme.mediaQueries.md} {
    padding: 2rem 2rem 0;
  }
`

export const useFarmsApr = (account) => {
  const bananaPrice = usePriceBananaBusd()
  const bnbPrice = usePriceBnbBusd()
  const ethPriceUsd = usePriceEthBusd()

  const farmsLP = useFarms(account)

  const activeFarms = farmsLP.filter((farm) => farm.pid !== 0 && farm.multiplier !== '0X')
  const [farmsApr, setFarmsApr] = useState([])

  useEffect(() => {
    const farmsList = (farmsToDisplay) => {
      const bananaPriceVsBNB = new BigNumber(
        farmsLP.find((farm) => farm.pid === BANANA_POOL_PID)?.tokenPriceVsQuote || 0,
      )
      const farmsToDisplayWithAPR = farmsToDisplay.map((farm) => {
        if (!farm.tokenAmount || !farm.lpTotalInQuoteToken || !farm.lpTotalInQuoteToken) {
          return farm
        }
        const bananaRewardPerBlock = BANANA_PER_BLOCK.times(farm.poolWeight)
        const bananaRewardPerYear = bananaRewardPerBlock.times(BLOCKS_PER_YEAR)

        let apr = bananaPriceVsBNB.times(bananaRewardPerYear).div(farm?.lpTotalInQuoteToken)

        let totalLiquidity: BigNumber
        if (farm.quoteTokenSymbol === QuoteToken.BNB) {
          totalLiquidity = bnbPrice.times(farm?.lpTotalInQuoteToken)
        } else if (farm.quoteTokenSymbol === QuoteToken.BANANA) {
          totalLiquidity = bananaPrice.times(farm?.lpTotalInQuoteToken)
        } else if (farm.quoteTokenSymbol === QuoteToken.ETH) {
          totalLiquidity = ethPriceUsd.times(farm?.lpTotalInQuoteToken)
        } else {
          totalLiquidity = farm?.lpTotalInQuoteToken
        }

        if (farm.quoteTokenSymbol === QuoteToken.BUSD || farm.quoteTokenSymbol === QuoteToken.UST) {
          apr = bananaPriceVsBNB.times(bananaRewardPerYear).div(farm?.lpTotalInQuoteToken).times(bnbPrice)
        } else if (farm.quoteTokenSymbol === QuoteToken.ETH) {
          apr = bananaPrice.div(ethPriceUsd).times(bananaRewardPerYear).div(farm?.lpTotalInQuoteToken)
        } else if (farm.quoteTokenSymbol === QuoteToken.BANANA) {
          apr = bananaRewardPerYear.div(farm?.lpTotalInQuoteToken)
        } else if (farm.dual) {
          const bananaApr =
            farm && bananaPriceVsBNB.times(bananaRewardPerBlock).times(BLOCKS_PER_YEAR).div(farm?.lpTotalInQuoteToken)
          const dualApr =
            farm.tokenPriceVsQuote &&
            new BigNumber(farm.tokenPriceVsQuote)
              .times(farm.dual.rewardPerBlock)
              .times(BLOCKS_PER_YEAR)
              .div(farm.lpTotalInQuoteToken)

          apr = new BigNumber((bananaApr && dualApr && bananaApr.plus(dualApr)).times(100))
        }

        return {
          ...farm,
          apr: apr.times(new BigNumber(100)).toNumber(),
          liquidity: totalLiquidity instanceof BigNumber ? totalLiquidity.toNumber() : totalLiquidity,
        }
      })
      return farmsToDisplayWithAPR
    }
    setFarmsApr(farmsList(activeFarms))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [farmsLP])
  return farmsApr
}

const Home: React.FC = () => {
  const appChainId = useNetworkChainId()
  const { account } = useWeb3React()
  const farmsApr = useFarmsApr(account)
  const poolsApr = usePools(account)
  const renderYieldCards = () => {
    if (appChainId === CHAIN_ID.MATIC || appChainId === CHAIN_ID.MATIC_TESTNET) {
      return (
        <>
          <DualHotFarms />
          <VauluableVaults />
        </>
      )
    }
    return (
      <>
        <HotFarms />
        <CoolPools />
      </>
    )
  }

  return (
    <Page>
      <PageContainer>
        <HomeHero />
      </PageContainer>
      <PageContainer>
        <UserGrid />
      </PageContainer>
      <TradeAnything />
      <PageContainer>
        <PassiveIncome />
      </PageContainer>
      <PageContainer>
        <TopFarms farmsApr={farmsApr} poolsApr={poolsApr} />
      </PageContainer>
    </Page>
  )
}

export default Home
