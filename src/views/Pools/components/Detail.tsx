import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { Text, Flex, Link, LinkExternal } from '@apeswapfinance/uikit'
import { registerToken } from 'utils/wallet'

interface RewardToken {
  address?: any
  decimals?: number
  symbol?: string
}
interface Time {
  days?: number
  months?: number
  hours?: number
  minutes?: number
}
export interface ExpandableSectionProps {
  bscScanAddress?: string
  blocksUntilStart?: number
  timeUntilStart?: Time
  timeUntilEnd?: Time
  blocksRemaining?: number
  totalStakedFormated?: string
  addLiquidityUrl?: string
  lpLabel?: string
  totalUserStaked?: number
  rawEarningsBalance?: number
  rewardTokenPrice?: number
  projectLink?: string
  type?: string
  rewardToken?: RewardToken
  imageToken?: string
}

const StyledLinkExternal = styled(LinkExternal)`
  text-decoration: none;
  font-weight: bold;
  font-family: 'Montserrat';
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;

  svg {
    padding-left: 4px;
    height: 18px;
    width: auto;
    fill: ${({ theme }) => theme.colors.primary};
  }
`

const StyledTextGreen = styled(Text)`
  font-weight: bold;
  color: ${(props) => props.theme.colors.primary};
`

const StyledLink = styled(Link)`
  font-size: 12px;
  text-decoration-line: underline;
  margin-bottom: 14px;
`

const StyledText = styled(Text)`
  font-weight: 700;
`

const Detail: React.FC<ExpandableSectionProps> = ({
  blocksUntilStart,
  timeUntilStart,
  blocksRemaining,
  timeUntilEnd,
  totalStakedFormated,
  addLiquidityUrl,
  lpLabel,
  totalUserStaked,
  rawEarningsBalance,
  rewardTokenPrice,
  bscScanAddress,
  projectLink,
  type,
  rewardToken,
  imageToken,
}) => {
  const totalStakedTitle = type === 'card' ? 'Total Staked Value' : 'Total Staked'
  const chainId = process.env.REACT_APP_CHAIN_ID
  const URLactual = window.location
 const { t } = useTranslation();

  return (
    <>
      {blocksUntilStart > 0 && (
        <>
          <StyledText fontSize="12px">{t('Start')}</StyledText>
          <StyledText
            fontFamily="Montserrat"
            fontSize="12px"
          >{`${timeUntilStart.days}d, ${timeUntilStart.hours}h, ${timeUntilStart.minutes}m`}</StyledText>
        </>
      )}
      {blocksUntilStart === 0 && blocksRemaining > 0 && (
        <>
          <Flex justifyContent="space-between">
            <StyledText fontSize="12px">{t('End')}</StyledText>
            <StyledText fontSize="12px">
              {rewardToken.symbol === 'BANANA'
                ? 'Never'
                : `${timeUntilEnd.days + timeUntilEnd.months * 30}d, ${timeUntilEnd.hours}h, ${timeUntilEnd.minutes}m`}
            </StyledText>
          </Flex>
        </>
      )}
      <Flex justifyContent="space-between">
        <StyledText fontSize="12px">{t(totalStakedTitle)}:</StyledText>
        <StyledText fontSize="12px">{totalStakedFormated}</StyledText>
      </Flex>
      <Flex justifyContent="space-between">
        <StyledText fontSize="12px">{t('Stake')}:</StyledText>
        <StyledLinkExternal href={addLiquidityUrl} className="noClick">
          {/* {lpLabel} */}
          CORK
        </StyledLinkExternal>
      </Flex>
      <Flex justifyContent="space-between">
        <StyledText fontSize="12px">{t('Staked Value')}:</StyledText>
        <StyledTextGreen fontSize="12px">${totalUserStaked}</StyledTextGreen>
      </Flex>
      <Flex justifyContent="space-between">
        <StyledText fontSize="12px">{t('Earned Value')}:</StyledText>
        <StyledTextGreen fontSize="12px">${(rawEarningsBalance * rewardTokenPrice).toFixed(2)}</StyledTextGreen>
      </Flex>
      <Flex justifyContent="center">
        <StyledLink external href={bscScanAddress} bold={false} className="noClick" fontFamily="Titan One">
          {t('View on BscScan')}
        </StyledLink>
      </Flex>
      {/* <Flex justifyContent="center">
        <StyledLink external href={projectLink} bold={false} className="noClick" fontFamily="Titan One">
          {TranslateString(356, 'View Project Site')}
        </StyledLink>
      </Flex> */}
      <Flex justifyContent="center">
        <StyledLink
          bold={false}
          className="noClick"
          onClick={() =>
            registerToken(
              rewardToken?.address[chainId],
              rewardToken?.symbol,
              rewardToken?.decimals,
              `${URLactual.origin}/images/tokens/${imageToken || `${rewardToken?.symbol}.svg`}`,
            )
          }
          fontFamily="Titan One"
        >
          {t('Add to Metamask')}
        </StyledLink>
      </Flex>
    </>
  )
}

export default Detail
