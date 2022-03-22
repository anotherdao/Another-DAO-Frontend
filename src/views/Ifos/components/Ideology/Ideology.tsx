import React from 'react'
import { Button, GradientButton, Text } from '@apeswapfinance/uikit'
import useTheme from 'hooks/useTheme'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FeatureBox, Motto, SectionHeading, Frame, IconBox, CenteredImage, Container, ButtonBox } from './styles'

interface Props {
  name: string
}

const Icon = ({ name }: Props) => {
  const { isDark } = useTheme()

  return (
    <IconBox>
      <CenteredImage src={`/images/ifos/${name}-${isDark ? 'dark' : 'light'}.svg`} alt={name} />
    </IconBox>
  )
}

const HowItWorks = () => {
  const history = useHistory()
  const { t } = useTranslation();

  const handleDoOwnClick = () => {
    history.push('/ss-iao')
  }

  return (
    <Container>
      <SectionHeading size="lg" fontFamily="Montserrat" textAlign="center">
        {t('OUR IAO IDEOLOGY')}
      </SectionHeading>
      <Frame>
        <FeatureBox>
          <Icon name="investment" />

          <SectionHeading fontFamily="Montserrat" textAlign="center">
            {t('INVESTMENT')}
          </SectionHeading>
          <Motto>{t('BUILD')}</Motto>
          <Text fontFamily="Montserrat" textAlign="center">
            {t('We highly vet applicants to choose projects we believe in as long term investments and partners')}
          </Text>
        </FeatureBox>
        <FeatureBox>
          <Icon name="development" />

          <SectionHeading fontFamily="Montserrat" textAlign="center">
            {t('DEVELOPMENT')}
          </SectionHeading>
          <Motto>{t('HOLD')}</Motto>
          <Text fontFamily="Montserrat" textAlign="center">
            {t('The funds raised are used to finalize development and launch the project')}
          </Text>
        </FeatureBox>
        <FeatureBox>
          <Icon name="innovation" />

          <SectionHeading fontFamily="Montserrat" textAlign="center">
            {t('INNOVATION')}
          </SectionHeading>
          <Motto>{t('EXPERIMENT')}</Motto>
          <Text fontFamily="Montserrat" textAlign="center">
            {t('These projects are meant to be unique and push the boundaries of DeFi')}
          </Text>
        </FeatureBox>
      </Frame>
      <ButtonBox>
        <GradientButton
          variant="yellow"
          external
          href="https://docs.google.com/forms/d/1qE4YgCWnNM0rcFHE1-uVAaQG3hI14oVGbPhITCRxKO4/viewform"
          as="a"
        >
          {t('become a partner')}
        </GradientButton>
        {/* <GradientButton variant="yellow" onClick={handleDoOwnClick}>
          LAUNCH YOUR OWN
        </GradientButton> */}
      </ButtonBox>
    </Container>
  )
}

export default HowItWorks
