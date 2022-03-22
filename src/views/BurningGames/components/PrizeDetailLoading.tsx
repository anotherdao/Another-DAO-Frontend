import { Card, Text, Skeleton } from '@apeswapfinance/uikit'
import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

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
  background-color: #d8dcd8;
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

const PrizeDetailLoading = () => {
 const { t } = useTranslation();

  return (
    <MiddleCard>
      <RowBetween>
        <ColCenter style={{ flex: 0.5 }}>
          <Text fontWeight={800} fontSize="24px">
            {t('Prize Pot')}
          </Text>
          <Skeleton width={100} height={30} mb={2} />
          <Skeleton width={80} height={40} />
        </ColCenter>
        <Grid style={{ flex: 1, justifyContent: 'space-arround' }}>
          <ColCenter>
            <Text fontWeight={800} fontSize="14px">
              Match 2
            </Text>
            <Skeleton width={100} height={30} mb={2} />
            <Skeleton width={80} height={40} />
          </ColCenter>
          <ColCenter>
            <Text fontWeight={800} fontSize="14px">
              Match 3
            </Text>
            <Skeleton width={100} height={30} mb={2} />
            <Skeleton width={80} height={40} />
          </ColCenter>
          <ColCenter>
            <Text fontWeight={800} fontSize="14px">
              Match All
            </Text>
            <Skeleton width={100} height={30} mb={2} />
            <Skeleton width={80} height={40} />
          </ColCenter>
          <ColCenter>
            <Text fontWeight={800} fontSize="14px">
              Total burn
            </Text>
            <Skeleton width={100} height={30} mb={2} />
            <Skeleton width={80} height={40} />
          </ColCenter>
          <ColCenter>
            <Text fontWeight={800} fontSize="14px">
              Roll over
            </Text>
            <Skeleton width={100} height={30} mb={2} />
            <Skeleton width={80} height={40} />
          </ColCenter>
        </Grid>
      </RowBetween>
    </MiddleCard>
  )
}

export default PrizeDetailLoading
