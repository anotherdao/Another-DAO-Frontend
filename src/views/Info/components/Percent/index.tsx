import React from 'react'
import styled from 'styled-components'
import { Text } from '@apeswapfinance/uikit'

const isNegative = (value: number): boolean => value < 0

const Percent = (props) => {
  const { value } = props
  return (
    <Text {...props} color={value !== 0 && isNegative(value) ? 'failure' : 'success'}>
      {isNegative(value) ? '↓ ' : '↑ '}
      {Math.abs(value).toFixed(2)}%
    </Text>
  )
}

export default Percent
