import React from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { useWeb3React } from '@web3-react/core'
import { Pool } from 'state/types'
import { useNetworkChainId } from 'state/hooks'
import { Flex, Heading, Skeleton, Text, Image, useMatchBreakpoints } from '@apeswapfinance/uikit'
import UnlockButton from 'components/UnlockButton'
import { getBalanceNumber } from 'utils/formatBalance'
import { BASE_ADD_LIQUIDITY_URL } from 'config'
import ApyButton from '../../../../components/ApyCalculator/ApyButton'
import ExpandableSectionButton from './ExpandableSectionButton'
import HarvestActions from './CardActions/HarvestActions'
import ApprovalAction from './CardActions/ApprovalAction'
import StakeAction from './CardActions/StakeActions'

export interface ExpandableSectionProps {
  lpLabel?: string
  apr?: BigNumber
  pool?: Pool
  stakeToken?: string
  earnToken?: string
  tokenSymbol?: string
  addLiquidityUrl?: string
  bananaPrice?: BigNumber
  poolAPR?: string
  removed?: boolean
  sousId?: number
  lpSymbol?: string
  earnTokenImage?: string
  showExpandableSection?: boolean
  stakingTokenAddress?: string
  rewardTokenPrice?: number
}

const StyledBackground = styled.div`
  width: 100%;
  height: 80px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
  ${({ theme }) => theme.mediaQueries.sm} {
  }
`

const StyledHeading = styled(Heading)`
  font-size: 30px;

  ${({ theme }) => theme.mediaQueries.xs} {
    text-align: start;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 30px;
  }
`

const StyledSubHeading = styled(Text)`
  font-size: 20px;
  font-weight: 500;

  ${({ theme }) => theme.mediaQueries.xs} {
    text-align: start;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 14px;
  }
`

const StyledText1 = styled(Text)`
  font-weight: 700;
  font-size: 12px;
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 15px;
  }
`

const StyledText2 = styled(Text)`
  font-weight: 700;
  font-size: 12px;
  margin-top: 1px;
`

const StyledText3 = styled(Text)`
  font-size: 12px;
  font-family: 'Titan One';

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 25px;
    line-height: 29px;
  }
`

const StyledText4 = styled(Text)`
  font-size: 12px;
  font-weight: 700;
  margin-top: 1px;
  display: none;

  ${({ theme }) => theme.mediaQueries.sm} {
    display: flex;
  }
`

const StyledFlexContainer = styled(Flex)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 6px;
  margin-right: 8px;
  align-items: center;
  flex: 1;

  ${({ theme }) => theme.mediaQueries.xs} {
    display: block;
    margin-right: 5px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    display: flex;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 15px;
    margin-right: 15px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`

const StyledFlexEarned = styled(Flex)`
  display: none;

  ${({ theme }) => theme.mediaQueries.sm} {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    margin-right: 0px;
    flex-direction: column;
  }
`

const StyledFlexEarnedSmall = styled(Flex)`
  margin-right: 10px;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 10px;

  ${({ theme }) => theme.mediaQueries.sm} {
    display: none;
  }
`

const LabelContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  // width: 110px;
  margin-right: 5px;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
`

const LabelContainer1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 110px;
  margin-right: 5px;
  justify-content: space-between;

  ${({ theme }) => theme.mediaQueries.xs} {
    flex-direction: row;
    align-items: center;
    width: 100%;
  }
`

const LabelContainer2 = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  justify-content: flex-end;

  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
  }
`

const LabelContainer3 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  width: 110px;
  margin-right: 5px;
  justify-content: center;
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 20px;
  margin-top: 20px;

  ${({ theme }) => theme.mediaQueries.xs} {
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
`

const FlexSwitch = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row-reverse;
  }
`

const StyledAPRText = styled.div`
  font-size: 12px;
  line-height: 11px;
  letter-spacing: 1px;
  margin-left: 5px;
  margin-bottom: 2px;
  font-family: 'Titan One';

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 20px;
    line-height: 23px;
  }
`

const ButtonContainer = styled.div`
  width: 100px;
  display: flex;
  justify-content: flex-end;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 150px;
  }
`

const IconImage = styled(Image)`
  align: center;
  width: 40px;
  height: 40px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 70px;
    height: 70px;
  }
`

const IconArrow = styled(Image)`
  align: center;
  width: 5px;
  height: 5px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 10px;
    height: 10px;
  }
`

const Container = styled.div`
  // display: flex;
  align-items: center;
`

const CardHeading: React.FC<ExpandableSectionProps> = ({
  pool,
  apr,
  stakeToken,
  earnToken,
  poolAPR,
  removed,
  sousId,
  earnTokenImage,
  showExpandableSection,
  rewardTokenPrice,
}) => {
  const { userData, tokenDecimals, stakingToken } = pool
  const chainId = useNetworkChainId()
  const stakingTokenBalance = new BigNumber(userData?.stakingTokenBalance || 0)
  const stakedBalance = new BigNumber(userData?.stakedBalance || 0)
  const accountHasStakedBalance = stakedBalance?.toNumber() > 0
  const earnings = new BigNumber(pool.userData?.pendingReward || 0)
  const allowance = new BigNumber(userData?.allowance || 0)
  const rawEarningsBalance = getBalanceNumber(earnings, tokenDecimals)
  const displayBalance = rawEarningsBalance ? rawEarningsBalance.toLocaleString() : '?'
  const isLoading = !pool.userData
  const needsApproval = !allowance.gt(0)
  const isCompound = sousId === 0
  const { account } = useWeb3React()
  const { isXl: isDesktop } = useMatchBreakpoints()
 const { t } = useTranslation();

  const cardHeaderButton = () => {
    if (!account) {
      return null
    }

    if (needsApproval) {
      return (
        <ApprovalAction
          stakingTokenContractAddress={stakingToken.address[chainId]}
          sousId={sousId}
          isLoading={isLoading}
        />
      )
    }
    if (!needsApproval && !accountHasStakedBalance && !pool.emergencyWithdraw) {
      return (
        <StakeAction
          pool={pool}
          stakingTokenBalance={stakingTokenBalance}
          stakedBalance={stakedBalance}
          isStaked={accountHasStakedBalance}
          firstStake={!accountHasStakedBalance}
        />
      )
    }
    return (
      <HarvestActions
        earnings={earnings}
        sousId={sousId}
        isLoading={isLoading}
        tokenDecimals={pool.tokenDecimals}
        compound={isCompound}
        emergencyWithdraw={pool.emergencyWithdraw}
      />
    )
  }

  return (
    <Container>
      <StyledBackground>
        <IconImage
          src={`/images/tokens/${stakeToken}.svg`}
          alt={stakeToken}
          width={70}
          height={70}
          marginLeft="7.5px"
        />
        {/* <IconArrow src="/images/arrow.svg" alt="arrow" width={10} height={10} /> */}
        <IconImage
          src={`/images/tokens/${earnTokenImage || `${earnToken}.svg`}`}
          alt={earnToken}
          width={35}
          height={35}
          marginLeft={isDesktop ? '-20px' : '-13px'}
          marginTop={isDesktop ? '45px' : '30px'}
        />
      </StyledBackground>
      <StyledFlexContainer>
        <LabelContainer>
          <StyledHeading color="primaryBright" fontFamily="Titan One">
            {earnToken}
          </StyledHeading>

          <StyledFlexEarnedSmall>
            <StyledText4 fontFamily="Montserrat" color="primary" pr="3px">
              {earnToken}
            </StyledText4>
            <StyledText2 fontFamily="Montserrat" color="primary" pr="3px">
              {t('Earned')}
            </StyledText2>
            <StyledText3>{displayBalance}</StyledText3>
          </StyledFlexEarnedSmall>
        </LabelContainer>

        <LabelContainer>
          <StyledSubHeading>
            {t('Stake')} {stakeToken} {t('Earn')} {earnToken}
          </StyledSubHeading>
        </LabelContainer>

        {!removed && !pool?.forAdmins && (
          <LabelContainer1>
            <Text style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
              <StyledText1 fontFamily="Montserrat">APR:</StyledText1>
            </Text>
            <Text>
              {apr ? (
                <FlexSwitch className="noClick">
                  <ApyButton
                    lpLabel={stakeToken}
                    rewardTokenName={earnToken}
                    addLiquidityUrl={BASE_ADD_LIQUIDITY_URL}
                    rewardTokenPrice={new BigNumber(rewardTokenPrice)}
                    apy={apr.div(100)}
                  />
                  <StyledAPRText>{poolAPR}%</StyledAPRText>
                </FlexSwitch>
              ) : (
                <Skeleton height={24} width={80} />
              )}
            </Text>
          </LabelContainer1>
        )}

        <LabelContainer2>
          <StyledFlexEarned>
            {account && (
              <Flex>
                <StyledText4 fontFamily="Montserrat" color="primary" pr="3px">
                  {earnToken}
                </StyledText4>
                <StyledText2 fontFamily="Montserrat" color="primary" pr="3px">
                  {t('Earned')}
                </StyledText2>
              </Flex>
            )}
            {account && <StyledText3>{displayBalance}</StyledText3>}
            {!account && <Text color="text">{t('Start Earning')}</Text>}
          </StyledFlexEarned>
          <ButtonContainer>
            {cardHeaderButton()}
            {/* <ExpandableSectionButton expanded={showExpandableSection} /> */}
          </ButtonContainer>
        </LabelContainer2>

        <LabelContainer3>{!account && <UnlockButton padding="8px" />}</LabelContainer3>

        <LabelContainer3>
          {t('Details')}
          <ExpandableSectionButton expanded={showExpandableSection} />
        </LabelContainer3>
      </StyledFlexContainer>
    </Container>
  )
}

export default CardHeading
