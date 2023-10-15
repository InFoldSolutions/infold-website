/**  @type {import('next').NextConfig} **/

const nextConfig = {
  async redirects() {
    return [
      {
        source: '/topics/:slug*',
        destination: '/story/:slug*',
        permanent: true,
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/sitemap_index.xml.gz',
        destination: 'https://api.infold.ai/sitemap_index.xml.gz'
      },
      {
        source: '/sitemap_index.xml',
        destination: 'https://api.infold.ai/sitemap_index.xml'
      },
      {
        source: '/story/sitemap.xml',
        destination: 'https://api.infold.ai/topics/sitemap.xml'
      },
      {
        source: '/keyword/sitemap.xml',
        destination: 'https://api.infold.ai/keywords/sitemap.xml'
      },
      {
        source: '/robots.txt',
        destination: 'https://api.infold.ai/robots.txt'
      }
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
        pathname: '/wikipedia/commons/**',
      },
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.freepik.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'dev-to-uploads.s3.amazonaws.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'substackcdn.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images-eu.ssl-images-amazon.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      'bufferutil': 'commonjs bufferutil',
    })
    return config
  },
}

module.exports = nextConfig
