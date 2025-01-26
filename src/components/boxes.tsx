import React from 'react'
import Image from 'next/image'
import clsx from 'clsx'

import { OptionalLink } from './typography'
import Icon from './icon'
import classes from '../styles/boxes.module.sass'

interface GridProps {
    columns?: number
    children?: React.ReactNode
    className?: string
}

interface CardProps {
    title: string
    url?: string
    image?: string
    icon?: string
    color?: string
    Component?: keyof JSX.IntrinsicElements
    className?: string
    children?: React.ReactNode
}

interface InfoboxProps {
    children: React.ReactNode
    title?: string
    icon?: string
}

export const Grid = (props: GridProps) => {
    const { columns = 2, className, children } = props
    return (
        <div
            className={clsx(classes.grid, className)}
            style={{ '--grid-cols': columns } as React.CSSProperties}
        >
            {children}
        </div>
    )
}

export const Card = (props: CardProps) => {
    const { title, url, icon, image, color, Component = 'div', className, children } = props
    return (
        <Component
            className={clsx(classes.card, className)}
            style={{ '--color-card': color } as React.CSSProperties}
        >
            {image && (
                <header className={classes.cardImage}>
                    <OptionalLink href={url} noStyle tabIndex="-1">
                        <Image src={image} fill alt={title} />
                    </OptionalLink>
                </header>
            )}
            <div className={classes.cardContent}>
                <OptionalLink href={url} noStyle>
                    <h3 className={classes.cardTitle}>
                        {icon && <Icon name={icon} size={14} spaced />}
                        {title}
                    </h3>
                    {children && <p>{children}</p>}
                </OptionalLink>
            </div>
        </Component>
    )
}

export const Infobox = (props: InfoboxProps) => (
    <figure className={classes.infobox}>
        {(props.title || props.icon) && (
            <h3 className={classes.infoboxTitle}>
                {props.icon && <Icon name={props.icon} size={26} spaced />}
                {props.title}
            </h3>
        )}
        {props.children}
    </figure>
)
