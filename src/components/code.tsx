import React from 'react'
import { Highlight, Prism } from 'prism-react-renderer'
import clsx from 'clsx'

import classes from '../styles/code.module.sass'
;(typeof global !== 'undefined' ? global : window).Prism = Prism
// @ts-ignore
await import('prismjs/components/prism-ini')
// @ts-ignore
await import('prismjs/components/prism-bash')
// @ts-ignore
await import('prismjs/components/prism-json')

interface CodeProps {
    children: React.ReactNode
}

interface PreChildProps {
    title?: string
    lang: string
    prompt?: string
    prompts?: string
    highlight?: string
    wrap?: string
    children: string
}

interface PreProps {
    children: { props: PreChildProps }
}

export const Code = (props: CodeProps) => (
    <code className={classes.inlineCode}>{props.children}</code>
)

export const Kbd = (props: CodeProps) => <kbd className={classes.kbd}>{props.children}</kbd>

export const Pre = (props: PreProps) => {
    const { title, lang, children, prompt, prompts, highlight, wrap } = props.children.props
    const prompted = prompts ? prompts.split(',').map((line) => parseInt(line.trim()) - 1) : []
    const highlighted = highlight
        ? highlight.split(',').map((line) => parseInt(line.trim()) - 1)
        : []
    return (
        <Highlight code={children} language={lang}>
            {({ className, tokens, getTokenProps }) => {
                const maxLineCount = Math.max(
                    ...tokens.map((line) =>
                        line.map((token) => token.content.length).reduce((a, b) => a + b, 0)
                    )
                )
                return (
                    <pre
                        className={clsx(classes.pre, className, {
                            [classes.hasTitle]: !!title,
                            [classes.wrap]: !!wrap,
                        })}
                    >
                        {title && (
                            <h3 className={classes.title}>
                                <span>{title}</span>
                            </h3>
                        )}
                        <Code>
                            {tokens.map((line, i) => {
                                if (
                                    i == tokens.length - 1 &&
                                    line.length == 1 &&
                                    line[0].content == '\n'
                                ) {
                                    return null
                                }
                                const isPrompted = !prompted.length || prompted.includes(i)
                                const isHighlighted = highlighted.includes(i)
                                const style = isHighlighted
                                    ? {
                                          width: `calc(${maxLineCount + 1}ch + var(--padding-x))`,
                                      }
                                    : undefined
                                return (
                                    <div
                                        key={i}
                                        className={clsx(classes.line, {
                                            [classes.highlight]: isHighlighted,
                                        })}
                                        style={style}
                                        data-prompt={isPrompted ? prompt : null}
                                    >
                                        {line.map((token, key) => {
                                            const { className, children } = getTokenProps({ token })
                                            return (
                                                <span key={key} className={className}>
                                                    {children}
                                                </span>
                                            )
                                        })}
                                    </div>
                                )
                            })}
                        </Code>
                    </pre>
                )
            }}
        </Highlight>
    )
}
