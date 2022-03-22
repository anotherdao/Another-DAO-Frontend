import React from 'react'
import { Skeleton } from '@apeswapfinance/uikit'
import { ResponsivePoolsGrid } from '../Tables/TablesAtom'

const arr = [1, 2, 3, 4, 5, 6, 7]
const Poolskeleton = () => {
  return (
    <ResponsivePoolsGrid>
      {arr.map((element) => (
        <Skeleton key={element} />
      ))}
    </ResponsivePoolsGrid>
  )
}

export default Poolskeleton
