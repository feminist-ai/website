import React from 'react'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import RemarkSmartypants from 'remark-smartypants'
import RemarkGfm from 'remark-gfm'
import RehypeTitleFigure from 'rehype-title-figure'

import Layout from '../../src/components/layout'
import { H1, Link } from '../../src/components/typography'
import Icon from '../../src/components/icon'
import classes from '../../src/styles/kit.module.sass'
import { getKit, getKitIds } from '../../src/content'
import type { KitData } from '../../src/content'
import RemarkCustomAttrs from '../../src/plugins/remarkCustomAttrs.mjs'
import mdxComponents from '../../src/mdx-components'

interface KitProps {
    mdxSource: any
    data: KitData
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

const ToC = (props: { toc: KitData['toc'] }) => {
    return !props.toc ? null : (
        <nav>
            <h3 className={classes.tocTitle}>Table of Contents</h3>
            <ul className={classes.toc}>
                {props.toc.map(([text, url]) => (
                    <li>
                        <Link href={url} noStyle>
                            {text}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

const Kit = (props: KitProps) => {
    const { title, color, icon, toc } = props.data
    return (
        <Layout
            Component="article"
            isPage
            className={classes.root}
            style={{ '--color-theme': color } as React.CSSProperties}
            header={<ToC toc={toc} />}
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
