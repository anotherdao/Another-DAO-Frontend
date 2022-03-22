import React, { useState, useRef } from 'react'
import Reward from 'react-rewards'
import rewards from 'config/constants/rewards'
import { useTranslation } from 'react-i18next'
import { GradientButton } from '@apeswapfinance/uikit'
import BigNumber from 'bignumber.js'
import useReward from 'hooks/useReward'
import { useSousHarvest } from 'hooks/useHarvest'
import { useSousStake } from 'hooks/useStake'
import { useSousEmergencyWithdraw } from 'hooks/useUnstake'
import { getBalanceNumber } from 'utils/formatBalance'

interface HarvestActionsProps {
  earnings: BigNumber
  sousId: number
  earningTokenPrice?: number
  isBnbPool?: boolean
  isLoading?: boolean
  compound?: boolean
  emergencyWithdraw?: boolean
  tokenDecimals: number
}

const HarvestActions: React.FC<HarvestActionsProps> = ({
  earnings,
  tokenDecimals,
  sousId,
  compound,
  emergencyWithdraw,
}) => {
 const { t } = useTranslation();

  const earningTokenBalance = getBalanceNumber(earnings, tokenDecimals)
  const rewardRef = useRef(null)
  const rewardRefApeHarder = useRef(null)
  const [pendingTx, setPendingTx] = useState(false)
  const [typeOfReward, setTypeOfReward] = useState('rewardBanana')
  const onReward = useReward(rewardRef, useSousHarvest(sousId).onReward)
  const onApeHarder = useReward(rewardRefApeHarder, useSousStake(sousId).onStake)
  const onEmergencyWithdraw = useReward(rewardRef, useSousEmergencyWithdraw(sousId).onEmergencyWithdraw)

  const renderButton = () => {
    if (emergencyWithdraw) {
      return (
        <GradientButton
          className="noClick"
          fontSize="12px"
          height="32px"
          disabled={earningTokenBalance === 0 || pendingTx}
          onClick={async () => {
            setPendingTx(true)
            setTypeOfReward('rewardBanana')
            await onEmergencyWithdraw().catch(() => {
              setTypeOfReward('error')
              rewardRefApeHarder.current?.rewardMe()
            })
            setPendingTx(false)
          }}
        >
          {t('withdraw')}
        </GradientButton>
      )
    }

    if (compound) {
      return (
        <GradientButton
          fontSize="12px"
          height="32px"
          className="noClick"
          disabled={earningTokenBalance === 0 || pendingTx}
          onClick={async () => {
            setPendingTx(true)
            setTypeOfReward('rewardBanana')
            await onApeHarder(earningTokenBalance).catch(() => {
              setTypeOfReward('error')
              rewardRefApeHarder.current?.rewardMe()
            })
            setPendingTx(false)
          }}
        >
          {/* {TranslateString(999, 'APE HARDER')} */}
          {t('Stake')}
        </GradientButton>
      )
    }

    return (
      <GradientButton
        fontSize="12px"
        height="32px"
        className="noClick"
        disabled={earningTokenBalance === 0 || pendingTx}
        onClick={async () => {
          setPendingTx(true)
          setTypeOfReward('rewardBanana')
          await onReward().catch(() => {
            setTypeOfReward('error')
            rewardRef.current?.rewardMe()
          })
          setPendingTx(false)
        }}
      >
       
        {t('harvest')}
      </GradientButton>
    )
  }

  return (
    <Reward ref={rewardRef} type="emoji" config={rewards[typeOfReward]}>
      {renderButton()}
    </Reward>
  )
}

export default HarvestActions
