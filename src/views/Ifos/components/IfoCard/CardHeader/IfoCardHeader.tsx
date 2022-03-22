import React from 'react'
import { IfoStatus } from 'config/constants/types'
import { Text } from '@apeswapfinance/uikit'
import { useTranslation } from 'react-i18next'
import { StyledIfoCardHeader, Stack, Title } from './styles'

interface IfoCardHeaderProps {
  ifoId: string
  gnana?: boolean
  isLP?: boolean
  isComingSoon: boolean
  isLoading: boolean
  status: IfoStatus
  secondsUntilStart: number
  secondsUntilEnd: number
}

const IfoCardHeader: React.FC<IfoCardHeaderProps> = ({
  ifoId,
  gnana,
  isComingSoon,
  isLoading,
  isLP,
  status,
  secondsUntilStart,
  secondsUntilEnd,
}) => {
  const countdownToUse = status === 'coming_soon' ? secondsUntilStart : secondsUntilEnd
 const { t } = useTranslation();

  const getStatus = () => {
    if (isComingSoon) {
      return <Text>Coming Soon!</Text>
    }

    if (isLoading) {
      return <Text>{t('Loading')}...</Text>
    }

    if (countdownToUse <= 0) {
      return <Text>{t('Finished')}</Text>
    }

    if (status === 'live') {
      return <Text>{t('LIVE NOW')}!</Text>
    }
    return null
  }

  return (
    <StyledIfoCardHeader mb="24px" alignItems="center">
      <img src={`/images/ifos/${ifoId}.svg`} alt={ifoId} width="64px" height="64px" />
      <Stack>
        {isLP && <Title as="h2">LP {t('OFFERING')}</Title>}
        {!isLP && <Title as="h2">{`${gnana ? 'GNANA' : 'BNB'} ${t('OFFERING')}`}</Title>}
        {getStatus()}
      </Stack>
    </StyledIfoCardHeader>
  )
}

export default IfoCardHeader
