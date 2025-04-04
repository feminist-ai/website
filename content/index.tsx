import meta from './meta.json'
import events from './events.json'

export const META = meta
export const EVENTS = events.events

/**
 * Variables can be used within Markdown in text content or links, e.g.
 * [[BLUESKY]] or [email us](mailto:[[EMAIL]]). At the moment, variables only
 * work in regular Markdown, not in custom component attributes like title="...".
 */
export const VARIABLES = {
    EMAIL: META.email,
    BLUESKY: `https://bsky.app/profile/${META.socials.bluesky}`,
}

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
