/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: '/dashboard/:path*',
        destination: '/portal/agency/dashboard/:path*',
        permanent: true,
      },
      {
        source: '/login',
        destination: '/portal/agency/login',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
