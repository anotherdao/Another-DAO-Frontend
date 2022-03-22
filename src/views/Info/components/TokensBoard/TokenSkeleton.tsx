import React from 'react'
import { Skeleton } from '@apeswapfinance/uikit'
import { ResponsiveTokensGrid } from '../Tables/TablesAtom'

const arr = [1, 2, 3, 4, 5,6]
const TokenSkeleton = () => {
  return (
    <ResponsiveTokensGrid>
      {arr.map((element) => (
        <Skeleton key={element} />
      ))}
    </ResponsiveTokensGrid>
  )
}

export default TokenSkeleton
