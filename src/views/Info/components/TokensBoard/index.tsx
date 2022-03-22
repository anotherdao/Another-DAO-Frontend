import { Card, IconButton, Skeleton, Text } from '@apeswapfinance/uikit'
import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import {
  ClickableColumnHeader,
  SpanButton,
  TableWrapper,
  LeftArrowIcon,
  RightArrowIcon,
  PaginatingContent,
  PaginatingSection,
  Break,
  ResponsiveTokensGrid,
} from '../Tables/TablesAtom'
import TokenRow from '../Tables/TokenRow'
import TokenSkeleton from './TokenSkeleton'

const ROW_PER_PAGE = 5

export const TitleText = styled(Text)`
  color: ${({ theme, color }) => color ?? theme.colors.text};
  font-weight: 700;
  font-size: ${({ fontSize }) => fontSize ?? '32px'};
  margin-bottom: 1rem;
  text-transform: capitalize;
`

const arr = [
  {
    id: 1,
    tokenName: 'WBNB',
    priceChange: 7.93,
  },
  {
    id: 2,
    tokenName: 'BUSD',
    priceChange: -0.05,
  },
  {
    id: 3,
    tokenName: 'USDT',
    priceChange: -0.08,
  },
  {
    id: 4,
    tokenName: 'USDC',
    priceChange: 17.74,
  },
  {
    id: 5,
    tokenName: 'TOWER',
    priceChange: 5.68,
  },
  {
    id: 6,
    tokenName: 'HERO',
    priceChange: -21.32,
  },
  {
    id: 7,
    tokenName: 'VBSWAP',
    priceChange: 5.79,
  },
  {
    id: 8,
    tokenName: 'WING',
    priceChange: 4.12,
  },
  {
    id: 9,
    tokenName: 'BTC',
    priceChange: -4.54,
  },
  {
    id: 10,
    tokenName: 'CORK',
    priceChange: 24,
  },
  {
    id: 11,
    tokenName: 'ETH',
    priceChange: -1224,
  },
]

const sortedTokens = (data, sortField, page, sortDirection) => {
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
  volume24: 'volume24h',
  symbol: 'symbol',
  price: 'tokenPrice',
  name: 'name',
}

const DESCENDING = true
const ASCENDING = false

const sortArrow = (sortField, currentField, sortDirection) => {
  const arrow = sortDirection ? '↑' : '↓'
  if (sortField === currentField) return arrow
  return ''
}

const TokensBoard = ({ tokens }) => {
  const [[page, maxPage], setPage] = React.useState<number[]>([1, 1])
  const [tokensArr, setTokensArr] = React.useState([])
  const [sortField, setSortField] = React.useState<string>(SORT_FIELDS.volume24)
  const [sortDirection, setSortDirection] = React.useState<boolean>(DESCENDING)

  React.useEffect(() => {
    //  Default: tokens' volume24h descendant
    //  Show 5 items per page.
    if (tokens) {
      const newTokensArr = sortedTokens(tokens.slice(0, 20), sortField, 1, sortDirection)
      setTokensArr(newTokensArr)
      setPage([1, Math.ceil(tokens.slice(0, 20).length / ROW_PER_PAGE)])
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokens])

  React.useEffect(() => {
    if (tokens) {
      const newTokensArr = sortedTokens(tokens.slice(0, 20), sortField, page, sortDirection)
      setTokensArr(newTokensArr)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortDirection, sortField, tokens])

  const onTokensSortHandler = React.useCallback(
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
    const newTokensArr = sortedTokens(tokens.slice(0, 20), sortField, newPage, sortDirection)
    setPage([newPage, maxPage])
    setTokensArr(newTokensArr)
  }
  const onPageNextHandler = () => {
    if (page >= maxPage) return
    const newPage = page + 1
    onPageStateChangeHandler(newPage)
  }
  const onPagePrevHandler = () => {
    if (page <= 1) return
    const newPage = page - 1
    onPageStateChangeHandler(newPage)
  }
  const { t } = useTranslation();

  return (
    <TableWrapper>
      <ResponsiveTokensGrid>
        <Text color="secondary" fontSize="12px" bold>
          #
        </Text>
        <ClickableColumnHeader color="secondary" fontSize="12px" bold textTransform="uppercase">
          <SpanButton onClick={() => onTokensSortHandler(SORT_FIELDS.name)}>
            {t('name')} {sortArrow(sortField, SORT_FIELDS.name, sortDirection)}
          </SpanButton>
        </ClickableColumnHeader>
        <ClickableColumnHeader color="secondary" fontSize="12px" bold textTransform="uppercase">
          <SpanButton onClick={() => onTokensSortHandler(SORT_FIELDS.price)}>
            {t('price')} {sortArrow(sortField, SORT_FIELDS.price, sortDirection)}
          </SpanButton>
        </ClickableColumnHeader>
        <ClickableColumnHeader color="secondary" fontSize="12px" bold textTransform="uppercase">
          {t('price change')}
        </ClickableColumnHeader>
        <ClickableColumnHeader color="secondary" fontSize="12px" bold textTransform="uppercase">
          <SpanButton onClick={() => onTokensSortHandler(SORT_FIELDS.volume24)}>
            {t('volume')} 24H
            {sortArrow(sortField, SORT_FIELDS.volume24, sortDirection)}
          </SpanButton>
        </ClickableColumnHeader>
        <ClickableColumnHeader color="secondary" fontSize="12px" bold textTransform="uppercase">
          <SpanButton onClick={() => onTokensSortHandler(SORT_FIELDS.liquidity)}>
            {t('liquidity')} {sortArrow(sortField, SORT_FIELDS.liquidity, sortDirection)}
          </SpanButton>
        </ClickableColumnHeader>
      </ResponsiveTokensGrid>
      <Break />

      {tokensArr.length > 0 ? (
        tokensArr?.map((value, index) => (
          <React.Fragment key={value.symbol}>
            <TokenRow index={(page - 1) * ROW_PER_PAGE + index + 1} data={value} />
            <Break />
          </React.Fragment>
        ))
      ) : (
        <>
          <TokenSkeleton />
          <TokenSkeleton />
        </>
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

export default React.memo(TokensBoard)
