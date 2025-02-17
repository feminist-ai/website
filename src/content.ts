import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import RemarkSmartypants from 'remark-smartypants'
import RemarkGfm from 'remark-gfm'
import RehypeTitleFigure from 'rehype-title-figure'

import RemarkCustomAttrs from './plugins/remarkCustomAttrs.mjs'
import RemarkCodeBlocks from './plugins/remarkCodeBlocks.mjs'

const CONTENT_DIRECTORY = path.join(process.cwd(), 'content')
const KITS_DIRECTORY = path.join(CONTENT_DIRECTORY, 'kits')
const RECAPS_DIRECTORY = path.join(CONTENT_DIRECTORY, 'recaps')

export type PageType = 'kit' | 'recap'

export interface PageData {
    id: string
    title: string
    description?: string
    color?: string
    icon?: string
    toc?: [string, string][]
    authors?: (string | [string, string?])[]
    date?: string
    location?: string
    kits?: string[]
}

export interface PageProps {
    mdxSource: any
    data: PageData
}

export interface ContextType {
    params: { id: string }
}

export function getPageIds(type: PageType) {
    const sourceDir = type == 'kit' ? KITS_DIRECTORY : RECAPS_DIRECTORY
    const fileNames = fs.readdirSync(sourceDir)
    return fileNames.map((fileName) => {
        return { params: { id: fileName.replace(/\.mdx$/, '') } }
    })
}

export function getAllPages(type: PageType) {
    const sourceDir = type == 'kit' ? KITS_DIRECTORY : RECAPS_DIRECTORY
    const fileNames = fs.readdirSync(sourceDir)
    return fileNames.map((fileName) => {
        const id = fileName.replace(/\.mdx$/, '')
        const fullPath = path.join(sourceDir, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const frontMatter = parseFrontmatter(fileContents)
        return { id, ...frontMatter.data }
    })
}

export async function getPage(type: PageType, id: string) {
    const sourceDir = type == 'kit' ? KITS_DIRECTORY : RECAPS_DIRECTORY
    const fullPath = path.join(sourceDir, `${id}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { content, data } = parseFrontmatter(fileContents)
    return { id, content, ...data }
}

function parseFrontmatter(fileContents: string) {
    const result = matter(fileContents)
    const data = {
        ...result.data,
        date: result.data.date ? new Date(result.data.date).toISOString().split('T')[0] : null,
    }
    return { content: result.content, data }
}

export async function serializeMdx(content: string) {
    return await serialize(content, {
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
}
