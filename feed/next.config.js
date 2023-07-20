/**  @type {import('next').NextConfig} **/
const nextConfig = {
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
        ],
    },
}

module.exports = nextConfig
