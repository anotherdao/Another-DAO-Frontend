import { BASE_ADD_LIQUIDITY_URL, BASE_LIQUIDITY_POOL_URL } from 'config'

export const HOME = {
  label: 'Home',
  icon: 'HomeIcon',
  href: '/',
}

export const EXCHANGE = {
  label: 'Trade',
  icon: 'TradeIcon',
  items: [
    {
      label: 'Exchange',
      href: BASE_ADD_LIQUIDITY_URL
    },
    {
      label: 'Liquidity',
      href: BASE_LIQUIDITY_POOL_URL
    },
  ],
}

export const MORE_INFO = {
  label: 'More',
  icon: 'MoreIcon',
  items: [
    {
      label: 'Github',
      href: 'https://github.com/winery-land',
    },
    {
      label: 'Docs',
      href: 'https://winery.gitbook.io/internal-wiki/',
    },
    {
      label: 'Blog',
      href: 'https://winery-official.medium.com/',
    },
    {
      label:'Privacy Policy',
      href:'/WineryPrivacyPolicy.pdf'
    },
    {
      label:'Terms Of Service',
      href:'/WineryTermsOfServices.pdf'
    }
    // {
    //   label: 'Partnership Application',
    //   href: 'https://docs.google.com/forms/d/e/1FAIpQLSdiC4jpKQAYD4iALGrm9ErmDIs1xtsOENu9GsvgdczVwe_uOw/viewform?usp=sf_link',
    // },
  ],
}
