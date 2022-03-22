import {
  Card,
  ArrowBackIcon,
  ArrowForwardIcon,
  Text,
  ChevronDownIcon,
  ChevronUpIcon,
  Skeleton,
} from '@apeswapfinance/uikit'
import React, { memo, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import WinningNumbers from './WinningNumbers'
import HistoryDetail from './HistoryDetail'

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
  margin-bottom: 20px;

  @media (max-width: 600px) {
    max-width: 100%;
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
    padding: 20px;
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

const StyledChevronDownIcon = styled(ChevronDownIcon)`
  width: 30px;
  height: 30px;
  cursor: pointer;
`

const RoundNum = styled(Text)`
  background-color: gray;
  border-radius: 15px;
  padding: 0 10px;
  margin-left: 10px;
`

const RowWinningNum = styled(RowBetween)`
  @media (max-width: 500px) {
    justify-content: center;
  }
`

const YourHistory = ({ currentRow, onChangeRound, data, winningNumber, isLoading, onClaim, isClaiming, isHidden }) => {
  const [round, setRound] = useState(0)
  const [isOpenDetail, setOpenDetail] = useState(true)

  useEffect(() => {
    if (!isHidden && round !== 0) {
      onChangeRound(round)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHidden])

  const toggleDetail = () => setOpenDetail(!isOpenDetail)

  useEffect(() => {
    if (currentRow - 1 >= 1) {
      setRound(currentRow - 1)
    } else if (currentRow === 1) {
      onChangeRound(round)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRow])

  const goToPreRound = async () => {
    if (round >= 1) {
      setRound(round - 1)
      await onChangeRound(round - 1)
    }
  }

  const goToNextRound = async () => {
    if (round < currentRow - 1) {
      setRound(round + 1)
      await onChangeRound(round + 1)
    }
  }

  const handleClaim = (tokenId, index) => {
    onClaim(tokenId, index)
  }
 const { t } = useTranslation();

  return (
    <MainWrapper style={{ display: isHidden ? 'none' : 'flex' }}>
      <MaindCard>
        <HeaderCard>
          <RowBetween>
            <Row>
              <Text fontWeight={800} fontSize="20px" color="primaryBright">
                {t('Round')}
              </Text>
              <RoundNum style={{ backgroundColor: 'gray' }}>
                <Text fontWeight={600} fontSize="24px" color="white">
                  {round + 1}
                </Text>
              </RoundNum>
            </Row>
            <Row>
              <ArrowBackIcon onClick={goToPreRound} width={24} color={round > 0 ? 'text' : 'gray'} />
              <ArrowForwardIcon
                onClick={goToNextRound}
                color={round < currentRow - 1 ? 'text' : 'gray'}
                width={24}
                style={{ marginLeft: 15 }}
              />
            </Row>
          </RowBetween>
        </HeaderCard>
        {round >= 0 ? (
          <>
            {round === currentRow - 1 ? (
              <RowWinningNum>
                <Text fontWeight={600} fontSize="25px" color="primary">
                  {t('Wait to draw')}
                </Text>
                <WinningNumbers size="60px" fontSize="30px" number="????" isLoading={isLoading} />
              </RowWinningNum>
            ) : (
              <>
                <RowWinningNum>
                  <Text fontWeight={600} fontSize="25px" color="primary">
                    {t('Winning numbers')}
                  </Text>
                  <WinningNumbers size="60px" fontSize="30px" number={winningNumber} isLoading={isLoading} />
                </RowWinningNum>
              </>
            )}

            {isOpenDetail &&
              (isLoading ? (
                <Skeleton width={10000} height={100} my="2px" />
              ) : (
                <HistoryDetail
                  data={data}
                  isOpen={isOpenDetail}
                  winningNumber={winningNumber}
                  onClaim={handleClaim}
                  isClaiming={isClaiming}
                />
              ))}
            <Line />
            <RowCenter onClick={toggleDetail}>
              <Text fontWeight={500} fontSize="18px" color="primary">
                {isOpenDetail ? t('Hide') : t('Details')}
              </Text>
              {isOpenDetail ? <ChevronUpIcon /> : <StyledChevronDownIcon />}
            </RowCenter>
          </>
        ) : (
          <RowBetween>
            <Text fontWeight={600} fontSize="25px" color="primary">
              {t('No data')}
            </Text>
          </RowBetween>
        )}
      </MaindCard>
    </MainWrapper>
  )
}

export default memo(YourHistory)
