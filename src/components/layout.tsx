import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import PlausibleProvider from 'next-plausible'
import clsx from 'clsx'

import Icon from './icon'
import { Link } from './typography'
import logo from '../images/logo.png'
import { departureMono, geist } from '../fonts'
import classes from '../styles/layout.module.sass'
import { META, SOCIALS } from '../../content'

interface LayoutProps {
    children?: React.ReactNode
    title?: string
    metaTitle?: string
    description?: string
    image?: string
    addSlogan?: boolean
    isPage?: boolean
    header?: React.ReactNode
    className?: string
    style?: React.CSSProperties
    Component?: keyof JSX.IntrinsicElements
}

const Layout = (props: LayoutProps) => {
    const {
        title,
        metaTitle,
        description,
        image,
        header,
        addSlogan = true,
        isPage = false,
        className,
        style,
        children,
        Component = 'div',
    } = props
    const router = useRouter()
    const titleText = metaTitle || title
    const pageTitlePrefix = titleText ? `${titleText} · ${META.title}` : `${META.title}`
    const pageTitle = addSlogan ? `${pageTitlePrefix} · ${META.slogan}` : pageTitlePrefix
    const pageDescription = description || META.description
    const pageImage = `https://${META.domain}${image || '/social.jpg'}`
    const pageUrl = `https://${META.domain}${router.asPath}`
    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <link rel="icon" href="/favicon.ico" />
                <link rel="icon" href="/icon.png" type="image/png" />
                <link rel="apple-touch-icon" href="/icon.png" type="image/png" />
                <meta name="description" content={pageDescription} />
                <meta property="og:url" content={META.domain} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta property="og:image" content={pageImage} />
                <meta name="twitter:title" content={pageTitle} />
                <meta name="twitter:description" content={pageDescription} />
                <meta name="twitter:image" content={pageImage} />
                <meta
                    name="format-detection"
                    content="telephone=no, date=no, email=no, address=no"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
            </Head>

            <PlausibleProvider domain={META.domain}>
                <main
                    className={clsx(
                        classes.root,
                        departureMono.variable,
                        geist.variable,
                        className,
                        { [classes.page]: isPage }
                    )}
                    style={style}
                >
                    <div className={classes.main}>
                        <header className={classes.header}>
                            {isPage && (
                                <Link href="/" noStyle>
                                    <Image
                                        src={logo}
                                        alt={META.title}
                                        className={classes.logo}
                                        width={920}
                                        height={510}
                                        loading="eager"
                                    />
                                </Link>
                            )}
                            {header}
                        </header>

                        <ul className={classes.nav}>
                            {isPage && (
                                <>
                                    <li>
                                        <Icon
                                            name="folder"
                                            title="Kits"
                                            size={20}
                                            className={classes.navIcon}
                                        />{' '}
                                        <Link href="/#kits" noStyle>
                                            Kits
                                        </Link>
                                    </li>
                                    <li>
                                        <Icon
                                            name="calendar"
                                            title="Events"
                                            size={20}
                                            className={classes.navIcon}
                                        />{' '}
                                        <Link href="/#events" noStyle>
                                            Events
                                        </Link>
                                    </li>
                                </>
                            )}
                            {SOCIALS.map((social) => (
                                <li key={social.title}>
                                    <Icon
                                        name={social.icon}
                                        title={social.title}
                                        size={20}
                                        className={classes.navIcon}
                                    />{' '}
                                    <Link href={social.url} noStyle>
                                        {social.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <Component className={classes.content}>
                            {/* {showTitle && !!title && <H1>{title}</H1>}
                        {subTitle && <header className={classes.subTitle}>{subTitle}</header>} */}
                            {children}
                        </Component>

                        <footer className={classes.footer}></footer>
                    </div>
                </main>
            </PlausibleProvider>
        </>
    )
}

export default Layout
