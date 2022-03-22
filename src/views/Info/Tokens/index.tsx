import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import TokensBoard, { TitleText } from '../components/TokensBoard'
import useBoard from '../components/useBoard'
import { isLocal } from '../Overview'

const PageWrapper = styled.div`
  padding: 2rem 4rem;
`

const AllTokens = () => {
  const { tokens } = useBoard(isLocal())
  const { t } = useTranslation();

  return (
    <PageWrapper>
      <TitleText>{t('All Tokens')} </TitleText>
      <TokensBoard tokens={tokens} />
    </PageWrapper>
  )
}

export default AllTokens
