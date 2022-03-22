import { Card, GradientButton, Text, ChevronDownIcon, ChevronUpIcon, Skeleton } from '@apeswapfinance/uikit'
import React, { memo, useState } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import calcPrize from 'utils/calcPrize'
import { usePriceBananaBusd } from 'state/hooks'
import PrizeDetail from './PrizeDetail'

const MainWrapper = styled.div`
  padding: 2rem 0 3rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const TitleContainer = styled.div`
  margin-bottom: 10px;
`

export const MaindCard = styled(Card)`
  width: 600px;

  @media (max-width: 600px) {
    width: 100%;
  }
`

export const RowBetween = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;

  @media (max-width: 500px) {
    padding: 20px 20px;
  }
`

export const RowCenter = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  padding: 20px 40px;
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
`

const StyledChevronDownIcon = styled(ChevronDownIcon)`
  width: 30px;
  height: 30px;
  cursor: pointer;
`

const TextWinery = styled(Text)`
  font-size: 60px;
  font-weight: 700;

  @media (max-width: 600px) {
    font-size: 30px;
  }
`

const TextDrawing = styled(Text)`
  font-size: 50px;
  font-weight: 600;

  @media (max-width: 600px) {
    font-size: 30px;
    font-weight: 700;
  }
`

const TextUntil = styled(TextDrawing)`
  @media (max-width: 600px) {
    font-size: 30px;
    font-weight: 700;
    display: block !important;
  }
`

function getTime(now) {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  return `${monthNames[now.getMonth() + 1]} ${now.getDate()}, ${now.getFullYear()}, ${now.getHours()}:${
    now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes()
  }
               `
}

const RightCard = ({ onOpenBuy, timer, round, dataRoundCurrent, isAbleToMake, isDrawing, nextTimeDraw }) => {
  const bananaPriceUsd = usePriceBananaBusd()
  const bananaPriceUsdDisplay = bananaPriceUsd.toNumber()

  const [isOpenDetail, setOpenDetail] = useState(false)

  const toggleDetail = () => setOpenDetail(!isOpenDetail)

  const isNotDrawing = isAbleToMake
 const { t } = useTranslation();

  return (
    <MainWrapper>
      <TitleContainer>
        <TextWinery color="text">{t('The Winery Lottery')}</TextWinery>
        {isAbleToMake ? (
          <>
            <TextDrawing style={{ display: 'inline-block', marginRight: 10 }} color="primary">
              {!isDrawing && timer.hour.toString() !== '0' && timer.minute.toString() !== '0'
                ? `${timer.hour}h ${timer.minute}m`
                : `${t('Drawing')}...`}
            </TextDrawing>
            <TextUntil style={{ display: !isDrawing ? 'inline-block' : 'none' }} color="text">
              {t('until the draw')}
            </TextUntil>
          </>
        ) : (
          <Skeleton height={24} width="100%" />
        )}
      </TitleContainer>
      <MaindCard>
        <HeaderCard>
          <RowBetween>
            <Text fontWeight={600} fontSize="24px" color="primaryBright">
              {t('Next Draw')}
            </Text>
            {!isAbleToMake ? (
              <Skeleton height={24} width={200} />
            ) : (
              <Text fontWeight={300} fontSize="18px">{`#${round} | ${t('Draw')}: ${getTime(
                new Date(+nextTimeDraw),
              )}`}</Text>
            )}
          </RowBetween>
        </HeaderCard>
        <RowBetween>
          <Text fontWeight={600} fontSize="24px">
            {t('Total')}
          </Text>
          {!isAbleToMake ? (
            <Skeleton height={24} width={200} />
          ) : (
            <>
              {' '}
              <Text fontWeight={700} fontSize="30px" color="primaryBright">
                {`~ $${(bananaPriceUsdDisplay * dataRoundCurrent?.total || 0).toFixed(2)}`}
                <Text fontWeight={400} fontSize="15px" textAlign="right">{`${(dataRoundCurrent?.total || 0)?.toFixed(
                  2,
                )} CORK`}</Text>
              </Text>{' '}
            </>
          )}
        </RowBetween>
        <RowBetween>
          <Text fontWeight={600} fontSize="24px">
            {t('Your Tickets')}
          </Text>
          <GradientButton disabled={!isNotDrawing} onClick={onOpenBuy}>
            {t('Buy Tickets')}
          </GradientButton>
        </RowBetween>
        <PrizeDetail data={calcPrize(dataRoundCurrent)} isOpen={isOpenDetail} />
        <Line />
        <RowCenter onClick={toggleDetail}>
          <Text fontWeight={500} fontSize="18px" color="primary">
            {isOpenDetail ? t('Hide') : t('Details')}
          </Text>
          {isOpenDetail ? <ChevronUpIcon /> : <StyledChevronDownIcon />}
        </RowCenter>
      </MaindCard>
    </MainWrapper>
  )
}

export default memo(RightCard)
