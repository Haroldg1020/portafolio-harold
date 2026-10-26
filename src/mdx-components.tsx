import type { MDXComponents } from 'mdx/types';

const components: MDXComponents = {
  // External links open in a new tab
  a: ({ href = '', ...props }) =>
    href.startsWith('http') ? <a href={href} target="_blank" rel="noopener noreferrer" {...props} /> : <a href={href} {...props} />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
