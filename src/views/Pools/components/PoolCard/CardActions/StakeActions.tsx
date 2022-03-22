import React, { useState, useRef } from 'react'
import Reward from 'react-rewards'
import rewards from 'config/constants/rewards'
import useReward from 'hooks/useReward'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import {
  Flex,
  Heading,
  IconButtonSquare,
  AddIcon,
  MinusIcon,
  useModal,
  Text,
  ButtonSquare,
  GradientButton,
} from '@apeswapfinance/uikit'
import BigNumber from 'bignumber.js'
import { getBalanceNumber } from 'utils/formatBalance'
import { useSousStake } from 'hooks/useStake'
import { useSousUnstake } from 'hooks/useUnstake'
import { Pool } from 'state/types'
import DepositModal from '../../DepositModal'
import WithdrawModal from '../../WithdrawModal'
import HarvestActions from './HarvestActions'

interface StakeActionsProps {
  pool: Pool
  stakingTokenBalance: BigNumber
  stakedBalance: BigNumber
  isBnbPool?: boolean
  isStaked: ConstrainBoolean
  isLoading?: boolean
  isApproved?: boolean
  firstStake?: boolean
}

const IconButtonWrapper = styled.div`
  display: flex;
`

const HarvestWrapper = styled.div`
  margin-right: 6px;
`

const StyledIconButtonSquare = styled(IconButtonSquare)`
  width: 34px;
  height: 34px;
`

const StyledHeadingPink = styled(Heading)`
  font-size: 14px;
  color: ${(props) => props.theme.colors.primary};
  font-family: 'Titan One';

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 20px;
    color: ${(props) => props.theme.colors.primary};
  }
`

const StyledText = styled(Text)`
  font-weight: bold;
  font-size: 12px;
`

const StyledFlex = styled(Flex)`
  width: 100%;
  // margin-left: 117px;
  margin-left: 5px;
  margin-right: 5px;
  ${({ theme }) => theme.mediaQueries.md} {
    // margin-left: 117px;
  }
`

const StakeAction: React.FC<StakeActionsProps> = ({
  pool,
  stakingTokenBalance,
  stakedBalance,
  isApproved,
  firstStake,
}) => {
  const { stakingToken, tokenDecimals, stakingLimit, sousId } = pool
 const { t } = useTranslation();
  
  const { symbol: stakingTokenName } = stakingToken

  const rawStakedBalance = getBalanceNumber(stakedBalance)
  const displayBalance = rawStakedBalance.toLocaleString()

  const rewardRefStake = useRef(null)
  const rewardRefUnstake = useRef(null)
  const [typeOfReward, setTypeOfReward] = useState('rewardBanana')
  const earnings = new BigNumber(pool.userData?.pendingReward || 0)
  const isLoading = !pool.userData

  const onStake = useReward(rewardRefStake, useSousStake(sousId).onStake)
  const onUnstake = useReward(rewardRefUnstake, useSousUnstake(sousId).onUnstake)

  const convertedLimit = new BigNumber(stakingLimit).multipliedBy(new BigNumber(10).pow(tokenDecimals))

  const [onPresentDeposit] = useModal(
    <DepositModal
      max={stakingLimit && stakingTokenBalance.isGreaterThan(convertedLimit) ? convertedLimit : stakingTokenBalance}
      onConfirm={async (val) => {
        setTypeOfReward('rewardBanana')
        await onStake(val).catch(() => {
          setTypeOfReward('error')
          rewardRefStake.current?.rewardMe()
        })
      }}
      tokenName={stakingLimit ? `${stakingTokenName} (${stakingLimit} max)` : stakingTokenName}
    />,
  )

  const [onPresentWithdraw] = useModal(
    <WithdrawModal
      max={stakedBalance}
      onConfirm={async (val) => {
        setTypeOfReward('removed')
        await onUnstake(val).catch(() => {
          setTypeOfReward('error')
          rewardRefUnstake.current?.rewardMe()
        })
      }}
      tokenName={stakingTokenName}
    />,
  )

  const renderStakingButtons = () => {
    return (
      rawStakedBalance !== 0 && (
        <IconButtonWrapper>
          {sousId === 0 && (
            <HarvestWrapper className="noClick">
              <HarvestActions
                earnings={earnings}
                sousId={sousId}
                isLoading={isLoading}
                tokenDecimals={pool.tokenDecimals}
              />
            </HarvestWrapper>
          )}
          <Reward ref={rewardRefUnstake} type="emoji" config={rewards[typeOfReward]}>
            <StyledIconButtonSquare className="noClick" onClick={onPresentWithdraw} mr="6px">
              <MinusIcon className="noClick" color="white" width="12px" height="12px" />
            </StyledIconButtonSquare>
          </Reward>
          <Reward ref={rewardRefStake} type="emoji" config={rewards[typeOfReward]}>
            <StyledIconButtonSquare className="noClick" onClick={onPresentDeposit}>
              <AddIcon className="noClick" color="white" width="16px" height="16px" />
            </StyledIconButtonSquare>
          </Reward>
        </IconButtonWrapper>
      )
    )
  }

  if (firstStake) {
    return (
      <GradientButton size="sm" className="noClick" onClick={onPresentDeposit}>
        {t('Stake')} {stakingTokenName}
      </GradientButton>
    )
  }

  return (
    <StyledFlex justifyContent="space-between" alignItems="center" mt="5px">
      <Flex flexDirection="column" alignItems="flex-start" marginRight="6px">
        <StyledText>{t('Staked')}</StyledText>
        <StyledHeadingPink color={rawStakedBalance === 0 ? 'textDisabled' : 'text'}>{displayBalance}</StyledHeadingPink>
      </Flex>
      {isApproved && renderStakingButtons()}
    </StyledFlex>
  )
}

export default StakeAction
