import React from 'react'
import clsx from 'clsx'
import Image, { StaticImageData } from 'next/image'

import classes from '../styles/icon.module.sass'

import iconPin from '../images/icons/pin.png'
import iconSpeech from '../images/icons/speech.png'
import iconData from '../images/icons/data.png'
import iconBomb from '../images/icons/bomb.png'
import iconComputer from '../images/icons/computer.png'
import iconBluesky from '../images/icons/bluesky.png'
import iconGitHub from '../images/icons/github.png'
import iconWarning from '../images/icons/warning.png'
import iconCalendar from '../images/icons/calendar.png'
import iconFolder from '../images/icons/folder.png'

const ICONS: Record<string, StaticImageData> = {
    pin: iconPin,
    speech: iconSpeech,
    data: iconData,
    bomb: iconBomb,
    computer: iconComputer,
    bluesky: iconBluesky,
    github: iconGitHub,
    warning: iconWarning,
    calendar: iconCalendar,
    folder: iconFolder,
}

interface IconProps {
    name: string
    size?: number
    spaced?: boolean
    title?: string
    className?: string
}

const Icon = (props: IconProps) => {
    const { name, size = 16, spaced = false, title = '', className } = props
    return (
        <Image
            src={ICONS[name]}
            alt={title}
            width={size}
            height={size}
            className={clsx(classes.root, className, {
                [classes.spaced]: !!spaced,
            })}
        />
    )
}

export default Icon
