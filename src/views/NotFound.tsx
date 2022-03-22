import React from 'react'
import styled from 'styled-components'
import { Heading, Text, GradientButton, BlockIcon } from '@apeswapfinance/uikit'
import Page from 'components/layout/Page'
import useI18n from 'hooks/useI18n'
import Home from './Home'

const StyledNotFound = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 80px);
  justify-content: center;
`

const NotFound = () => {
  const TranslateString = useI18n()

  return (
    <Page>
      <StyledNotFound>
        <BlockIcon width="64px" mb="8px" color="primaryBright" />
        <Heading size="xxl" color="text">
          404
        </Heading>
        <Text mb="16px" color="text">
          {TranslateString(999, 'Oops, page not found.')}
        </Text>
        <GradientButton as="a" href="/" size="sm">
          {TranslateString(999, 'Back Home')}
        </GradientButton>
      </StyledNotFound>
    </Page>
  )
}

export default NotFound
