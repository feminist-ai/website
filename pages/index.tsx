import React from 'react'
import type { NextPage } from 'next'
import clsx from 'clsx'
import Image from 'next/image'

import Layout from '../src/components/layout'
import { Link, OptionalLink, H2, H3, DateTime } from '../src/components/typography'
import Icon from '../src/components/icon'
import logo from '../src/images/logo.png'
import { getAllPages } from '../src/content'
import type { PageData } from '../src/content'
import classes from '../src/styles/index.module.sass'
import { META, EVENTS } from '../content'
import generateRssFeed from '../src/rss'

export async function getStaticProps() {
    const kits = getAllPages('kit')
    const recaps = getAllPages('recap')
    generateRssFeed([...kits, ...recaps])
    return { props: { kits, recaps } }
}

const Index: NextPage<{ kits: PageData[]; recaps: PageData[] }> = (props) => {
    const { kits = [], recaps = [] } = props
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
            <p className={classes.intro}>
                Clit ipsum aute est ullamco velit ad commodo laborum sint duis dolor ipsum
                reprehenderit qui. Aliqua enim commodo velit. Et proident enim incididunt ad sunt eu
                enim adipisicing.
            </p>
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
                <table className={classes.events}>
                    <tbody>
                        {EVENTS.map((event, i) => {
                            return (
                                <tr key={i}>
                                    <td className={classes.eventDate}>
                                        <DateTime date={event.date} template="MMM DD, YYYY" />
                                    </td>
                                    <td>
                                        <OptionalLink href={event.url}>{event.event}</OptionalLink>
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
            </section>

            <section className={classes.section} id="recaps">
                <div>
                    <H2 className={clsx(classes.title, classes.titleRecaps)}>
                        <span>Recaps</span>
                    </H2>
                    <p className={classes.meta}>
                        Event recaps, write-ups and documentation of past LAN Parties
                    </p>
                </div>
                <ul className={classes.items}>
                    {recaps.map((recap) => (
                        <li key={recap.id} className={classes.item}>
                            <Link href={`/recaps/${recap.id}`} noStyle>
                                <H3 className={clsx(classes.itemTitle, classes.itemTitleSmall)}>
                                    {recap.title}
                                </H3>
                                <p>{recap.description}</p>
                            </Link>
                            <ul className={classes.itemFooter}>
                                {recap.date && (
                                    <li>
                                        <Icon name="calendar" size={13} title="Date" spaced />
                                        <DateTime date={recap.date} template="MMM DD, YYYY" />
                                    </li>
                                )}
                                {recap.location && (
                                    <li>
                                        <Icon name="pin" size={13} title="Location" spaced />
                                        {recap.location}
                                    </li>
                                )}
                            </ul>
                        </li>
                    ))}
                </ul>
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
