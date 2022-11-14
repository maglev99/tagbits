/**
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function defineNextConfig(config) {
  return config
}

export default defineNextConfig({
  reactStrictMode: true,
  swcMinify: true,

  images: {
    domains: ['pbs.twimg.com', 'services.tzkt.io'],
  },

  experimental: { images: { allowFutureImage: true } },

  // images: {
  //   formats: ['image/avif', 'image/webp'],
  //   remotePatterns: [
  //     {
  //       domains: ['pbs.twimg.com'],

  //       // protocol: 'https',
  //       // hostname: 'pbs.twimg.com',
  //       // port: '',
  //       // pathname: '/profile_images/**',

  //       // hostname: ['pbs.twimg.com'],
  //       // formats: ['image/jpg']
  //       // hostname: 'assets.vercel.com',
  //       // port: '',
  //       // pathname: '/image/upload/**',
  //     },
  //   ],
  // },
})
