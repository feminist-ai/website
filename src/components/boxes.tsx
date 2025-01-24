import React from 'react'
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
    const { title, url, icon, color, Component = 'div', className, children } = props
    return (
        <Component
            className={clsx(classes.card, className)}
            style={{ '--color-card': color } as React.CSSProperties}
        >
            <OptionalLink href={url} noStyle>
                <h3 className={classes.cardTitle}>
                    {icon && <Icon name={icon} size={16} spaced />}
                    {title}
                </h3>
                {children && <p>{children}</p>}
            </OptionalLink>
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
