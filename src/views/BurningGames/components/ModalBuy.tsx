/* eslint-disable no-await-in-loop */
import React, { useEffect, useState, memo } from 'react'

import { useTranslation } from 'react-i18next'

import { Text, Button } from '@apeswapfinance/uikit'
import styled, { keyframes } from 'styled-components'

const RATIO_WINERY_TICKET = 10

// const Overlay = styled.div<{ isOpen: boolean }>`
//   width: 100%;
//   position: sticky;
//   top: 30%;
//   height: 10px;
//   // left: 50%;
//   z-index: 1000000000;
//   //${(props) => (props.isOpen ? '1000' : '-1')};
//   // transform: translate(-50%, -50%);
//   transition: 0.2s ease-in;
//   ${(props) =>
//     props.isOpen
//       ? `top:20%;opacity:1`
//       : `top:50%;opacity:0;`};
// `

const shakingAnimate = keyframes`
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

const STicketButton = styled(Button)`
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

const ModalSubmit = styled(STicketButton)<{ disabled?: boolean }>`
  animation: unset;
  width: 100%;
  border: none !important;
  outline: none !important;
  margin: 0;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  &:hover {
    filter: unset;
    transform: scale(1.05);
  }
  &:active {
    transform: scale(0.95);
  }
`

const ModalSubmitWrapper = styled.div`
  padding-top: 12px;
  text-align: center;
`

const ModalTitle = styled.div`
  padding-bottom: 1rem;
  border-bottom: 1px solid rgb(255, 240, 241);
  display: flex;
  align-items: center;
  justify-content: center;
`

const ModalInner = styled.div`
  padding-top: 1rem;
`

const ModalDetail = styled.div`
  margin: 0.8rem 0;
  padding: 1rem;
  background: ${({ theme }) => (theme.isDark ? '#000' : 'rgb(255, 240, 241)')};
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 400;
`

const TicketInput = styled.input`
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

const StyledTicketImage = styled.img<{ width: string }>`
  max-height: ${(props) => props.width};
`
const ModalWrapper = styled.div`
  margin: 0 auto;
  max-width: 400px;
  display: flex;
  justify-content: center;
  position: relative;
  @media (max-width: 500px) {
    margin: 0 20px;
  }
`
const Modal = styled.div`
  position: relative;
  background: ${({ theme }) => (theme.isDark ? theme.colors.tertiary : '#fff')};
  box-shadow: 0px 20px 36px -8px rgb(14 14 44 / 10%), 0px 1px 1px rgb(0 0 0 / 5%);
  border-radius: 32px;
  width: 100%;
  z-index: 100;
  overflow-y: auto;
  padding: 32px;
`

const PriceCalculate = styled.div`
  text-align: right;
  display: flex;
  align-items: center;
  & > * {
    margin-left: 8px;
  }
`

const RoundWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const RowBetween = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0px;
`

const RowTicket = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-radius: 10px;
  background-color: ${({ theme }) => (theme.isDark ? '#000' : theme.colors.textSubtle)};
  margin: 5px 0;
`
const WrapTicket = styled.div`
  margin: 10px 0;
`

const TextTicket = styled(Text)`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.theme.colors.outline};
`

const FooterText = styled(Text)`
  text-align: center;
  font-size: 11px;
  line-height: 2;
  margin-top: 10px;
`

const OutlineButton = styled(Button)`
  border: 1px solid ${({ theme }) => theme.colors.primaryBright};
  color: ${({ theme }) => theme.colors.primaryBright};
  width: 100%;
  text-transform: uppercase;
  &:hover {
    opacity: 0.8;
  }
`
const IconButton = styled(Button)`
  background: transparent;
  color: ${({ theme }) => theme.colors.primary};
  box-shadow: none;
  width: 30px;
  font-size: 15px;
  position: absolute;
  top: 10px;
  z-index: 10000;
  &:hover {
    color: white;
  }
`

const IconBack = styled(IconButton)<{ opacity?: number }>`
  left: 20px;
  opacity: ${(props) => props.opacity};
`

const IconExit = styled(IconButton)`
  right: 20px;
`
const Dots = styled.span`
  &::after {
    display: inline-block;
    animation: ellipsis 1.25s infinite;
    content: '.';
    width: 1em;
    text-align: left;
  }
  @keyframes ellipsis {
    0% {
      content: '.';
    }
    33% {
      content: '..';
    }
    66% {
      content: '...';
    }
  }
`

const Overlay = styled.div`
  background: #82888b59;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  border-radius: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const Spinner = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);

  border-top: 2px solid grey;
  border-right: 2px solid grey;
  border-bottom: 2px solid grey;
  border-left: 4px solid black;
  background: transparent;
  width: 24px;
  height: 24px;
  border-radius: 50%;
`

interface Props {
  isOpen?: boolean
  isAbleToSubmit?: boolean
  onToggle?: VoidFunction
  onConnectWallet?: VoidFunction
  account?: any
  onBuy?: (number) => void
  onApprove?: VoidFunction
  toggleApprove?: VoidFunction
  isApprove?: boolean
  onDismiss?: VoidFunction
  isLoading?: boolean
}

const ModalBuy: React.FC<Props> = ({
  isOpen = true,
  onToggle,
  onConnectWallet,
  account,
  isAbleToSubmit = true,
  onBuy,
  onApprove,
  isApprove,
  onDismiss,
  isLoading,
}) => {
  const [number, setNumber] = useState(0)

  const [isGoToRandom, setGoToRandom] = useState(false)

  const [listRandom, setListRadom] = useState([])

  useEffect(() => {
    if (!isOpen) {
      setGoToRandom(false)
      setListRadom([])
      setNumber(0)
    }
  }, [isOpen])

  const onChangeInput = (e) => {
    const input = e.target.value
    const lastInput = input.substr(input.length - 1)
    const regex = /^[a-zA-Z]+$/
    if (lastInput.match(regex) || +input > 5) return
    setNumber(input)
  }

  const handleBuy = async () => {
    if (!number) {
      return false
    }
    await onBuy(listRandom)
    onDismiss()
    return true
  }

  const toggleRandom = () => {
    if (!number) {
      return
    }
    if (!isGoToRandom) {
      handleRandomize()
    }
    setGoToRandom(!isGoToRandom)
  }

  const handleRandomize = () => {
    const result = []
    for (let i = 0; i < number; i++) {
      const arr = []
      for (let j = 0; j < 4; j++) {
        arr.push(Math.floor(Math.random() * 9) + 1)
      }
      result.push(arr)
    }
    setListRadom(result)
  }
 const { t } = useTranslation();

  return (
    <ModalWrapper>
      {isLoading && (
        <Overlay>
          <Spinner />
        </Overlay>
      )}
      <StyledTicketImage
        width="90px"
        src="/images/burning-games/ticket.png"
        style={{ position: 'absolute', top: -20, zIndex: 10000000 }}
      />
      <Modal>
        <IconExit onClick={onDismiss}>X</IconExit>
        <IconBack onClick={toggleRandom} opacity={isGoToRandom ? 1 : 0}>
          {t('Back')}
        </IconBack>

        <ModalTitle>
          <Text fontSize="32px" fontWeight={700}>
            {t('Buy Tickets')}
          </Text>
        </ModalTitle>
        {isGoToRandom ? (
          <>
            <RowBetween>
              <Text fontWeight={300} color="text" fontSize="15px">
                {t('Total cost')}:
              </Text>
              <Text fontWeight={500} fontSize="15px" color="text">{`~${number * RATIO_WINERY_TICKET} CORK`}</Text>
            </RowBetween>
            <FooterText>
              {t('Numbers are randomized, with no duplicates among your tickets. Available digits 0-9')}
            </FooterText>
            <OutlineButton variant="secondary" onClick={handleRandomize}>
              {t('Randomize')}
            </OutlineButton>
            <div style={{ maxHeight: 400, overflowY: 'scroll', marginTop: 10 }}>
              {listRandom?.map((item, index) => (
                <WrapTicket key={index?.toString()}>
                  <Text fontWeight={500}>{`#00${index + 1}`}</Text>
                  <RowTicket>
                    <TextTicket>{item[0]}</TextTicket>
                    <TextTicket>{item[1]}</TextTicket>
                    <TextTicket>{item[2]}</TextTicket>
                    <TextTicket>{item[3]}</TextTicket>
                  </RowTicket>
                </WrapTicket>
              ))}
            </div>

            <Line style={{ marginBottom: 20, marginTop: 20 }} />
            <ModalSubmit
              disabled={isLoading}
              style={{ cursor: isAbleToSubmit ? 'pointer' : 'not-allowed' }}
              onClick={handleBuy}
            >
              {t('Buy Instantly')}
              {isLoading && <Dots />}
            </ModalSubmit>
          </>
        ) : (
          <>
            <ModalInner>
              <ModalDetail>
                <PriceCalculate>
                  <Text fontWeight={600} color="text">
                    {t('Buy')}:
                  </Text>
                  <TicketInput
                    onChange={onChangeInput}
                    placeholder={t('Maximum 5 tickets')}
                    value={number}
                    type="number"
                    max="9"
                  />
                  <StyledTicketImage width="24px" src="/images/burning-games/tr.e32d78bc.png" />
                </PriceCalculate>
                <Text fontWeight={300} fontSize="15px" style={{ flex: 1, textAlign: 'end' }}>{`~${
                  number * RATIO_WINERY_TICKET
                } CORK`}</Text>
              </ModalDetail>
            </ModalInner>
            <RowBetween>
              <Text fontWeight={300} color="text" fontSize="15px">
                0% {t('Bulk discount')}
              </Text>
              <Text fontWeight={400} fontSize="15px" color="text">
                ~0 CORK
              </Text>
            </RowBetween>
            <Line />
            <RowBetween>
              <Text fontWeight={300} fontSize="15px" color="text">
                {t('You pay')}
              </Text>
              <Text fontWeight={600} fontSize="15px" color="text">{`~${number * RATIO_WINERY_TICKET} CORK`}</Text>
            </RowBetween>
            <ModalSubmitWrapper>
              {account ? (
                <RoundWrap>
                  {isApprove ? (
                    <ModalSubmit disabled={isLoading || !(number > 0)} onClick={toggleRandom}>
                      {t('Buy Instantly')}
                      {isLoading && <Dots />}
                    </ModalSubmit>
                  ) : (
                    <ModalSubmit disabled={isLoading || !(number > 0)} onClick={onApprove}>
                      {t('approve')}
                      {isLoading && <Dots />}
                    </ModalSubmit>
                  )}
                </RoundWrap>
              ) : (
                <ModalSubmit onClick={onConnectWallet}>{t('Connect wallet')}</ModalSubmit>
              )}
            </ModalSubmitWrapper>
            <FooterText>
              {t(
                `"Buy Instantly" chooses random numbers, with no duplicates among your tickets. Purchases are ﬁnal. Maximum 5 tickets`,
              )}
            </FooterText>
          </>
        )}
      </Modal>
    </ModalWrapper>
  )
}

export default memo(ModalBuy)
