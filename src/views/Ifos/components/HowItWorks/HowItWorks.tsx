import React from 'react'
import { Button, Text, GradientButton } from '@apeswapfinance/uikit'
import useTheme from 'hooks/useTheme'
import { useTranslation } from 'react-i18next'
import { IconBox, FeatureBox, B, Frame, SectionHeading, CenteredImage, Container } from './styles'

interface IconProps {
  name: string
}

const Icon = ({ name }: IconProps) => {
  const { isDark } = useTheme()

  return (
    <IconBox>
      <CenteredImage src={`/images/ifos/${name}-${isDark ? 'dark' : 'light'}.svg`} alt={name} />
    </IconBox>
  )
}

interface Props {
  onParticipate: () => boolean
}

const HowItWorks = ({ onParticipate }: Props) => {
 const { t } = useTranslation();

  const handleParticipateClick = () => {
    const isSwitching = onParticipate()
    const scroll = () =>
      window.scrollTo({
        top: 360,
        behavior: 'smooth',
      })

    if (isSwitching) {
      setTimeout(scroll, 500)
    } else {
      scroll()
    }
  }

  return (
    <Container>
      <SectionHeading size="lg" fontFamily="Montserrat">
        {t('HOW IT WORKS')}
      </SectionHeading>
      <Frame>
        <FeatureBox>
          <Icon name="time-circle" />
          <div>
            <SectionHeading fontFamily="Montserrat">{t('CONTRIBUTION WINDOW')}</SectionHeading>
            <Text fontFamily="Montserrat">
              {t('IAOs run anywhere from 12-24 hours to ensure everyone across the globe has time to enter with ease.')}
            </Text>
          </div>
        </FeatureBox>
        <FeatureBox>
          <Icon name="calendar" />
          <div>
            <SectionHeading fontFamily="Montserrat">{t('VESTING SCHEDULE')}</SectionHeading>
            <Text fontFamily="Montserrat">
              {t('25% of tokens unlock immediately and the remaining 75% vest linearly over 120 days.')}
            </Text>
          </div>
        </FeatureBox>
        <FeatureBox>
          <IconBox>
            <CenteredImage src="/images/tokens/CORK.svg" alt="CORK" style={{ width: 75, height: 75 }} />
          </IconBox>
          {/* <Icon name="" /> */}
          <div>
            <SectionHeading fontFamily="Montserrat">{t('MANY WAYS TO PARTICIPATE')}</SectionHeading>
            <Text fontFamily="Montserrat">{t('Commit with')}: BNB, CORK, LP PAIR tokens, ..etc.</Text>
            {/* <Text fontFamily="Montserrat">
              <B>Option 1</B>: Commit with <B>BNB</B>.
            </Text>
            <Text fontFamily="Montserrat">
              <B>Option 2</B>: Commit with <B>GNANA</B>.
            </Text> */}
          </div>
        </FeatureBox>
        <FeatureBox>
          <Icon name="overflow-dollars" />
          <div>
            <SectionHeading fontFamily="Montserrat">{t('OVERFLOW MODEL')}</SectionHeading>
            <Text fontFamily="Montserrat">
              {t(
                'Your token allocation is based on your percentage of the total raise. All overflow contributions will be returned post-raise.',
              )}
            </Text>
          </div>
        </FeatureBox>
      </Frame>
      <GradientButton variant="yellow" onClick={handleParticipateClick}>
        {t('participate now')}
      </GradientButton>
    </Container>
  )
}

export default HowItWorks
