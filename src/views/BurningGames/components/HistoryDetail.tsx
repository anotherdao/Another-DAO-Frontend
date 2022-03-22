import { Card, Text, GradientButton } from '@apeswapfinance/uikit'
import React, { memo } from 'react'
import styled, { keyframes } from 'styled-components'
import { useTranslation } from 'react-i18next'
import { usePriceBananaBusd } from 'state/hooks'

const scaleAnimate = keyframes`
  0% {
    transform: scale(1.2);
  }

  50% {
    transform:scale(1.1);
  }

  100% {
    transform:scale(1.2);
  }
`

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
  padding: 20px;
`

const RowTicket = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.colors.textSubtle};
  margin: 5px 0;
`
const WrapTicket = styled.div`
  margin: 30px 0;
`

const TextTicket = styled(Text)<{ isHighLight?: boolean }>`
  font-size: 18px;
  font-weight: ${(props) => (props.isHighLight ? '800' : '600')};
  transform: scale(${(props) => (props.isHighLight ? 1.2 : 1)});

  color: ${(props) => (props.isHighLight ? props.theme.colors.primaryBright : props.theme.colors.textLight)};
`

const WinButton = styled(GradientButton)`
  text-transform: uppercase;
  transition: 0.2s ease-out;
  font-size: 12px;
  //   background-image: linear-gradient(90deg, #ff9f0e, #7a002c);
  animation: ${scaleAnimate} 1.2s linear infinite;
  //   width: 60px;
  height: 25px;
  margin-left: 30px;
  &:hover {
    background-image: linear-gradient(90deg, #f71744, #7a002c) !important;
    filter: brightness(1.4);
    transform: scale(1.05);
  }
  &:active {
    background-image: linear-gradient(90deg, #f71744, #7a002c) !important;
    transform: scale(0.95);
  }
`

const HistoryDetail = ({ isOpen, data, winningNumber, onClaim, isClaiming }) => {
  const bananaPriceUsd = usePriceBananaBusd()
  const bananaPriceUsdDisplay = bananaPriceUsd.toNumber()

  const { t } = useTranslation();


  const isHightLight = (num, index, isWin) => {
    const arrNum = winningNumber.split('')
    if (+arrNum[index] === +num && isWin) {
      return true
    }
    return false
  }

  return isOpen ? (
    <MiddleCard>
      <Text fontWeight={800} textAlign="center" style={{ display: data?.length ? 'block' : 'none' }}>
        {t('Your Tickets')}
      </Text>

      {!data.length && <TextTicket>{t('You have no ticket in this round')}</TextTicket>}
      {data?.map((item, index) => (
        <WrapTicket key={index?.toString()}>
          <div style={{ backgroundColor: 'transparent', display: 'flex' }}>
            <Text fontWeight={500}>{`#00${index + 1}`}</Text>

            {item.isWin && (
              <WinButton
                onClick={() => onClaim(item.tokenId, index)}
                disabled={item.isClaimed || isClaiming}
                key={item?.toString()}
                style={{
                  animation: item?.isClaimed || isClaiming ? 'none' : '',
                }}
              >
                {`${item?.isClaimed ? 'claimed' : 'claim'} ~ $${(bananaPriceUsdDisplay * item?.reward || 0).toFixed(
                  2,
                )}`}
              </WinButton>
            )}
          </div>

          <RowTicket>
            <TextTicket isHighLight={isHightLight(item?.tokenInfo[0], 0, item.isWin)}>{item?.tokenInfo[0]}</TextTicket>
            <TextTicket isHighLight={isHightLight(item?.tokenInfo[1], 1, item.isWin)}>{item?.tokenInfo[1]}</TextTicket>
            <TextTicket isHighLight={isHightLight(item?.tokenInfo[2], 2, item.isWin)}>{item?.tokenInfo[2]}</TextTicket>
            <TextTicket isHighLight={isHightLight(item?.tokenInfo[3], 3, item.isWin)}>{item?.tokenInfo[3]}</TextTicket>
          </RowTicket>
        </WrapTicket>
      ))}
    </MiddleCard>
  ) : (
    <></>
  )
}

export default memo(HistoryDetail)
