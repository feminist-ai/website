import React from 'react'

import Page from '../../src/components/page'
import { getPage, getPageIds, serializeMdx } from '../../src/content'
import type { PageProps, ContextType } from '../../src/content'

export async function getStaticProps(context: ContextType) {
    const data = await getPage('kit', context.params.id)
    const mdxSource = await serializeMdx(data.content)
    return { props: { data, mdxSource } }
}

export const getStaticPaths = async () => {
    return { paths: getPageIds('kit'), fallback: false }
}

const Kit = (props: PageProps) => {
    return <Page {...props} type="kit" />
}

export default Kit
