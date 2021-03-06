import React from 'react'
import styled from 'styled-components'
import { useRouteMatch, Link } from 'react-router-dom'
import { ButtonMenu, ButtonMenuItem } from '@apeswapfinance/uikit'
import { useTranslation } from 'react-i18next'
import useI18n from 'hooks/useI18n'

const FarmTabButtons = () => {
  const { url, isExact } = useRouteMatch()
  const { t } = useTranslation()

  return (
    <Wrapper>
      <ButtonMenu variant="gradient" activeIndex={!isExact ? 1 : 0} size="sm">
        <ButtonMenuItem as={Link} to={`${url}`} fontFamily="Montserrat" fontSize="12px">
          {t('Live')}
        </ButtonMenuItem>

        <ButtonMenuItem as={Link} to={`${url}/history`} fontFamily="Montserrat" fontSize="12px">
          {t('Finish')}
        </ButtonMenuItem>
      </ButtonMenu>
    </Wrapper>
  )
}

export default FarmTabButtons

const Wrapper = styled.div`
  margin-right: 10px;
  margin-left: 30px;

  ${({ theme }) => theme.mediaQueries.md} {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 64px;
    margin-right: 44px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 54px;
    margin-right: 34px;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 84px;
    margin-right: 74px;
  }
`
