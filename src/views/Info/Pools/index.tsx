import { useWeb3React } from '@web3-react/core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import PoolsBoard from '../components/PoolsBoard'
import { TitleText } from '../components/TokensBoard'
import useBoard from '../components/useBoard'
import { isLocal } from '../Overview'

const PageWrapper = styled.div`
  padding: 2rem 4rem;
`
const AllPools = () => {
  const { account } = useWeb3React()
  const { poolsVolume } = useBoard(isLocal())
 const { t } = useTranslation();

  return (
    <PageWrapper>
      <TitleText>{t('All Pools')} </TitleText>
      <PoolsBoard account={account} poolsVolume={poolsVolume} />
    </PageWrapper>
  )
}

export default AllPools
