import type { AnchorHTMLAttributes } from 'react';

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { href: string };

// Load the prerendered document so every page owns one complete metadata set.
// Native view transitions provide the short page fade without client head-tag retention.
export default function PortfolioLink(props: Props) {
  return <a {...props} />;
}
