/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  async redirects() {
    return [
      {
        source: "/notes",
        destination: "/",
        permanent: true,
      },
      {
        source: "/user",
        destination: "/",
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig