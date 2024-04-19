/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.grutto.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
