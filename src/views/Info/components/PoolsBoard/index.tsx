import { Text } from '@apeswapfinance/uikit'
import React, { useEffect } from 'react'
import { useFarmsApr } from 'views/Home/Home'
import { useTranslation } from 'react-i18next'
import {
  ClickableColumnHeader,
  TableWrapper,
  LeftArrowIcon,
  RightArrowIcon,
  PaginatingContent,
  PaginatingSection,
  Break,
  ResponsivePoolsGrid,
  SpanButton,
} from '../Tables/TablesAtom'
import PoolRow from '../Tables/PoolRow'
import PoolSkeleton from './PoolSkeleton'

const ROW_PER_PAGE = 5
const arr = [
  {
    id: 1,
    token1: 'WBNB',
    token2: 'WBNB',
    value: 7.93,
  },
  {
    id: 2,
    token1: 'BUSD',
    token2: 'BTC',
    value: -0.05,
  },
  {
    id: 3,
    token1: 'USDT',
    token2: 'BTC',
    value: -0.08,
  },
  {
    id: 4,
    token1: 'USDC',
    token2: 'USDT',
    value: 17.74,
  },
  {
    id: 5,
    token1: 'TOWER',
    token2: 'BTC',
    value: 5.68,
  },
  {
    id: 6,
    token1: 'HERO',
    token2: 'BTC',
    value: -21.32,
  },
  {
    id: 7,
    token1: 'VBSWAP',
    token2: 'BTC',
    value: 5.79,
  },
  {
    id: 8,
    token1: 'WING',
    token2: 'BTC',
    value: 4.12,
  },
  {
    id: 9,
    token1: 'BTC',
    token2: 'USDT',
    value: -4.54,
  },
  {
    id: 10,
    token1: 'CORK',
    token2: 'BTC',
    value: 24,
  },
  {
    id: 11,
    token1: 'CORK',
    token2: 'CORK',
    value: -1124,
  },
]

const sortedPools = (data, sortField, page, sortDirection) => {
  return data
    ? data
        .sort((a, b) => {
          if (a && b) {
            return a[sortField] > b[sortField] ? (sortDirection ? 1 : -1) * 1 : (sortDirection ? 1 : -1) * -1
          }
          return -1
        })
        .slice((page - 1) * ROW_PER_PAGE, (page - 1) * ROW_PER_PAGE + ROW_PER_PAGE)
    : []
}

const SORT_FIELDS = {
  liquidity: 'liquidity',
  apr: 'apr',
  lpsymbol: 'lpSymbol',
  lpreward24: 'lpReward24h',
  volume24: 'volume24h',
  volume7d: 'volume7d',
}

const DESCENDING = true
const ASCENDING = false

const sortArrow = (sortField, currentField, sortDirection) => {
  const arrow = sortDirection ? '↑' : '↓'
  if (sortField === currentField) return arrow
  return ''
}

const PoolsBoard = ({ account, poolsVolume }) => {
  const [[page, maxPage], setPage] = React.useState<number[]>([1, 1])
  const [poolsArr, setPoolsArr] = React.useState([])
  const [sortField, setSortField] = React.useState<string>(SORT_FIELDS.liquidity)
  const [sortDirection, setSortDirection] = React.useState<boolean>(DESCENDING)
  const pools = useFarmsApr(account)

  useEffect(() => {
    //  Show 5 items per page.

    if (pools && poolsVolume.length > 0) {
      const newPools = pools.map((element, index) => {
        const { lpAddresses } = element
        const poolAddress = lpAddresses[97].toLowerCase()
        return {
          ...element,
          volume24h: poolsVolume[index][poolAddress]?.volume24h,
          lpReward24h: poolsVolume[index][poolAddress]?.volume24h * 0.0025,
          volume7d: poolsVolume[index][poolAddress]?.volume7d,
        }
      })
      const newPoolsArr = sortedPools(newPools, sortField, 1, sortDirection)
      setPoolsArr(newPoolsArr)
      setPage([1, Math.ceil(pools.length / ROW_PER_PAGE)])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [poolsVolume, pools])

  useEffect(() => {
    if (pools && poolsVolume.length > 0) {
      const newPools = pools.map((element, index) => {
        const { lpAddresses } = element
        const poolAddress = lpAddresses[97].toLowerCase()
        return {
          ...element,
          volume24h: poolsVolume[index][poolAddress]?.volume24h,
          lpReward24h: poolsVolume[index][poolAddress]?.volume24h * 0.0025,
          volume7d: poolsVolume[index][poolAddress]?.volume7d,
        }
      })

      const newPoolsArr = sortedPools(newPools, sortField, page, sortDirection)

      setPoolsArr(newPoolsArr)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortDirection, sortField])

  const onPoolsSortHandler = React.useCallback(
    (newField) => {
      setSortField(newField)
      if (sortField !== newField) {
        setSortDirection(true)
        return
      }
      setSortDirection((prev) => !prev)
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sortField, sortDirection],
  )

  const onPageStateChangeHandler = (newPage) => {
    const newPoolsArr = sortedPools(pools, sortField, newPage, sortDirection)
    setPage([newPage, maxPage])
    setPoolsArr(newPoolsArr)
  }

  const onPageNextHandler = () => {
    if (page === maxPage) return
    const newPage = page + 1
    onPageStateChangeHandler(newPage)
  }

  const onPagePrevHandler = () => {
    if (page === 1) return
    const newPage = page - 1
    onPageStateChangeHandler(newPage)
  }
 const { t } = useTranslation();

  return (
    <TableWrapper>
      <ResponsivePoolsGrid>
        <Text color="secondary" fontSize="12px" bold>
          #
        </Text>
        <ClickableColumnHeader color="secondary" fontSize="12px" bold textTransform="uppercase">
          <SpanButton onClick={() => onPoolsSortHandler(SORT_FIELDS.lpsymbol)}>
            {t('pool')} {sortArrow(sortField, SORT_FIELDS.lpsymbol, sortDirection)}
          </SpanButton>
        </ClickableColumnHeader>
        <ClickableColumnHeader color="secondary" fontSize="12px" bold textTransform="uppercase">
          <SpanButton onClick={() => onPoolsSortHandler(SORT_FIELDS.volume24)}>
            {t('volume')} 24h {sortArrow(sortField, SORT_FIELDS.volume24, sortDirection)}
          </SpanButton>
        </ClickableColumnHeader>
        <ClickableColumnHeader color="secondary" fontSize="12px" bold textTransform="uppercase">
          <SpanButton onClick={() => onPoolsSortHandler(SORT_FIELDS.volume7d)}>
            {t('volume')} 7d
            {sortArrow(sortField, SORT_FIELDS.volume7d, sortDirection)}
          </SpanButton>
        </ClickableColumnHeader>
        <ClickableColumnHeader color="secondary" fontSize="12px" bold textTransform="uppercase">
          <SpanButton onClick={() => onPoolsSortHandler(SORT_FIELDS.lpreward24)}>
            {t('lp reward fees')} 24h {sortArrow(sortField, SORT_FIELDS.lpreward24, sortDirection)}
          </SpanButton>
        </ClickableColumnHeader>
        <ClickableColumnHeader color="secondary" fontSize="12px" bold textTransform="uppercase">
          <SpanButton onClick={() => onPoolsSortHandler(SORT_FIELDS.apr)}>
            {t('lp reward apr')} {sortArrow(sortField, SORT_FIELDS.apr, sortDirection)}
          </SpanButton>
        </ClickableColumnHeader>
        <ClickableColumnHeader color="secondary" fontSize="12px" bold textTransform="uppercase">
          <SpanButton onClick={() => onPoolsSortHandler(SORT_FIELDS.liquidity)}>
            {t('liquidity')} {sortArrow(sortField, SORT_FIELDS.liquidity, sortDirection)}
          </SpanButton>
        </ClickableColumnHeader>
      </ResponsivePoolsGrid>
      <Break />

      {poolsArr.length > 0 ? (
        poolsArr.map((value, index) => (
          <React.Fragment key={value.pid}>
            <PoolRow index={(page - 1) * ROW_PER_PAGE + index + 1} data={value} />
            <Break />
          </React.Fragment>
        ))
      ) : (
        <PoolSkeleton />
      )}
      <PaginatingSection>
        <LeftArrowIcon width="20px" onClick={onPagePrevHandler} disabled={page <= 1} />

        <PaginatingContent color="textLight" fontWeight={500} mx={3}>
          {t('Page')} {page} {t('of')} {maxPage}
        </PaginatingContent>

        <RightArrowIcon width="20px" onClick={onPageNextHandler} disabled={page >= maxPage} />
      </PaginatingSection>
    </TableWrapper>
  )
}

export default React.memo(PoolsBoard)
