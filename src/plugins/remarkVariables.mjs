/**
 * Inspired by:
 * - https://github.com/mrzmmr/remark-variables
 * - https://github.com/florianeckerstorfer/remark-a11y-emoji
 */
import { findAndReplace } from 'mdast-util-find-and-replace'
import { visit } from 'unist-util-visit'

const defaultOptions = {
    fence: ['[[', ']]'],
    varPattern: '[A-Z_]+',
    data: {}
}

function remarkVariables(userOptions = {}) {
    const options = Object.assign({}, defaultOptions, userOptions)
    const regex = new RegExp(`${options.fence[0]}${options.varPattern}${options.fence[1]}`, 'g')
    const varRegex = new RegExp(options.varPattern, 'g')
    function getVariable(match) {
        const variable = match.match(varRegex)[0]
        const value = options.data[variable]
        if (!value) throw new Error(`Can't find variable ${variable}`)
        return value
    }
    function replaceValue(node) {
        if (node.value) {
            [...new Set(node.value.match(regex))].map(match => {
                node.value = node.value.replaceAll(match, getVariable(match))
            })
        }
    }
    function replaceUrl(node) {
        if (node.url) {
            [...new Set(node.url.match(regex))].map(match => {
                node.url = node.url.replaceAll(match, getVariable(match))
            })
        }
    }
    function transform(markdownAST) {
        const settings = [[regex, (match) => ({ type: 'text', value: getVariable(match) })]]
        findAndReplace(markdownAST, settings);
        visit(markdownAST, 'code', replaceValue)
        visit(markdownAST, 'inlineCode', replaceValue)
        visit(markdownAST, 'link', replaceUrl)
        visit(markdownAST, 'mdxJsxFlowElement', node => {
            if (node.name == 'Button') {
                node.attributes.forEach(attr => {
                    if (attr.name == 'href') {
                        replaceValue(attr)
                    }
                })
            }
        })
        return markdownAST;
    }
    return transform;
}


export default remarkVariables
