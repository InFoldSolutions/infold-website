/**  @type {import('next').NextConfig} **/
const nextConfig = {
    images: {
        remotePatterns: [
            { // https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Wikipedia%27s_W.svg/1024px-Wikipedia%27s_W.svg.png
                protocol: 'https',
                hostname: 'upload.wikimedia.org',
                port: '',
                pathname: '/wikipedia/commons/**',
            },
        ],
    },
}

module.exports = nextConfig
