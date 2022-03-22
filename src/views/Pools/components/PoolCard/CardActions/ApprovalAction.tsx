import React, { useCallback, useState, useRef } from 'react'
import { Skeleton, GradientButton } from '@apeswapfinance/uikit'
import { useTranslation } from 'react-i18next'
import { useSousApprove } from 'hooks/useApprove'
import { useERC20 } from 'hooks/useContract'

interface ApprovalActionProps {
  stakingTokenContractAddress: string
  sousId: number
  isLoading?: boolean
}

const ApprovalAction: React.FC<ApprovalActionProps> = ({ stakingTokenContractAddress, sousId, isLoading = false }) => {
  const stakingTokenContract = useERC20(stakingTokenContractAddress)
  const [requestedApproval, setRequestedApproval] = useState(false)
  const rewardRefReward = useRef(null)
  const { onApprove } = useSousApprove(stakingTokenContract, sousId)
 const { t } = useTranslation();

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const txHash = await onApprove()
      // user rejected tx or didn't go thru
      if (!txHash) {
        setRequestedApproval(false)
      } else {
        rewardRefReward.current?.rewardMe()
      }
    } catch (e) {
      rewardRefReward.current?.rewardMe()
      console.warn(e)
    }
  }, [onApprove, setRequestedApproval])

  return (
    <>
      {isLoading ? (
        <Skeleton width="100%" height="32px" />
      ) : (
        <GradientButton className="noClick" disabled={requestedApproval} onClick={handleApprove} height="32px">
          {t('enable')}
        </GradientButton>
      )}
    </>
  )
}

export default ApprovalAction
