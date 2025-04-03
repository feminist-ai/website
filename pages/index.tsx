import React from 'react'
import type { NextPage } from 'next'
import clsx from 'clsx'
import Image from 'next/image'
import dayjs from 'dayjs'

import Layout from '../src/components/layout'
import { Link, OptionalLink, H2, H3, DateTime, Mark } from '../src/components/typography'
import Icon from '../src/components/icon'
import logo from '../src/images/logo.png'
import { getAllPages } from '../src/content'
import type { PageData } from '../src/content'
import classes from '../src/styles/index.module.sass'
import { META, EVENTS } from '../content'
import generateRssFeed from '../src/rss'

export async function getStaticProps() {
    const kits = getAllPages('kit')
    const events = getAllPages('events').sort((a: any, b: any) =>
        dayjs(b.date).isAfter(dayjs(a.date)) ? 1 : -1
    )
    generateRssFeed([...kits, ...events])
    return { props: { kits, events } }
}

const Index: NextPage<{ kits: PageData[]; events: PageData[] }> = (props) => {
    const { kits = [], events = [] } = props
    return (
        <Layout
            header={
                <Image
                    src={logo}
                    alt={META.title}
                    className={classes.logo}
                    width={920}
                    height={510}
                    loading="eager"
                />
            }
            sourceFile=""
        >
            <section className={classes.section} id="about">
                <div className={classes.aboutMeta}>
                    <H2 className={clsx(classes.title, classes.titleAbout)}>
                        <span>About</span>
                    </H2>
                    <p className={classes.meta}>What is this all about?</p>
                </div>
                <p className={classes.about}>
                    We aim to create a <strong>safe</strong>,{' '}
                    <strong>
                        <Icon name="heart" size={26} /> inclusive
                    </strong>{' '}
                    and <strong>hacker-oriented space</strong> for experimenting with the
                    intersection of <Mark className={classes.mark}>feminism</Mark> and{' '}
                    <Icon name="robot" size={26} />{' '}
                    <Mark className={classes.mark}>artificial intelligence</Mark>. Feminist AI LAN
                    Parties are
                    <strong>
                        <Icon name="speech" size={26} /> participatory events
                    </strong>{' '}
                    where everyone can be involved and{' '}
                    <strong>
                        <Icon name="thoughts" size={26} /> learn
                    </strong>
                    , <strong>train</strong>,{' '}
                    <strong>
                        <Icon name="crystal" size={26} /> imagine
                    </strong>
                    , <strong>co-create</strong> and{' '}
                    <strong>
                        <Icon name="computer" size={26} /> hack
                    </strong>
                    . The goal is to develop artistic and scientific contributions to the greater
                    machine learning community and of course to <Icon name="party" size={26} />{' '}
                    <Mark className={classes.mark}>have fun</Mark>, <strong>experiment</strong>,{' '}
                    <strong>network</strong> and <strong>play</strong>!
                </p>
            </section>

            <section className={classes.section} id="kits">
                <div>
                    <H2 className={clsx(classes.title, classes.titleKits)}>
                        <span>Kits</span>
                    </H2>
                    <p className={classes.meta}>
                        Event kits with tips, ideas, inspiration, resources and downloads for
                        hosting your own Feminist AI LAN Parties on different topics
                    </p>
                </div>
                <ul className={classes.items}>
                    {kits.map((kit) => (
                        <li
                            key={kit.id}
                            className={classes.item}
                            style={{ '--color-kit': kit.color } as React.CSSProperties}
                        >
                            <Link href={`/kits/${kit.id}`} noStyle>
                                <H3 className={classes.itemTitle}>
                                    {kit.icon && <Icon name={kit.icon} size={28} spaced />}
                                    {kit.title}
                                </H3>
                                <p>{kit.description}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>

            <section className={classes.section} id="events">
                <div>
                    <H2 className={clsx(classes.title, classes.titleEvents)}>
                        <span>Events</span>
                    </H2>
                    <p className={classes.meta}>Past and upcoming LAN Parties</p>
                </div>
                <div>
                    <table className={classes.events}>
                        <tbody>
                            {EVENTS.map((event, i) => {
                                return (
                                    <tr key={i}>
                                        <td className={classes.eventDate}>
                                            <DateTime date={event.date} template="MMM DD, YYYY" />
                                        </td>
                                        <td>
                                            <OptionalLink href={event.url}>
                                                {event.event}
                                            </OptionalLink>
                                            {event.hosts && (
                                                <ul className={classes.eventHosts}>
                                                    <Icon name="speech" title="Hosts" size={18} />{' '}
                                                    {event.hosts?.map((host, i) => (
                                                        <li key={i}>{host}</li>
                                                    ))}
                                                </ul>
                                            )}
                                        </td>
                                        <td className={classes.eventLocation}>
                                            <Icon name="pin" title="Location" /> {event.location}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <ul className={classes.items}>
                        {events.map((event) => (
                            <li key={event.id} className={classes.item}>
                                <Link href={`/events/${event.id}`} noStyle>
                                    <H3 className={clsx(classes.itemTitle, classes.itemTitleSmall)}>
                                        {event.title}
                                    </H3>
                                    <p>{event.description}</p>
                                </Link>
                                <ul className={classes.itemFooter}>
                                    {event.date && (
                                        <li>
                                            <Icon name="calendar" size={13} title="Date" spaced />
                                            <DateTime date={event.date} template="MMM DD, YYYY" />
                                        </li>
                                    )}
                                    {event.location && (
                                        <li>
                                            <Icon name="pin" size={13} title="Location" spaced />
                                            {event.location}
                                        </li>
                                    )}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section className={classes.section} id="partners">
                <div>
                    <H2 className={clsx(classes.title, classes.titlePartners)}>
                        <span>Partners</span>
                    </H2>
                    <p className={classes.meta}>
                        Thanks to our partners for making Feminist AI LAN Parties possible!
                    </p>
                </div>
                <ul className={classes.partners}>
                    {META.partners.map((partner) => (
                        <li key={partner.logo}>
                            <Link href={partner.url} title={partner.title} noStyle>
                                <Image
                                    src={`/logos/${partner.logo}`}
                                    alt={partner.title}
                                    className={classes.partner}
                                    width={80}
                                    height={80}
                                />
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
        </Layout>
    )
}

export default Index
