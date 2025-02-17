import React from 'react'
import { MDXRemote } from 'next-mdx-remote'
import clsx from 'clsx'

import Layout from './layout'
import { H1, H2, Link, OptionalLink, DateTime } from './typography'
import { Grid, Card } from './boxes'
import Icon from './icon'
import classes from '../styles/page.module.sass'
import type { PageData, PageType } from '../content'
import mdxComponents from '../mdx-components'

interface PageProps {
    type: PageType
    mdxSource: any
    data: PageData
    kits?: PageData[]
}

interface SidebarProps {
    data: PageData
    kits?: PageData[]
}

const Sidebar = (props: SidebarProps) => {
    const { kits = [] } = props
    const { toc, date, location } = props.data
    const authors = (props.data.authors || []).map((author) =>
        Array.isArray(author) ? author : [author]
    )
    return (
        <nav>
            {(date || location) && (
                <section>
                    <h3 className={classes.sidebarTitle}>Event</h3>
                    <ul className={classes.sidebar}>
                        {date && (
                            <li>
                                <Icon name="calendar" size={14} title="Date" spaced />
                                <DateTime date={date} template="MMMM DD, YYYY" />
                            </li>
                        )}
                        {location && (
                            <li>
                                <Icon name="pin" size={14} title="Location" spaced />
                                {location}
                            </li>
                        )}
                    </ul>
                </section>
            )}
            {toc && (
                <section>
                    <h3 className={classes.sidebarTitle}>Table of Contents</h3>
                    <ul className={classes.sidebar}>
                        {toc.map(([text, url]) => (
                            <li key={url}>
                                <Link href={url} noStyle>
                                    {text}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
            {authors.length > 0 && (
                <section>
                    <h3 className={classes.sidebarTitle}>Author{authors.length > 1 && 's'}</h3>
                    <ul className={classes.sidebar}>
                        {authors.map(([text, url], i) => (
                            <li key={i}>
                                <OptionalLink href={url} noStyle>
                                    {text}
                                </OptionalLink>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
            {!!kits.length && (
                <section>
                    <h3 className={classes.sidebarTitle}>Related Kit{kits.length > 1 && 's'}</h3>
                    <ul className={classes.sidebar}>
                        {kits.map((kit) => (
                            <li key={kit.id}>
                                <Link href={`/kits/${kit.id}`} noStyle>
                                    {kit.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </nav>
    )
}

const Page = (props: PageProps) => {
    const { type } = props
    const { id, title, color, icon, kits = [] } = props.data
    const allKits = Object.assign({}, ...(props.kits || []).map((kit) => ({ [kit.id]: kit })))
    const usedKits = kits.map((id) => allKits[id]).filter((data) => !!data)
    const label = type == 'kit' ? 'Event Kit' : 'Event Recap'
    return (
        <Layout
            Component="article"
            isPage
            className={classes.root}
            style={{ '--color-theme': color } as React.CSSProperties}
            header={<Sidebar data={props.data} kits={usedKits} />}
            sourceFile={`content/${type}s/${id}.mdx`}
        >
            <header className={classes.header}>
                <H1>
                    <span
                        className={clsx(classes.label, { [classes.labelRecap]: type == 'recap' })}
                    >
                        {label}
                    </span>
                    <br />
                    {icon && <Icon name={icon} size={40} className={classes.icon} />}
                    {title}
                </H1>
            </header>
            <div className={classes.content}>
                <MDXRemote {...props.mdxSource} components={mdxComponents} />
            </div>
            {!!usedKits.length && (
                <footer className={classes.footer}>
                    <H2 id="kits" className={classes.footerTitle}>
                        Related Kits
                    </H2>
                    <Grid>
                        {usedKits.map((kit) => (
                            <Card
                                key={kit.id}
                                title={kit.title}
                                url={`/kits/${kit.id}`}
                                icon={kit.icon}
                                color={kit.color}
                            >
                                {kit.description}
                            </Card>
                        ))}
                    </Grid>
                </footer>
            )}
        </Layout>
    )
}

export default Page
