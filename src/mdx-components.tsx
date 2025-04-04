import { H2, H3, H4, H5, H6, Link, Mark, Ol, Ul, Table, Hr } from './components/typography'
import { Infobox, Card, Grid, Gallery } from './components/boxes'
import { Code, Pre, Kbd } from './components/code'
import { Video, YouTube } from './components/embeds'
import Icon from './components/icon'

const mdxComponents = {
    a: Link,
    h2: H2,
    h3: H3,
    h4: H4,
    h5: H5,
    h6: H6,
    ol: Ol,
    ul: Ul,
    hr: Hr,
    code: Code,
    pre: Pre,
    table: Table,
    Table,
    Mark,
    Kbd,
    Infobox,
    Card,
    Grid,
    Gallery,
    Video,
    YouTube,
    Icon,
}

export default mdxComponents
