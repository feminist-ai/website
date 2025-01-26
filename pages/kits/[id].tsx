import React from 'react'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import RemarkSmartypants from 'remark-smartypants'
import RemarkGfm from 'remark-gfm'
import RehypeTitleFigure from 'rehype-title-figure'

import Layout from '../../src/components/layout'
import { H1, Link, OptionalLink } from '../../src/components/typography'
import Icon from '../../src/components/icon'
import classes from '../../src/styles/kit.module.sass'
import { getKit, getKitIds } from '../../src/content'
import type { KitData } from '../../src/content'
import RemarkCustomAttrs from '../../src/plugins/remarkCustomAttrs.mjs'
import RemarkCodeBlocks from '../../src/plugins/remarkCodeBlocks.mjs'
import mdxComponents from '../../src/mdx-components'

interface KitProps {
    mdxSource: any
    data: KitData
}

interface SidebarProps {
    authors: KitData['authors']
    toc: KitData['toc']
}

interface ContextType {
    params: { id: string }
}

export async function getStaticProps(context: ContextType) {
    const data = await getKit(context.params.id)
    const mdxSource = await serialize(data.content, {
        mdxOptions: {
            remarkPlugins: [
                RemarkGfm,
                // @ts-ignore
                [RemarkSmartypants, { dashes: 'oldschool' }],
                RemarkCustomAttrs,
                RemarkCodeBlocks,
            ],
            // @ts-ignore
            rehypePlugins: [RehypeTitleFigure],
        },
    })
    return { props: { data, mdxSource } }
}

export const getStaticPaths = async () => {
    return { paths: getKitIds(), fallback: false }
}

const Sidebar = (props: SidebarProps) => {
    const { toc, authors } = props
    return (
        <nav>
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
            {authors && (
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
        </nav>
    )
}

const Kit = (props: KitProps) => {
    const { title, color, icon, toc, authors } = props.data
    return (
        <Layout
            Component="article"
            isPage
            className={classes.root}
            style={{ '--color-theme': color } as React.CSSProperties}
            header={<Sidebar toc={toc} authors={authors} />}
        >
            <header className={classes.header}>
                <H1>
                    <span className={classes.label}>Event Kit</span>
                    <br />
                    {icon && <Icon name={icon} size={40} className={classes.icon} />}
                    {title}
                </H1>
            </header>
            <div className={classes.content}>
                <MDXRemote {...props.mdxSource} components={mdxComponents} />
            </div>
        </Layout>
    )
}

export default Kit
