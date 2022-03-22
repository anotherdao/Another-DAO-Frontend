/* eslint-disable no-await-in-loop */
import React, { useEffect, useState } from 'react'
import {
  useMatchBreakpoints,
  Text,
  useWalletModal,
  Spinner,
  GradientButton
} from '@apeswapfinance/uikit'
import useTheme from 'hooks/useTheme'
import { useWeb3React } from '@web3-react/core'
import useAuth from 'hooks/useAuth'
import useWeb3 from 'hooks/useWeb3'

import { useToast } from 'state/hooks'

import { useLottery, useWineryToken, useLotteryTicket } from 'hooks/useContract'
import { useLotteryAddress } from 'hooks/useAddress'

import {
  HeadingContainer,
  Header,
  StyledHeading,
  HeadingTextWrapper,
  StyledPage,
  SubtitleHeading,
  ContainerPrincipal,
  TicketButtonWrapper,
  shakingAnimate,
  scaleAnimate,
  StyledTicketImage,
  ModalHeading,
  ModalHeadingRight,
  ModalDetail,
  TicketInput,
  PriceCalculate,
  LotteryWrapper,
  LotteryNumberWrapper,
  NumberInput,
  STicketButton,
  WinButton,
  STicketInactiveButton,
  ModalSubmit,
  ModalSubmitWrapper,
  STimeWrapper,
  Timer,
  TimerHeading,
  TimerCountDown,
  ModalTimerCountDown,
  TimerStyledText,
  StyledHeaderImage,
  Overlay,
  ModalWrapper,
  Modal,
  ModalTitle,
  ModalInner,
  StyledButtonSquare,
  FinishedRoundsWrapper,
  RoundDetailWrapper,
  RoundDetailRound,
  RoundWinningNumber,
  RoundWrap,
  StyledTextRound
} from './stylesOld'

function zeroPadding(num, digit) {
  let zero = ''
  for (let i = 0; i < digit; i++) {
    zero += '0'
  }
  return (zero + num).slice(-digit)
}

const BurningGames: React.FC = () => {
  const { account } = useWeb3React()
  const web3 = useWeb3()

  const lotteryNFTContract = useLotteryTicket()
  const lotterContract = useLottery()
  const wineryTokenContract = useWineryToken()
  const lotteryAddress = useLotteryAddress()

  const { toastError, toastSuccess } = useToast()

  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)
  const [isBuyTicket, setBuyTicket] = useState(false)
  const [ticketInput, setTicketInput] = useState('')
  const [lotteryNum, setLotteryNum] = useState('')
  const [winningNumbers, setWinningNumbers] = useState('0000')
  const [rounds, setRounds] = useState(0)
  const [isLoading, setLoading] = useState(false)
  const [timer, setTimer] = useState({
    hour: '0',
    minute: '0',
    second: '0',
  })
  const [listUserDraw, setListUserDraw] = useState([])
  const [listUserFinish, setListUserFinish] = useState([])
  const [isDrawing, setIsDrawing] = useState(false);

  const [nextDraw, setNextDraw] = useState(0)

  const isAbleToSubmit = lotteryNum?.length === 4 && account !== '' && !isLoading

  if (lotterContract) {
    lotterContract.events.Reset({}, (err, result) => {
      if (err || isLoading) return
      fetchData()
    })
    lotterContract.events.Buy({}, (err) => {
      if (err || isLoading) return
      fetchData()
    })
    lotterContract.events.MultiBuy({}, (err) => {
      if (err || isLoading) return
      fetchData()
    })
    lotterContract.events.MultiBuy({}, (err) => {
      if (err || isLoading) return
      fetchData()
    })
    
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lotterContract, wineryTokenContract, account])

  useEffect(() => {
    const timerID = setInterval(updateTime, 1000)
    return () => clearInterval(timerID)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextDraw])

  function updateTime() {
    const date1 = nextDraw
    const now = new Date().getTime()

    if (date1 - now < 0) {
      return
    }

    // Find the distance between now and the count down date
    const distance = date1 - now

    // Time calculations for days, hours, minutes and seconds
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((distance % (1000 * 60)) / 1000)

    setTimer({
      hour: zeroPadding(hours, 2),
      minute: zeroPadding(minutes, 2),
      second: zeroPadding(seconds, 2),
    })
  }

  const fetchData = async () => {
    if (!lotterContract || !wineryTokenContract || isLoading) {
      return
    }

    setLoading(true)
    const [round, timeDraw] = await Promise.all([
      lotterContract?.methods?.issueIndex()?.call(),
      lotterContract?.methods?.nextTimeDraw()?.call(),
    ])

    setNextDraw(timeDraw)
    setRounds(Number(round || 0) + 1)

    await Promise.allSettled([getListLotteryOfUserFinish(round), getListLotteryOfUserNow(round)])

    try {
      const [numOne, numTwo, numThree, numFour] = await Promise.all([
        lotterContract?.methods?.historyNumbers(round - 1, 0)?.call(),
        lotterContract?.methods?.historyNumbers(round - 1, 1)?.call(),
        lotterContract?.methods?.historyNumbers(round - 1, 2)?.call(),
        lotterContract?.methods?.historyNumbers(round - 1, 3)?.call(),
      ])

      if (!Number.isNaN(numOne) || numOne >= 0) {
        setWinningNumbers(`${numOne}${numTwo}${numThree}${numFour}`)
      }
    } catch (e) {
      console.log(e)
    }

    setLoading(false)
  }

  const approveTransaction = async () => {
    setLoading(true)
    try {
      const coin = web3.utils.toWei('1000000')

      await wineryTokenContract.methods.approve(lotteryAddress, coin).send({ from: account })
      toastSuccess('Transaction Success')
    } catch (e) {
      toastSuccess('Transaction failed, please try again!!!')
    }

    setLoading(false)
  }

  const buyTransaction = async (numCoin) => {
    setLoading(true)
    try {
      const coin = web3.utils.toWei(numCoin)
      const arrNum = lotteryNum.split('').map((item) => +item)

      await lotterContract.methods.buy(coin, arrNum).send({ from: account })
      await getListLotteryOfUserNow(rounds - 1)
      toastSuccess('Transaction Success')
    } catch (e) {
      toastError('Transaction failed, please try again!!!')
    }
    setLoading(false)
  }

  // eslint-disable-next-line consistent-return
  const clainReward = async (tokenId, index) => {
    if (listUserFinish[index]?.isClaimed) {
      return toastSuccess('Reward claimed')
    }
    setLoading(true)
    try {
      const dataClone = [...listUserFinish]
      dataClone[index].isClaimed = true

      await lotterContract?.methods?.claimReward(tokenId)?.send({ from: account })
      setListUserFinish(dataClone)
      return toastSuccess('Reward claimed')
    } catch (e) {
      toastError('Transaction failed, please try again!!!')
    }
    setLoading(false)
  }

  const getListLotteryOfUserNow = async (roundNow) => {
    try {
      const tokenList = await lotterContract?.methods?.getUserHistory(account, roundNow || rounds)?.call()
      const list = []
      // eslint-disable-next-line no-restricted-syntax
      for (const item of tokenList) {
        // eslint-disable-next-line no-await-in-loop
        const tokenInfo = await lotteryNFTContract?.methods?.getLotteryNumbers(item)?.call()
        list.push(tokenInfo)
      }
      setListUserDraw(list)
    } catch (e) {
      console.log(e)
    }
  }

  const getListLotteryOfUserFinish = async (roundNow) => {
    const tokenList = await lotterContract?.methods?.getUserHistory(account, roundNow - 1)?.call()
    const list = []
    // eslint-disable-next-line no-restricted-syntax
    for (const item of tokenList) {
      // eslint-disable-next-line no-await-in-loop
      const [isClaimed, tokenInfo, rewardView] = await Promise.all([
        lotteryNFTContract?.methods?.claimInfo(item)?.call(),
        lotteryNFTContract?.methods?.getLotteryNumbers(item)?.call(),
        lotterContract?.methods?.getRewardView(item)?.call(),
      ])
      list.push({ tokenId: item, tokenInfo, isWin: rewardView > 0, isClaimed })
    }
    setListUserFinish(list)
  }

  const { isXl: isDesktop } = useMatchBreakpoints()
  const { isDark } = useTheme()
  const onTicketChangeHandler = (e) => {
    const input = e.target.value
    const lastInput = input.substr(input.length - 1)
    const regex = /^[a-zA-Z]+$/
    if (lastInput.match(regex)) return
    setTicketInput(input)
  }
  let banner = ''

  const onBuyTicketClickHandler = async () => {
    setBuyTicket(true)
  }

  const onLotteryNumChangeHandler = (e) => {
    const input = e.target.value
    setLotteryNum(input)
  }
  const onModalCloseHandler = () => {
    setBuyTicket(false)
  }
  if (!isDark && isDesktop) banner = 'burning.svg'
  if (isDark && isDesktop) banner = 'burning-night.svg'
  if (!isDark && !isDesktop) banner = 'burning-mobile.png'
  if (isDark && !isDesktop) banner = 'burning-night-mobile.png'

  return (
    <>
      <ContainerPrincipal isDark={!isDark} style={{ cursor: isLoading ? 'wait' : 'pointer', position: 'relative' }}>
        <div
          style={{ position: 'sticky', top: 20, left: 50, zIndex: 100000, paddingLeft: 15, opacity: isLoading ? 1 : 0 }}
        >
          <Spinner size={150} />
        </div>
        <Overlay isOpen={isBuyTicket}>
          <ModalWrapper>
            <Modal>
              <ModalTitle>
                <Text fontSize="32px" fontWeight={700}>
                  Buy Tickets
                </Text>
                <StyledButtonSquare onClick={onModalCloseHandler}>X</StyledButtonSquare>
              </ModalTitle>
              <ModalInner>
                <ModalHeading>
                  <Text>Buy:</Text>
                  <ModalHeadingRight>
                    <Text>Tickets</Text>
                    <StyledTicketImage width="24px" src="/images/burning-games/tr.e32d78bc.png" />
                  </ModalHeadingRight>
                </ModalHeading>
                <ModalDetail>
                  <PriceCalculate>
                    <TicketInput
                      onChange={onTicketChangeHandler}
                      placeholder="Insert coin amounts"
                      value={ticketInput}
                    />

                    <StyledTicketImage
                      width="24px"
                      src="/images/burning-games/logoicon.c35741bc.png"
                    />
                  </PriceCalculate>
                </ModalDetail>

                <LotteryWrapper>
                  <Text
                    textTransform="capitalize"
                    textAlign="center"
                    fontWeight={700}
                    fontSize="24px"
                    marginBottom={12}
                  >
                    pick your tickets number
                  </Text>
                  <LotteryNumberWrapper>
                    <NumberInput
                      style={{ width: '100%', letterSpacing: 20, fontWeight: '500', fontSize: 30 }}
                      maxLength={4}
                      type="phone"
                      onChange={onLotteryNumChangeHandler}
                    />
                  </LotteryNumberWrapper>
                </LotteryWrapper>
              </ModalInner>
              <ModalTimerCountDown>
                <Text fontWeight={700}> {`${timer?.hour}h`}</Text>
                <Text fontWeight={700}>{`${timer.minute}`}m</Text>
                <Text fontWeight={700}>{`${timer.second}`}s</Text>
              </ModalTimerCountDown>
              <ModalSubmitWrapper>
                {account ? (
                  <RoundWrap>
                    <ModalSubmit
                      disabled={!isAbleToSubmit}
                      style={{ cursor: isAbleToSubmit ? 'pointer' : 'not-allowed' }}
                      onClick={approveTransaction}
                    >
                      Approve
                    </ModalSubmit>
                    <ModalSubmit
                      disabled={!isAbleToSubmit}
                      style={{ cursor: isAbleToSubmit ? 'pointer' : 'not-allowed' }}
                      onClick={buyTransaction}
                    >
                      Submit
                    </ModalSubmit>
                  </RoundWrap>
                ) : (
                  <ModalSubmit onClick={onPresentConnectModal}>Unlock Wallet</ModalSubmit>
                )}
              </ModalSubmitWrapper>
            </Modal>
          </ModalWrapper>
        </Overlay>
        <Header banner={banner}>
          <HeadingContainer>
            <StyledHeaderImage src="/images/burning-games/ticket.9bf292aa.png" alt="ticket banner" />
            <HeadingTextWrapper>
              <StyledHeading as="h1" mb="12px" mt={0} color="white" fontFamily="TitanOne">
                The Wine Lottery
              </StyledHeading>
              <SubtitleHeading isMobile={!isDesktop} fontFamily="Montserrat" fontWeight={400} color="white">
                Partners Supporting The Jungle
              </SubtitleHeading>
              {listUserDraw?.length ? (
                <>
                  <SubtitleHeading isMobile={!isDesktop} fontFamily="Montserrat" fontWeight={600}>
                    Your choice in this round
                  </SubtitleHeading>
                  <TicketButtonWrapper style={{ marginTop: 10, maxWidth: '60%', flexWrap: 'wrap', overflow: 'hidden' }}>
                    {listUserDraw.map((item, index) => (
                      <ModalSubmit
                        key={item.join('') + index.toString()}
                        style={{ marginTop: 10, marginLeft: 10, marginBottom: 10 }}
                      >
                        {item.join('')}
                      </ModalSubmit>
                    ))}
                  </TicketButtonWrapper>
                </>
              ) : (
                <></>
              )}
            </HeadingTextWrapper>
          </HeadingContainer>
        </Header>

        <StyledPage
        // width="1130px"
        >
          <STimeWrapper>
            <Timer>
              <TimerHeading fontWeight={700} fontSize="32px">
                Get your tickets now
              </TimerHeading>
              <TimerCountDown>
                {`${timer?.hour}`}
                <TimerStyledText>h</TimerStyledText>
                {`${timer?.minute}`}
                <TimerStyledText>m</TimerStyledText>
                {`${timer?.second}`}
                <TimerStyledText>s</TimerStyledText>
              </TimerCountDown>
              <TimerHeading fontWeight={700} fontSize="32px">
                until the draw
              </TimerHeading>
            </Timer>
          </STimeWrapper>
          <TicketButtonWrapper>
            <StyledTicketImage width="200px" src="/images/burning-games/tl.6c853bae.png" />
            <GradientButton >Connect wallet</GradientButton>

            {/* <STicketButton onClick={onBuyTicketClickHandler}>Buy tickets</STicketButton> */}
            <StyledTicketImage width="200px" src="/images/burning-games/tr.e32d78bc.png" />
          </TicketButtonWrapper>
          <FinishedRoundsWrapper style={rounds > 0 ? {} : { display: 'none' }}>
            <Text textAlign="center" paddingTop={16} fontSize="32px" color="primaryBright" fontWeight={700}>
              {`Finished Rounds ${rounds - 1}`}
            </Text>
            {listUserFinish?.length ? (
              <>
                <Text paddingLeft={20} fontSize="20px" fontWeight={600}>
                  Your ticket
                </Text>
                <TicketButtonWrapper
                  style={{
                    marginTop: 10,
                    marginRight: 20,
                    marginLeft: 20,
                    width: 'auto',
                    flexWrap: 'wrap',
                    overflow: 'hidden',
                  }}
                >
                  {listUserFinish.map((item, index) =>
                    item?.isWin ? (
                      <WinButton
                        onClick={() => clainReward(item?.tokenId, index)}
                        disabled={isLoading || item?.isClaimed}
                        key={item?.tokenId}
                        style={{ marginTop: 10, marginBottom: 10, animation: item?.isClaimed ? 'none' : '' }}
                      >
                        {`${item?.tokenInfo?.join('')} - ${item?.isClaimed ? 'claimed' : 'claim'}`}
                      </WinButton>
                    ) : (
                      <STicketInactiveButton key={item?.tokenId} disabled style={{ marginTop: 10, marginBottom: 10 }}>
                        {item?.tokenInfo?.join('')}
                      </STicketInactiveButton>
                    ),
                  )}
                </TicketButtonWrapper>
              </>
            ) : (
              <></>
            )}
            <RoundDetailWrapper>
              <RoundWinningNumber>
                <Text fontWeight={700} fontSize="36px">
                  Winning Number
                </Text>
                <Text fontWeight={700} fontSize="8rem">
                  {winningNumbers}
                </Text>
              </RoundWinningNumber>
            </RoundDetailWrapper>
            <RoundDetailRound>
              <RoundWrap style={{ justifyContent: 'flex-start' }}>
                <Text fontWeight={700} color="primaryBright">
                  Total Round:
                </Text>
                <StyledTextRound color="primaryBright">{rounds}</StyledTextRound>
              </RoundWrap>
            </RoundDetailRound>
          </FinishedRoundsWrapper>
        </StyledPage>
      </ContainerPrincipal>
    </>
  )
}

export default BurningGames
