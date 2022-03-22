/* eslint-disable no-await-in-loop */
import { Heading, Card, Text } from '@apeswapfinance/uikit'
import styled from 'styled-components'
import Page from 'components/layout/Page'

export const HeadingContainer = styled.div`
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
`
export const Header = styled.div<{ banner: string }>`
  position: relative;
  overflow-y: hidden;
  overflow-x: hidden;
  padding-top: 36px;
  padding-left: 10px;
  padding-right: 10px;
  background-image: linear-gradient(180deg, rgba(122, 0, 44, 0.5) -2.73%, rgba(122, 0, 44, 0));

  ${({ theme }) => theme.mediaQueries.md} {
    padding-left: 24px;
    padding-right: 24px;
  }
`
export const StyledHeading = styled(Heading)`
  font-size: 32px;
  max-width: 176px !important;

  ${({ theme }) => theme.mediaQueries.xs} {
    font-size: 36px;
  }

  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 44px;
    max-width: 400px !important;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    font-size: 60px;
    max-width: 600px !important;
  }
`

export const HeadingTextWrapper = styled.div``

export const StyledPage = styled(Page)`
  padding-left: 5px;
  padding-right: 5px;
  max-width: 1024px;
  width: 100vw;
  ${({ theme }) => theme.mediaQueries.xs} {
    padding-left: 10px;
    padding-right: 10px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    padding-left: 16px;
    padding-right: 16px;
  }
`

export const ContainerPrincipal = styled.div`
  // padding-top: 20px;
  // height: 100vh;
  min-height: calc(100vh - 64px);
  width: 100%;
`

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

export const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
`

export const StyledFinishRound = styled(FlexCol)`
  justify-content: center;
  align-items: center;
  padding: 30px 10px;
  min-height: 500px;
  padding-bottom: 100px;
`

export const StyledHeaderImage = styled.img`
  width: 120%;
  transform: translateX(-10%);
  max-width: 200% !important;

  @media (max-width: 768px) {
    font-size: 30px;  
    width: 120%;
    transform: translateX(0%);
  }
`
export const StyledHeaderBackground = styled.img`
  width: 80%;
  left: 0px;
  position: absolute;
  z-index: -1;
  top: -10%;
  left: -10%;

  @media (max-width: 768px) {
    display: none;
  }
`

export const ContainerImage = styled.div`
  padding-right: 50px;
`

export const StyledCard = styled(Card)`
  position: relative;
  overflow: visible;
`

export const MaindCard = styled(Card)`
  // position: relative;
  // overflow: visible;
  width: 100%;
  padding: 10px 30px;
`

export const RightContent = styled.div`
  // width: 60%;
  padding: 10px 30px;
  text-align: center;
  flex: 1;
  @media (max-width: 600px) {
    padding: 10px;
  }
`
export const RowCenter = styled(FlexRow)`
  justify-content: center;
`

export const LeftContent = styled.div`
  // width: 40%;
  padding: 10px 30px;
  text-align: center;
  flex: 0.5;

  @media (max-width: 600px) {
    flex: 1;    
  }
`

export const TitleContainer = styled.div`
  margin-bottom: 10px;
`

export const TextPriceLeft = styled(Text)`
  font-size: 70px;
  font-weight: 800;
  color:  ${(props) => props.theme.colors.primaryBright};

  @media (max-width: 600px) {
    font-size: 30px;    
  }
`