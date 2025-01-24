# Feminist AI LAN Party


## 💛 Contributing to the site

### Repo structure

The website and repo is designed to make it as easy as possible to make changes without having to edit any source files, code or markup outside of the Markdown pages. All relevant metadata is organized in JSON files (with JSON schemas attached so your editor can highlight mistakes). If you want to edit content, the only relevant directories should be **`content`** and **`public`** (images and PDF templates).

```yaml
📂 feminist-ai.party
┣━━ 📂 content
┃   ┣━━ 📂 events           # event summaries and resources as *.mdx
┃   ┃   ┗━━ 📄 {event}.mdx  # event content and metadata
┃   ┣━━ 📂 kits             # different event kits as *.mdx
┃   ┃   ┗━━ 📄 {kit}.mdx    # kit content and metadata
┃   ┣━━ 📄 events.json      # list of future and past events to display
┃   ┗━━ 📄 meta.json        # website meta information
┣━━ 📂 pages                # source of pages
┣━━ 📂 public
┃   ┣━━ 📂 images           # images used by kits and events
┃   ┗━━ 📂 templates        # downloadable and printable PDF templates
┗━━ 📂 src                  # website source and components
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
