import React from 'react'
import clsx from 'clsx'
import Image from 'next/image'

import ICONS from '../images/icons'
import classes from '../styles/icon.module.sass'

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
