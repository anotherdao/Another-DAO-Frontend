import { Card, Text } from '@apeswapfinance/uikit'
import React, { memo } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { usePriceBananaBusd } from 'state/hooks'

export const TitleContainer = styled.div`
  margin-bottom: 10px;
`

export const MaindCard = styled(Card)`
  width: 600px;
  margin-bottom: 20px;
`

export const RowBetween = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 20px 15px;
`

export const RowCenter = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  padding: 20px 40px;
  justify-content: center;
  cursor: pointer;

  @media (max-width: 500px) {
    padding: 20px;
  }
`

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  //   padding: 20px 40px;
  justify-content: center;
  cursor: pointer;
`

export const HeaderCard = styled.div`
  background-color: ${({ theme }) => (theme.isDark ? theme.colors.tertiary : '#d8dcd8')};
`

export const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.theme.colors.primary};
  margin: 0px 0px 0px;
`

const MiddleCard = styled.div`
  background-color: #eef2ed7a;

  //${(props) => props.theme.colors.textSubtle};
`
const ColCenter = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  text-align: center;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  row-gap: 20px;
  column-gap: 20px;
`

const PrizeDetail = ({ isOpen, data }) => {
  const { total = 0, matchFirstTwo = 0, matchFirstThree = 0, matchAll = 0, rollOver = 0, burn = 0 } = data

  const bananaPriceUsd = usePriceBananaBusd()
  const bananaPriceUsdDisplay = bananaPriceUsd.toNumber()

  const getData = () => {
    return {
      total: {
        coin: handleRoundNum(total),
        usd: transToUsd(total),
      },
      matchFirstTwo: {
        coin: handleRoundNum(matchFirstTwo),
        usd: transToUsd(matchFirstTwo),
      },
      matchFirstThree: {
        coin: handleRoundNum(matchFirstThree),
        usd: transToUsd(matchFirstThree),
      },
      matchAll: {
        coin: handleRoundNum(matchAll),
        usd: transToUsd(matchAll),
      },
      rollOver: {
        coin: handleRoundNum(rollOver),
        usd: transToUsd(rollOver),
      },
      burn: {
        coin: handleRoundNum(burn),
        usd: transToUsd(burn),
      },
    }
  }

  const handleRoundNum = (num) => num.toFixed(2)
  const transToUsd = (num) => (num * bananaPriceUsdDisplay).toFixed(2)
 const { t } = useTranslation();

  return isOpen ? (
    <MiddleCard>
      <RowBetween>
        <ColCenter style={{ flex: 0.5 }}>
          <Text fontWeight={800} fontSize="24px">
            {t('Prize Pot')}
          </Text>
          <Text fontWeight={500}>{`~$${getData()?.total?.usd}`}</Text>
          <Text fontWeight={800} fontSize="18px" color="primary">{`${getData()?.total?.coin} CORK`}</Text>
        </ColCenter>
        <Grid style={{ flex: 1, justifyContent: 'space-arround' }}>
          <ColCenter>
            <Text fontWeight={800} fontSize="14px">
              {t('Match First', { val: 2 })}
            </Text>
            <Text fontWeight={800} fontSize="18px" color="primary">{`${getData()?.matchFirstTwo?.coin} CORK`}</Text>
            <Text fontWeight={500}>{`$${getData()?.matchFirstTwo?.usd}`}</Text>
          </ColCenter>
          <ColCenter>
            <Text fontWeight={800} fontSize="14px">
              {t('Match First', { val: 3 })}
            </Text>
            <Text fontWeight={800} fontSize="18px" color="primary">{`${getData()?.matchFirstThree?.coin} CORK`}</Text>
            <Text fontWeight={500}>{`$${getData().matchFirstThree?.usd}`}</Text>
          </ColCenter>
          <ColCenter>
            <Text fontWeight={800} fontSize="14px">
              {t('Match All')}
            </Text>
            <Text fontWeight={800} fontSize="18px" color="primary">{`${getData()?.matchAll?.coin} CORK`}</Text>
            <Text fontWeight={500}>{`$${getData()?.matchAll?.usd}`}</Text>
          </ColCenter>
          <ColCenter>
            <Text fontWeight={800} fontSize="14px">
              {t('Total burn')}
            </Text>
            <Text fontWeight={800} fontSize="18px" color="primary">{`${getData()?.burn?.coin} CORK`}</Text>
            <Text fontWeight={500}>{`$${getData()?.burn?.usd}`}</Text>
          </ColCenter>
          <ColCenter>
            <Text fontWeight={800} fontSize="14px">
              {t('Roll over')}
            </Text>
            <Text fontWeight={800} fontSize="18px" color="primary">{`${getData()?.rollOver?.coin} CORK`}</Text>
            <Text fontWeight={500}>{`$${getData()?.rollOver?.usd}`}</Text>
          </ColCenter>
        </Grid>
      </RowBetween>
    </MiddleCard>
  ) : (
    <></>
  )
}

export default memo(PrizeDetail)
