import styled from 'styled-components'
import { Text, Flex } from '@apeswapfinance/uikit'
import LeftArrow from '../LeftArrow'


export const ClickableColumnHeader = styled(Text)`
  & span {
    cursor:pointer;
  }
`

export const SpanButton = styled.span`
  
`
export const ResponsiveTokensGrid = styled.div`
  display: grid;
  grid-gap: 1em;

  align-items: center;

  padding:12px 24px;

  grid-template-columns: 20px 3fr repeat(4, 1fr);

  @media screen and (max-width: 900px) {
    grid-template-columns: 20px 2fr repeat(3, 1fr);
    & :nth-child(4) {
      display: none;
    }
  }

  @media screen and (max-width: 800px) {
    grid-template-columns: 20px 2fr repeat(2, 1fr);
    & :nth-child(6) {
      display: none;
    }
  }

  @media screen and (max-width: 670px) {
    grid-template-columns: 1fr 1fr;
    > *:first-child {
      display: none;
    }
    > *:nth-child(3) {
      display: none;
    }
  }
`

export const ResponsivePoolsGrid = styled.div`
  display: grid;
  grid-gap: 1em;
  align-items: center;
  grid-template-columns: 20px 3.5fr repeat(5, 1fr);
  padding:12px 24px;

  /* padding: 0 24px; */
  @media screen and (max-width: 900px) {
    grid-template-columns: 20px 1.5fr repeat(3, 1fr);
    & :nth-child(4),
    & :nth-child(5) {
      display: none;
    }
  }
  @media screen and (max-width: 500px) {
    grid-template-columns: 20px 1.5fr repeat(1, 1fr);
    & :nth-child(4),
    & :nth-child(5),
    & :nth-child(6),
    & :nth-child(7) {
      display: none;
    }
  }
  @media screen and (max-width: 480px) {
    grid-template-columns: 2.5fr repeat(1, 1fr);
    > *:nth-child(1) {
      display: none;
    }
  }
`

export const TableWrapper = styled(Flex)`
  width: 100%;
  padding: 16px 0;
  flex-direction: column;
  /* gap: 16px; */
  background-color: ${({ theme }) => theme.card.background};
  border-radius: ${({ theme }) => theme.radii.card};
  border: 1px solid ${({ theme }) => theme.colors.textSubtle};
`

export const PageButtons = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.2em;
  margin-bottom: 1.2em;
`

export const Arrow = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  padding: 0 20px;
  :hover {
    cursor: pointer;
  }
`

export const Break = styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.secondaryContainer};
  width: 100%;
`

export const PaginatingSection = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const LeftArrowIcon = styled(LeftArrow)<{ disabled: boolean }>`
  transition: 0.2s ease-out;
  ${({ theme, disabled }) =>
    disabled
      ? `color:${theme.colors.textSubtle}; cursor: not-allowed;`
      : `color:${theme.colors.secondary}; cursor:pointer;`};
`

export const RightArrowIcon = styled(LeftArrowIcon)<{ disabled: boolean }>`
  transform: rotate(180deg);
`

export const PaginatingContent = styled(Text)``
