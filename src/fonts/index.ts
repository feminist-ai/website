import localFont from 'next/font/local'

export const departureMono = localFont({
    variable: '--font-display',
    fallback: ['Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
    src: [
        {
            path: './departure-mono.woff2',
            weight: '400',
            style: 'normal',
        },
    ],
})

export const geist = localFont({
    variable: '--font-primary',
    fallback: [
        'Segoe UI',
        'Roboto',
        'Helvetica',
        'Arial',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
    ],
    src: [
        {
            path: './geist-regular.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: './geist-medium.woff2',
            weight: '500',
            style: 'normal',
        },
        {
            path: './geist-bold.woff2',
            weight: '700',
            style: 'normal',
        },
    ],
})

export const jetbrainsMono = localFont({
    variable: '--font-code',
    fallback: ['Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
    src: [
        {
            path: './jetbrainsmono-medium.woff2',
            weight: '500',
            style: 'normal',
        },
    ],
})
