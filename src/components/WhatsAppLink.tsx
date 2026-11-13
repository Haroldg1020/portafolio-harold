"use client";

import { track } from '@vercel/analytics';
import { Link } from '@/i18n/routing';
import { site } from '@/config/site';

interface WhatsAppLinkProps extends Omit<React.ComponentProps<'a'>, 'href'> {
  /** Pre-filled message the visitor sends */
  message: string;
  /** Where the click came from, for analytics (e.g. 'hero', 'plan-professional') */
  source: string;
}

/** Opens a WhatsApp chat with a pre-filled message, or the contact form while no number is configured. */
export default function WhatsAppLink({ message, source, onClick, ...props }: WhatsAppLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    track('whatsapp_click', { source });
    onClick?.(e);
  };

  if (!site.whatsapp) {
    return <Link href="/#contact" onClick={handleClick} {...props} />;
  }

  return (
    <a
      href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      {...props}
    />
  );
}
