import React from 'react'

import classes from '../styles/embeds.module.sass'

interface VideoProps {
    src: string
    width?: number
    height?: number
    caption?: string
}

interface YouTubeProps {
    id: string
    start?: number
}

export const Video = (props: VideoProps) => {
    const { src, width = 838, height = 524, caption } = props
    const ext = src.split('.').pop()
    const style = { paddingBottom: `${(height / width) * 100}%` }
    return (
        <figure>
            <div className={classes.responsive} style={style}>
                <video autoPlay loop muted playsInline width={width} height={height}>
                    <source src={src} type={`video/${ext}`} />
                </video>
            </div>
            {caption && <figcaption>{caption}</figcaption>}
        </figure>
    )
}

export const YouTube = (props: YouTubeProps) => {
    const { id, start } = props
    const url = `https://www.youtube-nocookie.com/embed/${id}?color=white&modestbranding=1&rel=0`
    return (
        <figure className={classes.responsive}>
            <iframe
                title={id}
                width="560"
                height="315"
                src={`${url}${start ? `&start=${start}` : ''}`}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </figure>
    )
}
