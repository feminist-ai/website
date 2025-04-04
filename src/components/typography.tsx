import React from 'react'
import NextLink from 'next/link'
import dayjs from 'dayjs'
import clsx from 'clsx'

import Icon from './icon'
import classes from '../styles/typography.module.sass'

interface LinkProps {
    href: string
    scroll?: boolean
    blank?: boolean
    noStyle?: boolean
    className?: string
    style?: React.CSSProperties
    children: React.ReactNode
    [x: string]: unknown
}

interface OptionalLinkProps extends Omit<LinkProps, 'href'> {
    href?: string
}

interface HProps {
    id?: string
    icon?: string
    className?: string
    children: React.ReactNode
}

interface HBaseProps extends HProps {
    Component: keyof JSX.IntrinsicElements
}

interface DateTimeProps {
    date: string
    template?: string
    className?: string
}

interface MarkProps {
    className?: string
    children: React.ReactNode
}

interface ListProps {
    children: React.ReactNode
    className?: string
}

interface TableProps {
    children: React.ReactNode
    scroll?: boolean
}

export const Link = (props: LinkProps) => {
    const {
        href,
        scroll = true,
        children,
        blank = false,
        noStyle = false,
        className,
        ...restProps
    } = props
    const target =
        /^((http(s?)):\/\/|mailto:)/gi.test(href) || /(.pdf|.jpg|.png|.svg)$/gi.test(href) || blank
            ? '_blank'
            : undefined
    return (
        <NextLink
            href={href}
            scroll={scroll}
            target={target}
            className={clsx({ [classes.link]: !noStyle }, className)}
            {...restProps}
        >
            {children}
        </NextLink>
    )
}

export const OptionalLink = (props: OptionalLinkProps) => {
    return props.href || props.onClick ? <Link {...(props as LinkProps)} /> : <>{props.children}</>
}

export const H = (props: HBaseProps) => {
    const { Component, id, icon, className, children, ...restProps } = props
    return (
        <Component
            id={id}
            className={clsx(classes.h, classes[Component], className)}
            {...restProps}
        >
            <OptionalLink href={id ? `#${id}` : undefined} noStyle>
                {icon && <Icon name={icon} className={classes.hIcon} />}
                {children}
            </OptionalLink>
        </Component>
    )
}

export const H1 = (props: HProps) => <H Component="h1" {...props} />

export const H2 = (props: HProps) => <H Component="h2" {...props} />

export const H3 = (props: HProps) => <H Component="h3" {...props} />

export const H4 = (props: HProps) => <H Component="h4" {...props} />

export const H5 = (props: HProps) => <H Component="h5" {...props} />

export const H6 = (props: HProps) => <H Component="h6" {...props} />

export const DateTime = (props: DateTimeProps) => {
    const { date, template = 'MMM D, YYYY', className } = props
    const d = dayjs(date)
    return (
        <time dateTime={d.format()} className={className}>
            {d.format(template)}
        </time>
    )
}

export const Mark = (props: MarkProps) => (
    <mark className={clsx(classes.mark, props.className)}>{props.children}</mark>
)

export const Ol = (props: ListProps) => (
    <ol className={clsx(classes.ol, props.className)}>{props.children}</ol>
)

export const Ul = (props: ListProps) => (
    <ul className={clsx(classes.ul, props.className)}>{props.children}</ul>
)

export const Table = (props: TableProps) => (
    <figure className={clsx(classes.table, { [classes.tableScroll]: props.scroll })}>
        <table>{props.children}</table>
    </figure>
)

export const Hr = () => <hr className={classes.hr} />
