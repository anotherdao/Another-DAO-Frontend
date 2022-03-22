import React from 'react'
import { Text } from '@apeswapfinance/uikit'
import { useTranslation } from 'react-i18next'
import { Item, Display, StyledIfoCardDetails } from './styles'

export interface Props {
  stats: Array<{
    label: string
    value: string
  }>
}

const IfoCardDetails: React.FC<Props> = ({ stats }) => {
 const { t } = useTranslation();

  return (
    <StyledIfoCardDetails>
      {stats.map((stat) => (
        <Item key={stat.label}>
          <Display>{t(stat.label)}</Display>
          <Text fontSize="14px" fontWeight={700}>
            {t(stat.value)}
          </Text>
        </Item>
      ))}
    </StyledIfoCardDetails>
  )
}

export default IfoCardDetails
