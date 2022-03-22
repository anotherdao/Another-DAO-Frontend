import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyledIfoCardDescription, Link, ToggleButton, Description, UpArrowIcon, DownArrowIcon } from './styles'

export interface IfoCardDescriptionProps {
  defaultIsOpen?: boolean
  description: string
  projectSiteUrl: string
}

const IfoCardDescription: React.FC<IfoCardDescriptionProps> = ({
  defaultIsOpen = true,
  description,
  projectSiteUrl,
}) => {
  const [isOpen, setIsOpen] = useState(defaultIsOpen)

  const handleClick = () => setIsOpen(!isOpen)
 const { t } = useTranslation();

  return (
    <StyledIfoCardDescription>
      {/* TODO: Update external link icon color based on dark/light theme */}
      {/* <Link href={projectSiteUrl} fontFamily="Montserrat">
        View project site
      </Link> */}
      <ToggleButton onClick={handleClick}>
        {isOpen ? t('Hide') : t('Show')}
        {isOpen ? <UpArrowIcon /> : <DownArrowIcon />}
      </ToggleButton>
      <Description isOpen={isOpen}>{description}</Description>
    </StyledIfoCardDescription>
  )
}

export default IfoCardDescription
