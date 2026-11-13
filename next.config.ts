import type {NextConfig} from 'next';
import createMDX from '@next/mdx';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();
const withMDX = createMDX();

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  allowedDevOrigins: ['192.168.1.2', 'localhost'],
  experimental: {
    viewTransition: true,
  },
  async redirects() {
    // Send visitors of the old Vercel address to the custom domain (preview URLs are unaffected)
    return [
      {
        source: '/:path*',
        has: [{type: 'host', value: 'portafolio-harold.vercel.app'}],
        destination: 'https://www.haroldguerrero.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(withMDX(nextConfig));
