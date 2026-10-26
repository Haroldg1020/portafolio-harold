import { ImageResponse } from 'next/og';
import { getTranslations } from 'next-intl/server';
import { site } from '@/config/site';

export const alt = site.name;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          background: '#08080a',
          backgroundImage: 'radial-gradient(circle at 85% 20%, rgba(204,41,43,0.35), transparent 45%)',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 22, letterSpacing: 6, color: '#9ca3af' }}>
          <div style={{ width: 14, height: 14, borderRadius: 999, background: '#cc292b' }} />
          {site.location.toUpperCase()}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 0.9 }}>
          <div style={{ fontSize: 150, fontWeight: 900, letterSpacing: -6 }}>HAROLD</div>
          {/* next/og can't render outlined text, so the surname is a muted fill instead */}
          <div style={{ fontSize: 150, fontWeight: 900, letterSpacing: -6, color: 'rgba(255,255,255,0.28)' }}>GUERRERO</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 26, color: '#d4d4d8' }}>
          <span>{t('ogRole')}</span>
          <span style={{ color: '#cc292b' }}>{site.url.replace(/^https?:\/\//, '')}</span>
        </div>
      </div>
    ),
    size
  );
}
