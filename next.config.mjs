import createMDX from '@next/mdx'

const nextConfig = {
    pageExtensions: ['tsx', 'mdx'],
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: [{ loader: '@svgr/webpack', options: { icon: true, svgo: false } }]
        })
        config.module.rules
            .find(({ oneOf }) => !!oneOf).oneOf
            .filter(({ use }) => JSON.stringify(use)?.includes('css-loader'))
            .reduce((acc, { use }) => acc.concat(use), [])
            .forEach(({ options }) => {
                if (options.modules) {
                    options.modules.exportLocalsConvention = 'camelCase';
                }
            })
        config.resolve.fallback = { fs: false }
        return config
    },
    sassOptions: {},
}

const withMDX = createMDX({
    options: {
        remarkPlugins: [],
        rehypePlugins: [],
    },
})

export default withMDX(nextConfig)
