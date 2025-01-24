import meta from './meta.json'
import events from './events.json'

export const META = meta
export const EVENTS = events.events

export const SOCIALS = [
    {
        icon: 'github',
        title: 'GitHub',
        url: `https://github.com/${META.socials.github}`,
    },
    {
        icon: 'bluesky',
        title: 'Bluesky',
        url: `https://bsky.app/profile/${META.socials.bluesky}`,
    },
]
