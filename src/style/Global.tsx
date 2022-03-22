import { createGlobalStyle } from 'styled-components'
// eslint-disable-next-line import/no-unresolved
import { ApeSwapTheme } from '@apeswapfinance/uikit/dist/theme'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends ApeSwapTheme {}
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Montserrat', sans-serif;
  }
  body {
    background: ${({ theme }) =>
      theme.isDark ? '#333' : 'linear-gradient(131.34deg, #FCE0DF 24.48%, #FEE0F8 84.84%, #FEE0F8 84.84%) '};
    img {
      height: auto;
      max-width: 100%;
    }
  }
`

export default GlobalStyle
