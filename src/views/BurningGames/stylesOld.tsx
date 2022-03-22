/* eslint-disable no-await-in-loop */
import { Heading, Text, Button, ButtonSquare } from '@apeswapfinance/uikit'
import styled, { keyframes } from 'styled-components'
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

export const SubtitleHeading = styled(Text)<{ isMobile: boolean }>`
  font-size: ${(props) => (props.isMobile ? '16px' : '22px')};
  width: ${(props) => (props.isMobile ? '50%' : '100%')};
`
export const ContainerPrincipal = styled.div<{ isDark: boolean }>`
  // background-color: ${(props) => props.isDark && 'rgb(238,238,238)'};
  // background-color: ${({ theme }) => theme.colors.gradients.rtl};
  // background-image: ${({ theme }) => theme.colors.gradients.ltr};
  // display: flex;
`

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
`
export const TicketButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.primary};
  // height: 100%;
  border-radius: 24px;
  margin-bottom: 2rem;
  over-flow: hidden;
`
export const shakingAnimate = keyframes`
  0% {
    transform: rotate(-10deg);
  }
  50% {
    transform:rotate(10deg);
  }
  100% {
    transform:rotate(-10deg);
  }
`

export const scaleAnimate = keyframes`
  0% {
    transform: scale(1.3);
  }

  50% {
    transform:scale(1.1);
  }

  100% {
    transform:scale(1.3);
  }
`
export const StyledTicketImage = styled.img<{ width: string }>`
  max-height: ${(props) => props.width};
  // animation: ${shakingAnimate} linear 0.4s infinite;
`

export const ModalHeading = styled.div`
  font-weight: 400;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
`

export const ModalHeadingRight = styled.div`
  display: flex;
  align-items: center;
`

export const ModalDetail = styled.div`
  margin: 0.8rem 0;
  padding: 1rem;
  background: rgb(255, 240, 241);
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 400;
`

export const TicketInput = styled.input`
  border: none;
  border-radius: 16px;
  display: block;
  font-size: 16px;
  height: 40px;
  outline: 0;
  width: 100%;
  // direction: rtl;
  text-align: right;
  outline: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};

  &::placeholder {
    color: inherit;
    opacity: 0.3;
  }
`

export const PriceCalculate = styled.div`
  text-align: right;
  display: flex;
  align-items: center;
  & > * {
    margin-left: 8px;
  }
`

export const LotteryWrapper = styled.div`
  margin: 2rem auto;
`

export const LotteryNumberWrapper = styled.div`
  max-width: 400px;
  display: flex;
  align-items: center;

  & > * {
    width: 25%;
  }
`

export const NumberInput = styled.input`
  width: 50%;
  outline: none;
  border: none;
  border-bottom: 5px solid rgb(255, 240, 241);
  line-height: 40px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
  font-size: 20px;
  transition: 0.2s ease-in;
  &:focus {
    border-color: rgba(120, 0, 44, 0.7);
  }
`

export const STicketButton = styled(Button)`
  text-transform: uppercase;
  transition: 0.2s ease-out;
  background-image: linear-gradient(90deg, #f71744, #7a002c);
  animation: ${shakingAnimate} 1.2s linear infinite;
  &:hover {
    background-image: linear-gradient(90deg, #f71744, #7a002c) !important;
    filter: brightness(1.4);
    transform: scale(1.05);
  }
  &:active {
    background-image: linear-gradient(90deg, #f71744, #7a002c) !important;
    transform: scale(0.95);
  }
  margin: 0 3rem;
`

export const WinButton = styled(Button)`
  text-transform: uppercase;
  transition: 0.2s ease-out;
  background-image: linear-gradient(90deg, #ff9f0e, #7a002c);
  animation: ${scaleAnimate} 1.2s linear infinite;
  &:hover {
    background-image: linear-gradient(90deg, #f71744, #7a002c) !important;
    filter: brightness(1.4);
    transform: scale(1.05);
  }
  &:active {
    background-image: linear-gradient(90deg, #f71744, #7a002c) !important;
    transform: scale(0.95);
  }
  margin: 0 3rem;
`

export const STicketInactiveButton = styled(Button)`
  text-transform: uppercase;
  background-image: linear-gradient(90deg, #f71744, #7a002c);
  &:hover {
    background-image: linear-gradient(90deg, #f71744, #7a002c) !important;
    filter: brightness(1.4);
    transform: scale(1.05);
  }
  &:active {
    background-image: linear-gradient(90deg, #f71744, #7a002c) !important;
    transform: scale(0.95);
  }
  margin: 0 3rem;
`

export const ModalSubmit = styled(STicketButton)`
  animation: unset;
  border: none !important;
  outline: none !important;
  margin: 0;
  &:hover {
    filter: unset;
    transform: scale(1.05);
  }
  &:active {
    transform: scale(0.95);
  }
`

export const ModalSubmitWrapper = styled.div`
  padding-top: 12px;
  text-align: center;
`

export const STimeWrapper = styled.div`
  margin: 3rem 0;
  display: flex;
  justify-content: center;
`

export const Timer = styled.div`
  text-align: center;
  font-size: 40px;
`

export const TimerHeading = styled(Text)``

export const TimerCountDown = styled.div`
  background: -webkit-linear-gradient(90deg, #f71744, #7a002c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 30px;
  font-size: 3rem;
  display: flex;
  align-items: center;
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 8rem;
  }
`

export const ModalTimerCountDown = styled(TimerCountDown)`
  letter-spacing: 10px;
  font-size: 2rem;
  justify-content: center;
`

export const TimerStyledText = styled(Text)`
  font-size: 1.5rem;
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 3rem;
  }
`

export const StyledHeaderImage = styled.img`
  height: 300px;
`

export const Overlay = styled.div<{ isOpen: boolean }>`
  width: 100%;
  position: sticky;
  top: 30%;
  height: 0;
  // left: 50%;
  z-index: ${(props) => (props.isOpen ? '1000' : '-1')};
  // transform: translate(-50%, -50%);
  transition: 0.2s ease-in;
  ${(props) =>
    props.isOpen
      ? `
top:30%;opacity:1  
 `
      : `top:50%;opacity:0;`};
`

export const ModalWrapper = styled.div`
  margin: 0 auto;
  max-width: 400px;
`
export const Modal = styled.div`
  position: relative;
  background: #ffffff;
  box-shadow: 0px 20px 36px -8px rgb(14 14 44 / 10%), 0px 1px 1px rgb(0 0 0 / 5%);
  border: 1px solid #965a50ff;
  border-radius: 32px;
  width: 100%;
  z-index: 100;
  overflow-y: auto;
  padding: 32px;
`

export const ModalTitle = styled.div`
  padding-bottom: 1rem;
  border-bottom: 1px solid rgb(255, 240, 241);
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const ModalInner = styled.div`
  padding-top: 1rem;
`

export const StyledButtonSquare = styled(ButtonSquare)`
  background: ${({ theme }) => theme.colors.primary};
`

export const FinishedRoundsWrapper = styled.div`
  background: rgba(120, 0, 44, 0.3);
  border-radius: 24px;
`

export const RoundDetailWrapper = styled.div`
  margin-top: 20px;
  & > * {
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  }
  & > :last-child {
    border: none;
  }
`

export const RoundDetailRound = styled.div`
  padding: 20px;
`

export const RoundWinningNumber = styled(RoundDetailRound)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > :last-child {
    letter-spacing: 50px;
    background: -webkit-linear-gradient(90deg, #f71744, #7a002c);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`

export const RoundWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const StyledTextRound = styled(Text)`
  margin-left: 12px;
  padding: 4px 10px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  font-size: 30px;
  font-weight: 600;
`
