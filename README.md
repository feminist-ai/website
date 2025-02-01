# Feminist AI LAN Party

[![Netlify Status](https://api.netlify.com/api/v1/badges/83f2eb8b-6420-440a-ad54-1b1eb0988cff/deploy-status)](https://app.netlify.com/sites/feminist-ai/deploys)

## 💛 Contributing to the site

### Content types

The website consists of mostly 3 types of content, provided via the directory [`content`](content):

| Type | Source | Description |
| --- | --- | --- |
| **Kit** | [`kits/{id}.mdx`](content/kits) | Event kits for different topics including instructions, downloadable templates and resources you can use to host your own Feminist AI LAN Party. |
| **Recap** | [`recaps/{id}.mdx`](content/recaps) | Recaps and summaries of past events. If you've hosted your own Feminist AI LAN Party, you can contribute a recap to share your experiences and results. |
| **Event** | [`events.json`](content/events.json) | Past and future Feminist AI LAN Parties. Past events can optionally link to a recap if available. |

### Repo structure

The website and repo is designed to make it as easy as possible to make changes without having to edit any source files, code or markup outside of the Markdown pages. All relevant metadata is organized in JSON files (with JSON schemas attached so your editor can highlight mistakes). If you want to edit content, the only relevant directories should be **`content`** and **`public`** (images and PDF templates).

```yaml
📂 feminist-ai.party
┣━━ 📂 content
┃   ┣━━ 📂 kits             # different event kits as *.mdx
┃   ┃   ┗━━ 📄 {kit}.mdx    # kit content and metadata
┃   ┣━━ 📂 recaps           # different event recaps as *.mdx
┃   ┃   ┗━━ 📄 {recap}.mdx  # recap content and metadata
┃   ┣━━ 📄 events.json      # list of future and past events to display
┃   ┗━━ 📄 meta.json        # website meta information
┣━━ 📂 pages                # source of pages
┣━━ 📂 public
┃   ┣━━ 📂 images           # images used by kits and recaps
┃   ┣━━ 📂 templates        # downloadable and printable PDF templates
┃   ┗━━ 📂 videos           # videos used by kits and recaps
┗━━ 📂 src                  # website source and components
```

### Markdown elements

The website supports regular Markdown, as well as several custom elements and enhanced syntax. Custom MDX elements can be used like regular HTML / JSX elements and their names are capitalized.

#### Headlines

Markdown headlines can specify the attribute `id` in curly braces, which is used as the anchor link. The anchor link can also be referenced in the [table of contents](#frontmatter-page-meta-data) of a page.

```markdown
## This is a headline {id="headline"}

### This is a sub-headline {id="sub-headline"}
```

#### Code blocks

Code blocks can specify the language to use for syntax highlighting and an optional title, prefixed by `###` in the first line.

````markdown
```python
### This is a title
import spacy
```
````

To highlight specific lines of code, you can set the attribute `highlight` in curly braces in the title (with or without a title text). Line numbers are 1-indexed and comma-separated.

````markdown
```python
### This is code with line highlights {highlight="2,3"}
import spacy
nlp = spacy.load("en_core_web_sm")
doc = nlp("Hello world!")
```
````

#### Custom elements

| Element | Attributes | Use case |
| --- | --- | --- |
| `<Infobox />` | `title` (str), [`icon`](src/images/icons) (str) | Important notes, additional info, warnings |
| `<Grid />` | `columns` (int, default `2`) | Multi-column grid, used in combination with `<Card />` |
| `<Card />` | `title` (str), `url` (str), [`icon`](src/images/icons) (str), [`image`](public/images) (str) | Resources, further links, downloads |
| `<Gallery />` | `images` (list), `columns` (int, default `3`) | Photo or image gallery. Images can be a string path or a tuple of `[path, caption]` |
| `<Video />` | `src` (str), `width` (int), `height` (int), `caption` (str) | Embedded video file. |
| `<YouTube />` | `id` (str), `start` (int) | Embedded YouTube video. |
| `<Mark />` | | Highlighted text |
| `<Kbd />` | | Keyboard shortcuts |

```mdx
This is <Mark>highlighted</Mark>. To copy, press <Kbd>ctrl</Kbd>+<Kbd>c</Kbd>.

<Infobox title="Important note" icon="warning">

This is an infobox with text, a title and an icon.

</Infobox>

<Grid>
<Card title="This is a resource" url="https://explosion.ai" image="/images/image.jpg" icon="book">Some text about the resource here.</Card>
<Card title="This is a resource" url="https://explosion.ai" image="/images/image.jpg" icon="book">Some text about the resource here.</Card>
</Grid>

<Gallery images={[
  ["/images/photo1.jpg", "This is a caption"],
  "/images/photo2.jpg",
  "/images/photo3.jpg"
]} />

<Video src="/videos/data_prodigy-annotation.mp4" width={838} height={524} caption="This is a caption" />
<YouTube id="jpWqz85F_4Y" start={372} />
```

#### Frontmatter (page meta data)

At the top of a page, e.g. [`kits/data.mdx`](content/kits/data.mdx), **YAML-formatted meta data** is provided in the so-called frontmatter block, wrapped in `---`. This includes the page title and description, as well as a theme color and [icon](src/images/icons), and an optional table of contents and author information. The anchor links in the table of contents can be defined as IDs of the respective [headlines](#headlines).

```yaml
---
title: This is a page title
description: "This is a description shown in the overview and site meta."
color: '#bc85ff'
icon: data
toc:
  - ['This is a section', '#anchor']
  - ['This is another section', '#another-anchor']
authors:
  - ['Author Name', 'https://author-url.com']
  - ['Another Author']
---
```

Recaps can optionally specify a `date` and `location`, as well as the IDs of related kits, which are then shown in the sidebar and at the bottom of the page.

```yaml
date: 2024-09-28
location: Berlin, Germany
kits: ['adversarial-attacks', 'data']
```


### Running the site locally

Make sure you've installed **Node 20** or above with [`nvm`](https://github.com/nvm-sh/nvm). Then clone the repo and install the dependencies:

```bash
nvm use
npm install
```

To serve the website locally on `localhost:3000`, run:

```bash
npm run dev
```

### Validating your changes

The `validate` command runs linting on the website source and also checks all metadata files against their JSON schemas to make sure they follow the correct format. Validation also runs automatically on all PRs.

```bash
npm run validate
```

### Deploy previews

The website is hosted by [Netlify](https://www.netlify.com/) and all pull requests targeting the `main` branch will automatically build a deploy preview. You can access it by clicking the links in the completed checks at the bottom of the PR.
