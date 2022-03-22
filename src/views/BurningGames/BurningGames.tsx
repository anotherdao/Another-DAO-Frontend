/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
import React, { useEffect, useState } from 'react'
import { Text, useWalletModal, useModal, Skeleton } from '@apeswapfinance/uikit'

import { useWeb3React } from '@web3-react/core'
import useAuth from 'hooks/useAuth'
import useWeb3 from 'hooks/useWeb3'

import { useToast, usePriceBananaBusd } from 'state/hooks'

import { useTranslation } from 'react-i18next'



import { useLottery, useWineryToken, useLotteryTicket } from 'hooks/useContract'
import { useLotteryAddress, useWineryAddress } from 'hooks/useAddress'
import HistoryButton from './components/HistoryButton'
import FinishRound from './components/FinishRound'
import YourHistory from './components/YourHistory'
import ModalBuy from './components/ModalBuy'

import {
  ContainerPrincipal,
  StyledHeaderImage,
  FlexRow,
  RightContent,
  LeftContent,
  ContainerImage,
  StyledHeaderBackground,
  StyledFinishRound,
  TextPriceLeft,
  RowCenter,
} from './styles'
import RightCard from './components/RightCard'

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

  const { login, logout } = useAuth()
  const { onPresentConnectModal } = useWalletModal(login, logout)

  const bananaPriceUsd = usePriceBananaBusd()
  const bananaPriceUsdDisplay = bananaPriceUsd.toNumber()

  const lotteryNFTContract = useLotteryTicket()
  const lotteryContract = useLottery()
  const wineryTokenContract = useWineryToken()

  // address
  const lotteryAddress = useLotteryAddress()

  const [rounds, setRounds] = useState(0)
  const [isLoading, setLoading] = useState(false)
  const [timer, setTimer] = useState({
    hour: '0',
    minute: '0',
    second: '0',
  })

  const [tab, setTab] = useState(0)

  const [nextDraw, setNextDraw] = useState(0)
  const { toastError, toastSuccess } = useToast()

  const [winningNumbers, setWinningNumbers] = useState('0000')

  const [listUserFinish, setListUserFinish] = useState([])

  const [isApproveToTransfer, setApprove] = useState(true)

  const [dataRoundOld, setDataRoundOld] = useState({ total: 0 })
  const [dataRoundCurrent, setDataRoundCurrent] = useState({ total: 0 })

  const [isDrawing, setDrawing] = useState(false)
  const [isClaiming, setClaiming] = useState(false)
  const [isFetchingHistory, setFetchingHistory] = useState(false)

  useEffect(() => {
    fetchData()
    if (lotteryContract) {
      try {
        lotteryContract.once('MultiBuy', {}, function (error, event) {
          if (error) {
            console.log('MultiBuy', error)
          } else {
            fetchData()
          }
        })

        lotteryContract.once('Reset', {}, function (error, event) {
          if (error) {
            console.log('Reset', error)
          } else {
            fetchData()
          }
        })

        lotteryContract.once('Drawing', {}, function (error, event) {
          if (error) {
            console.log('Drawing', error)
          } else {
            setDrawing(true)
          }
        })
      } catch (e) {
        console.log(e)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lotteryContract, wineryTokenContract, account])

  useEffect(() => {
    if (account && rounds > 1) {
      getListLotteryOfUserFinish(rounds - 2)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, rounds])

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

  /** Handle Logic Transaction */
  const fetchData = async () => {
    if (!lotteryContract || !wineryTokenContract || isLoading) {
      return
    }

    setLoading(true)
    try {
      // Check user approve to transfer token
      if (account) {
        const totalAllow = await wineryTokenContract.methods.allowance(account, lotteryAddress).call()

        if (totalAllow <= 10) {
          setApprove(false)
        }
      }

      const [round, timeDraw, drawing] = await Promise.all([
        lotteryContract?.methods?.issueIndex()?.call(),
        lotteryContract?.methods?.nextTimeDraw()?.call(),
        lotteryContract?.methods?.drawed()?.call(),
      ])

      setDrawing(drawing)

      setNextDraw(timeDraw)
      setRounds(Number(round || 0) + 1)

      if (round >= 1) {
        await getDataRoundOld(round - 1)
      }

      getDataRoundCurrent()
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
      setDrawing(false)
    }
  }

  const approveTransaction = async () => {
    setLoading(true)
    try {
      const coin = web3.utils.toWei('10000000000')

      await wineryTokenContract.methods.approve(lotteryAddress, coin).send({ from: account })
      toastSuccess('Transaction Success')

      setApprove(true)
    } catch (e) {
      toastSuccess('Transaction failed, please try again!!!')
    }

    setLoading(false)
  }

  const buyTransaction = async (arrTicket) => {
    setLoading(true)
    try {
      const coin = web3.utils.toWei('10')

      await lotteryContract.methods.multiBuy(coin, arrTicket).send({ from: account })

      toastSuccess('Transaction Success')

      setTab(1)
      await getDataRoundOld(rounds - 1)
      setOpenBuy(false)
      onPresentBuyModal()
    } catch (e) {
      toastError('Transaction failed, please try again!!!')
    }

    setLoading(false)
  }

  const [isOpenModalBuy, setOpenBuy] = useState(false)

  const toggleModalBuy = () => setOpenBuy(!isOpenModalBuy)

  const [onPresentBuyModal] = useModal(
    <ModalBuy
      account={account}
      isOpen={isOpenModalBuy}
      onToggle={toggleModalBuy}
      onConnectWallet={onPresentConnectModal}
      onApprove={approveTransaction}
      onBuy={buyTransaction}
      isApprove={isApproveToTransfer}
      onDismiss={toggleModalBuy}
      isLoading={isLoading}
    />,
    true,
    true,
    'modalBuyTicket',
  )

  const getDataRoundOld = async (round) => {
    setFetchingHistory(true)
    if (round === rounds - 1) {
      await getListLotteryOfUserNow(round)
      setWinningNumbers(`0000`)
    } else {
      const total = await lotteryContract?.methods?.historyAmount(round, 0)?.call()

      const coin = web3.utils.fromWei(total)

      try {
        const [numOne, numTwo, numThree, numFour] = await Promise.all([
          lotteryContract?.methods?.historyNumbers(round, 0)?.call(),
          lotteryContract?.methods?.historyNumbers(round, 1)?.call(),
          lotteryContract?.methods?.historyNumbers(round, 2)?.call(),
          lotteryContract?.methods?.historyNumbers(round, 3)?.call(),
        ])

        if (!Number.isNaN(numOne) || numOne >= 0) {
          setWinningNumbers(`${numOne}${numTwo}${numThree}${numFour}`)
        }

        await getListLotteryOfUserFinish(round)
        setDataRoundOld({
          total: +coin,
        })
      } catch (e) {
        console.log(e)
      }
    }

    setFetchingHistory(false)
  }

  const getDataRoundCurrent = async () => {
    setLoading(true)
    const total = await lotteryContract?.methods?.totalAmount()?.call()
    const coin = web3.utils.fromWei(total)

    setDataRoundCurrent({
      total: +coin,
    })
    setLoading(false)
  }

  const getListLotteryOfUserFinish = async (roundNow) => {
    try {
      if (!account) {
        return
      }
      const tokenList = await lotteryContract?.methods?.getUserHistory(account, roundNow)?.call()
      const list = []
      // eslint-disable-next-line no-restricted-syntax
      for (const item of tokenList) {
        // eslint-disable-next-line no-await-in-loop
        const [isClaimed, tokenInfo, rewardView] = await Promise.all([
          lotteryNFTContract?.methods?.claimInfo(item)?.call(),
          lotteryNFTContract?.methods?.getLotteryNumbers(item)?.call(),
          lotteryContract?.methods?.getRewardView(item)?.call(),
        ])
        list.push({
          tokenId: item,
          tokenInfo,
          isWin: rewardView > 0,
          isClaimed,
          reward: web3.utils.fromWei(rewardView),
        })
      }
      setListUserFinish(list)
    } catch (e) {
      console.log(e)
    }
  }

  const getListLotteryOfUserNow = async (roundNow) => {
    try {
      if (!account) {
        return
      }

      const tokenList = await lotteryContract?.methods?.getUserHistory(account, roundNow)?.call()
      const list = []
      // eslint-disable-next-line no-restricted-syntax
      for (const item of tokenList) {
        // eslint-disable-next-line no-await-in-loop
        const tokenInfo = await lotteryNFTContract?.methods?.getLotteryNumbers(item)?.call()
        list.push({ tokenId: item, tokenInfo, isWin: false, isClaimed: false, reward: 0 })
      }
      setListUserFinish(list)
    } catch (e) {
      console.log(e)
    }
  }

  // eslint-disable-next-line consistent-return
  const handleClaimReward = async (tokenId, index) => {
    if (listUserFinish[index]?.isClaimed) {
      return toastSuccess('Reward claimed')
    }
    setClaiming(true)
    try {
      const dataClone = [...listUserFinish]
      dataClone[index].isClaimed = true

      await lotteryContract?.methods?.claimReward(tokenId)?.send({ from: account })
      setListUserFinish(dataClone)
      return toastSuccess('Reward claimed')
    } catch (e) {
      toastError('Transaction failed, please try again!!!')
    } finally {
      setClaiming(false)
    }
  }

  const { t } = useTranslation();

  return (
    <ContainerPrincipal>
      <FlexRow>
        <LeftContent>
          <ContainerImage>
            <StyledHeaderImage src="/images/burning-games/gif_lottery.png" alt="ticket banner" />
            <StyledHeaderBackground src="/images/burning-games/overlay.png" alt="ticket background" />
          </ContainerImage>

          <Text fontWeight={600} fontSize="24px" color="text">
            {t('The Winery Lottery')}
          </Text>
          {isLoading ? (
            <RowCenter>
              <Skeleton animation="waves" height={40} width={200} />
            </RowCenter>
          ) : (
            <TextPriceLeft fontWeight={800} fontSize="70px" color="primaryBright">
              {`~ $${(bananaPriceUsdDisplay * dataRoundCurrent?.total || 0).toFixed(2)}`}
            </TextPriceLeft>
          )}
          <Text fontWeight={600} fontSize="24px" color="text">
            {t('in prizes')}
          </Text>
        </LeftContent>
        <RightContent>
          <RightCard
            onOpenBuy={onPresentBuyModal}
            timer={timer}
            round={rounds}
            isAbleToMake={!isLoading}
            dataRoundCurrent={dataRoundCurrent}
            isDrawing={isDrawing}
            nextTimeDraw={nextDraw}
          />
        </RightContent>
      </FlexRow>
      <div>
        <StyledFinishRound>
          <Text fontSize="30px" fontWeight={700}>
            {t('Finished Round')}
          </Text>
          <HistoryButton isAll={tab} onChange={(num) => setTab(num)} />
          <YourHistory
            currentRow={rounds}
            onChangeRound={getDataRoundOld}
            onClaim={handleClaimReward}
            data={listUserFinish}
            winningNumber={winningNumbers}
            isLoading={isFetchingHistory}
            isClaiming={isClaiming}
            isHidden={tab === 0}
          />
          <FinishRound
            currentRow={rounds}
            onChangeRound={getDataRoundOld}
            winningNumber={winningNumbers}
            data={dataRoundOld}
            isLoading={isFetchingHistory}
            isHidden={tab === 1}
          />
        </StyledFinishRound>
      </div>
    </ContainerPrincipal>
  )
}

export default BurningGames
