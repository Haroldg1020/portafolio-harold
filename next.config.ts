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
};

export default withNextIntl(withMDX(nextConfig));
