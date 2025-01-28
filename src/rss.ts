import fs from 'fs'
import RSS from 'rss'
import path from 'path'

import { META } from '../content'

const feedPath = path.join('./public', META.rssFeed)
const siteUrl = `https://${META.domain}`
const feedOptions = {
    title: `${META.title} · RSS Feed`,
    description: META.description,
    site_url: siteUrl,
    feed_url: new URL(META.rssFeed, siteUrl).href,
    image_url: new URL('icon.png', siteUrl).href,
    pubDate: new Date(),
    language: 'en',
    managingEditor: META.title,
    webMaster: META.title,
    copyright: `All rights reserved ${new Date().getFullYear()}, ${META.title}`,
}

function getAuthors(item: { [key: string]: any }): string {
    return item.authors && !!item.authors.length
        ? item.authors.map(([author, _]: [string, string?]) => author).join(', ')
        : META.title
}

export default function generateRssFeed(data: any[]) {
    const feed = new RSS(feedOptions)
    data.map((item) => {
        feed.item({
            guid: item.id,
            title: item.title,
            description: item.description,
            url: new URL(`kits/${item.id}`, siteUrl).href,
            date: item.date,
            author: getAuthors(item),
        })
    })
    fs.writeFileSync(feedPath, feed.xml({ indent: true }))
}
