import React from 'react'

import Page from '../../src/components/page'
import { getPage, getPageIds, getAllPages, serializeMdx } from '../../src/content'
import type { PageProps, ContextType } from '../../src/content'

export async function getStaticProps(context: ContextType) {
    const data = await getPage('event', context.params.id)
    const kits = getAllPages('kit')
    const mdxSource = await serializeMdx(data.content)
    return { props: { data, mdxSource, kits } }
}

export const getStaticPaths = async () => {
    return { paths: getPageIds('event'), fallback: false }
}

const Event = (props: PageProps) => {
    return <Page {...props} type="event" />
}

export default Event
