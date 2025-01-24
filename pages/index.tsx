import React from 'react'
import type { NextPage } from 'next'
import clsx from 'clsx'
import Image from 'next/image'

import Layout from '../src/components/layout'
import { Link, OptionalLink, H2, H3, DateTime } from '../src/components/typography'
import Icon from '../src/components/icon'
import logo from '../src/images/logo.png'
import { getAllKits } from '../src/content'
import type { KitData } from '../src/content'
import classes from '../src/styles/index.module.sass'
import { META, EVENTS } from '../content'
// import generateRssFeed from '../src/rss'

export async function getStaticProps() {
    const kits = getAllKits()
    // generateRssFeed(data)
    return { props: { kits } }
}

const Index: NextPage<{ kits: KitData[] }> = (props) => {
    const { kits } = props
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
                        Clit ipsum aute est ullamco velit ad commodo laborum sint duis dolor ipsum
                        reprehenderit qui.
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
                    <p className={classes.meta}>
                        Clit ipsum aute est ullamco velit ad commodo laborum sint duis dolor ipsum
                        reprehenderit qui.
                    </p>
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
        </Layout>
    )
}

export default Index
