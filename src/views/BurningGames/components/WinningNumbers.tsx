import React, { useEffect, useState } from 'react'
import { Flex, FlexProps, Skeleton } from '@apeswapfinance/uikit'
import random from 'lodash/random'
import uniqueId from 'lodash/uniqueId'
import { BallWithNumber } from './Balls'

export const parseRetrievedNumber = (number: string): string => {
  const numberAsArray = number.split('')
  numberAsArray.splice(0, 1)
  numberAsArray.reverse()
  return numberAsArray.join('')
}

interface WinningNumbersProps extends FlexProps {
  number: string
  size?: string
  fontSize?: string
  rotateText?: boolean,
  isLoading?: boolean
}

const WinningNumbers: React.FC<WinningNumbersProps> = ({
  number,
  size = '32px',
  fontSize = '16px',
  rotateText = true,
  isLoading
}) => {
  const [rotationValues, setRotationValues] = useState([])
  const numAsArray = number.split('')
  const colors = ['pink', 'lilac', 'teal', 'aqua', 'green', 'yellow']

  useEffect(() => {
    if (rotateText && numAsArray && rotationValues.length === 0) {
      setRotationValues(numAsArray.map(() => random(-30, 30)))
    }
  }, [rotateText, numAsArray, rotationValues])

  return (
    <Flex>
      {numAsArray.map((num, index) => {
        return (
          isLoading ?
            <Skeleton key={uniqueId()}
              width={size}
              height={size}
              variant="circle"
              animation='waves'
              ml={1} />
            : <BallWithNumber
              key={uniqueId()}
              rotationTransform={rotationValues[index]}
              size={size}
              fontSize={fontSize}
              color={colors[index]}
              number={num}
            />
        )
      })}
    </Flex>
  )
}

export default WinningNumbers
