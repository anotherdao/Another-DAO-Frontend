import { MenuEntry } from '@apeswapfinance/uikit'
import { CHAIN_ID, NETWORK_INFO_LINK } from 'config/constants/chains'
import { HOME, EXCHANGE, MORE_INFO } from '../constants'

const bscConfig: MenuEntry[] = [
  HOME,
  EXCHANGE,
  {
    label: 'Info',
    icon: 'InfoIcon',
    items: [
      {
        label: 'Overview',
        href: '/info/overview',
      },
      {
        label: 'Tokens',
        href: `/info/tokens`,
      },
      {
        label: 'Pools',
        href: '/info/pools',
      },
    ],
  },
  {
    label: 'Earn',
    icon: 'EarnIcon',
    items: [
      {
        label: 'Oak barrel',
        href: '/earn/farms',
      },
      {
        label: 'Champagne',
        href: '/earn/pools',
      },
    ],
  },
  {
    label: 'Win',
    icon: 'WinIcon',
    href: '/burn',
  },
  {
    label: 'IFO',
    icon: 'IfoIcon',
    href: '/iao',
  },
  // {
  //   label: "Settings",
  //   icon: "SettingsIcon",
  //   href: "/settings",
  // },

  // {
  //   label: 'IAO',
  //   icon: 'IfoIcon',
  //   items: [
  //     {
  //       label: 'Official',
  //       href: '/iao',
  //     },
  //     // {
  //     //   label: 'Self-Serve',
  //     //   href: '/ss-iao',
  //     // },
  //   ],
  // },
  // {
  //   label: 'NFA',
  //   icon: 'apeNFTIcon',
  //   items: [
  //     {
  //       label: 'Collection',
  //       href: '/nft',
  //     },
  //     {
  //       label: 'Auction',
  //       href: '/auction',
  //     },
  //     {
  //       label: 'Staking',
  //       href: '/staking',
  //     },
  //   ],
  // },
  // {
  //   label: 'GNANA',
  //   icon: 'ApeZone',
  //   href: '/gnana',
  // },
  // {
  //   label: 'Lottery',
  //   icon: 'TicketIcon',
  //   href: '/burn',
  // },

  MORE_INFO,
]

export default bscConfig
