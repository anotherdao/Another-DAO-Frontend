import React from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'
import {
  Flex,
  Heading,
  Skeleton,
  Text,
  Image,
  useMatchBreakpoints,
  GradientButton,
  Button,
} from '@apeswapfinance/uikit'
import UnlockButton from 'components/UnlockButton'
import { getBalanceNumber } from 'utils/formatBalance'
import { useFarmUser } from 'state/hooks'
import { useWeb3React } from '@web3-react/core'
import { useTranslation } from 'react-i18next'
import HarvestAction from './HarvestAction'
import ApyButton from '../../../../components/ApyCalculator/ApyButton'
import ExpandableSectionButton from './ExpandableSectionButton'

export interface ExpandableSectionProps {
  lpLabel?: string
  apr?: BigNumber
  token0?: string
  token1?: string
  tokenSymbol?: string
  addLiquidityUrl?: string
  bananaPrice?: BigNumber
  farmAPR: string
  removed: boolean
  pid?: number
  lpSymbol: string
  image?: string
  showExpandableSection?: boolean
  multiplier?: string
  badge?: string
}

const StyledOutlineButton = styled(Button)`
  text-transform: uppercase;
  font-weight: 400;
  cursor: none;
  transition: 0.2s ease-out;
  height: 24px;

  // border: 1px solid ${({ theme }) => theme.colors.gradients.rtl}
  // &:hover {
  // background-image: ${({ theme }) => theme.colors.gradients.ltr};
  // color: white;
  // }
  &:focus:not(:active) {
    box-shadow: none;
  }
`

const StyledBackground = styled.div`
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
  ${({ theme }) => theme.mediaQueries.sm} {
  }
`

const StyledHeading = styled(Heading)`
  font-size: 22px;
  color: ${(props) => props.theme.colors.primary};

  ${({ theme }) => theme.mediaQueries.xs} {
    text-align: start;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 22px;
  }
`

const StyledText1 = styled(Text)`
  font-weight: 700;
  font-size: 18px;
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 18px;
  }
`

const StyledText2 = styled(Text)`
  font-weight: 700;
  font-size: 18px;
  margin-top: 1px;
`

const StyledText3 = styled(Text)`
  font-size: 18px;
  font-weight: 500;

  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 18px;
    line-height: 29px;
  }
`

const StyledText4 = styled(Text)`
  font-size: 18px;
  font-weight: 700;
  margin-top: 1px;
  display: none;

  ${({ theme }) => theme.mediaQueries.sm} {
    display: flex;
  }
`

const StyledGradientButton = styled(GradientButton)``

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
  margin-right: 5px;
  justify-content: center;
  width: 100%;

  // ${({ theme }) => theme.mediaQueries.xs} {
  //   flex-direction: column;
  //   justify-content: center;
  //   align-items: center;
  // }
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
  font-size: 18px;
  line-height: 11px;
  letter-spacing: 1px;
  margin-left: 5px;
  margin-bottom: 2px;
  font-family: 'Titan One', sans-serif;
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 20px;
    line-height: 23px;
  }
`

const StyledErnText = styled.div`
  font-size: 18px;
  line-height: 11px;
  letter-spacing: 1px;
  margin-left: 5px;
  margin-bottom: 2px;
  font-family: 'Titan One', sans-serif;
  color: ${(props) => props.theme.colors.primary};
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

const IconQuoteToken = styled(Image)`
  align: center;
  width: 20px;
  height: 20px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 35px;
    height: 35px;
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
  lpLabel,
  apr,
  token0,
  token1,
  image,
  addLiquidityUrl,
  bananaPrice,
  farmAPR,
  removed,
  pid,
  lpSymbol,
  showExpandableSection,
  multiplier,
  badge,
}) => {
  const { t } = useTranslation()

  const { earnings } = useFarmUser(pid)
  const rawEarningsBalance = getBalanceNumber(earnings)
  const displayBalance = rawEarningsBalance ? rawEarningsBalance.toLocaleString() : '0'
  const { isXl: isDesktop } = useMatchBreakpoints()
  const { account } = useWeb3React()

  return (
    <Container>
      <StyledBackground>
        <IconImage
          src={`/images/tokens/${image || `${token1}.svg`}`}
          alt={token1}
          width={60}
          height={60}
          marginLeft="7.5px"
        />
        <IconQuoteToken
          src={`/images/tokens/${token0}.svg`}
          alt={token0}
          width={35}
          height={35}
          marginLeft={isDesktop ? '-20px' : '-13px'}
          marginTop={isDesktop ? '45px' : '30px'}
        />
        {/* <IconArrow src="/images/arrow.svg" alt="arrow" width={10} height={10} marginRight="8px" marginLeft="8px" /> */}
        {/* <IconImage src="/images/tokens/banana.svg" alt="banana" width={60} height={60} marginRight="7.5px" /> */}
      </StyledBackground>
      <StyledFlexContainer>
        <LabelContainer>
          {/* Pair name */}
          <StyledHeading fontFamily="Titan One">{lpLabel}</StyledHeading>

          <StyledHeading mb={2}>
            {badge !== undefined && (
              <StyledOutlineButton variant="secondary" fontSize="12px">
                {badge}
              </StyledOutlineButton>
            )}
            <StyledGradientButton fontSize="10px" height="24px" className="noClick" type="a">
              {multiplier}
            </StyledGradientButton>
          </StyledHeading>

          {/* show on mobile screen */}
          <StyledFlexEarnedSmall>
            <StyledText4 color="primary" pr="3px">
              CORK
            </StyledText4>
            <StyledText2 color="primary" pr="3px">
              {t('Earn')}:
            </StyledText2>
            <StyledText3>{displayBalance}</StyledText3>
          </StyledFlexEarnedSmall>
        </LabelContainer>

        {!removed && (
          <LabelContainer1>
            <Text style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
              <StyledText1>APR:</StyledText1>
            </Text>
            <Text>
              {apr ? (
                <FlexSwitch>
                  <ApyButton
                    lpLabel={lpLabel}
                    rewardTokenName="CORK"
                    addLiquidityUrl={addLiquidityUrl}
                    rewardTokenPrice={bananaPrice}
                    apy={apr}
                  />
                  <StyledAPRText>{farmAPR}%</StyledAPRText>
                </FlexSwitch>
              ) : (
                <Skeleton height={24} width={80} />
              )}
            </Text>
          </LabelContainer1>
        )}
        <LabelContainer1>
          <Text style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
            <StyledText1>{t('Earn')}: </StyledText1>
          </Text>
          <StyledErnText>CORK + {t('Fees')}</StyledErnText>
        </LabelContainer1>

        <LabelContainer2>
          <StyledFlexEarned>
            <Flex>
              <StyledText4 color="primary" pr="3px">
                CORK
              </StyledText4>
              <StyledText2 color="primary" pr="3px">
                {t('Earned')}
              </StyledText2>
            </Flex>
            <StyledText3>{displayBalance}</StyledText3>
          </StyledFlexEarned>
          <ButtonContainer>
            {account && (
              <HarvestAction earnings={earnings} pid={pid} lpSymbol={lpSymbol} addLiquidityUrl={addLiquidityUrl} />
            )}
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
