import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const KITS_DIRECTORY = path.join(process.cwd(), 'content', 'kits')

export interface KitData {
    id: string
    title: string
    description?: string
    color?: string
    icon?: string
    toc?: [string, string][]
}

export function getKitIds() {
    const fileNames = fs.readdirSync(KITS_DIRECTORY)
    return fileNames.map((fileName) => {
        return { params: { id: fileName.replace(/\.mdx$/, '') } }
    })
}

export function getAllKits() {
    const fileNames = fs.readdirSync(KITS_DIRECTORY)
    return fileNames.map((fileName) => {
        const id = fileName.replace(/\.mdx$/, '')
        const fullPath = path.join(KITS_DIRECTORY, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const frontMatter = parseFrontmatter(fileContents)
        return { id, ...frontMatter.data }
    })
}

export async function getKit(id: string) {
    const fullPath = path.join(KITS_DIRECTORY, `${id}.mdx`)
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
