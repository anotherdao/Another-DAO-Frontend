import { Card, Flex, Text } from '@apeswapfinance/uikit'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

const MainWrapper = styled.div`
  margin-bottom: 3.5rem;
`

const TitleWrapper = styled.div`
  max-width: 700px;
`
const StyledImg = styled.img`
  margin-top: -5rem;
  height: 141px;
`

const HeadingText = styled(Text)`
  line-height: 30px;
  font-weight: 500;
`
const UserContent = styled.div`
  padding: 16px 0;
`

const StyledCard = styled(Card)`
  position: relative;
  overflow: visible;
  box-shadow: 0px 5px 10px 5px rgb(25 19 38 / 10%);
`

const Row = styled(Flex)`
  margin-top: 6rem;
  flex-wrap: wrap;
  ${({ theme }) => theme.mediaQueries.md} {
    margin: 6rem -28px 0;
  }
  & > * {
    width: 100%;
    margin-bottom: 5rem;
    ${({ theme }) => theme.mediaQueries.md} {
      width: calc(100% / 3 - 56px);
      margin: 0 28px;
    }
    text-align: center;
  }
`

const StyledText = styled(Text)`
  width: 90%;
  margin: auto;
`

const UserGrid = () => {
  const { t } = useTranslation()

  return (
    <MainWrapper>
      <TitleWrapper>
        <Text fontSize="32px" bold mb="18px">
          {t('WINERY is DAO !')}
        </Text>
        <Text color="textLight" fontWeight={400}>
          {t(
            'Everything is fully automated and based on "open-source" computer programming code that can be viewed and used by anyone.',
          )}
        </Text>
      </TitleWrapper>

      <Row>
        <StyledCard>
          <StyledImg src="images/home/funny-cat1.png" />
          <UserContent>
            <Text color="secondary" fontSize="32px" bold>
              BEP20
            </Text>
            <StyledText textAlign="center" fontWeight={500}>
              {t('WINERY is a decentralized cryptocurrency exchange based on Binance Smart Chain (BEP20)')}
            </StyledText>
          </UserContent>
        </StyledCard>
        <StyledCard>
          <StyledImg src="images/home/wineswap-image.png" />
          <UserContent>
            <Text color="secondary" fontSize="32px" bold>
              DAO
            </Text>
            <StyledText fontWeight={500}>
              {t(
                'To decentralize traditional finance to create a fair global economy through a sustainable, community-driven DAO',
              )}
            </StyledText>
          </UserContent>
        </StyledCard>
        <StyledCard>
          <StyledImg src="images/home/funny-cat3.png" />
          <UserContent>
            <Text color="secondary" fontSize="32px" bold>
              AMM
            </Text>
            <StyledText fontWeight={500}>{t('Use the Automated Market Maker Model (AMM).')}</StyledText>
          </UserContent>
        </StyledCard>
      </Row>
    </MainWrapper>
  )
}

export default UserGrid
