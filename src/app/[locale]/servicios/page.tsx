import type { Metadata } from 'next';
import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server';
import * as motion from 'motion/react-client';
import { ArrowDown, ArrowRight, Check, Clock, Plus, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import SectionHeading from '@/components/SectionHeading';
import ProjectCard from '@/components/projects/ProjectCard';
import WhatsAppLink from '@/components/WhatsAppLink';
import { getProjects } from '@/lib/content';
import { alternates } from '@/lib/seo';
import { site } from '@/config/site';
import { formatCop, maintenancePrice, plans, services, showcaseProjects } from '@/content/services';

type Props = { params: Promise<{ locale: string }> };

type Step = { title: string; description: string; duration: string };
type Faq = { q: string; a: string };
type Why = { title: string; description: string };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Services' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: alternates('/servicios', locale),
  };
}

const whyIcons = [Sparkles, Zap, ShieldCheck];

const primaryButton =
  'group inline-flex items-center justify-center gap-2 rounded-lg bg-[#25d366] px-6 py-3.5 text-sm font-bold text-[#08080a] shadow-[0_0_30px_rgba(37,211,102,0.3)] hover:brightness-110 transition';
const secondaryButton =
  'inline-flex items-center justify-center gap-2 rounded-lg border border-subtle bg-black/5 dark:bg-white/5 px-6 py-3.5 text-sm font-bold text-primary hover:border-accent hover:text-accent transition-colors';

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Services');
  const projects = (await getProjects(await getLocale())).filter((p) => showcaseProjects.includes(p.slug));
  const steps = t.raw('steps') as Step[];
  const faq = t.raw('faq') as Faq[];
  const why = t.raw('why') as Why[];
  const trust = t.raw('trust') as string[];

  // Structured data so Google can show the business and FAQ in results
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: `${site.name} · ${t('eyebrow')}`,
      description: t('metaDescription'),
      url: `${site.url}/${locale}/servicios`,
      email: site.email,
      areaServed: 'CO',
      address: { '@type': 'PostalAddress', addressLocality: 'Cali', addressCountry: 'CO' },
      priceRange: `${formatCop(plans[0].price!, locale)}+`,
      sameAs: [site.linkedin, site.github.url],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    },
  ];

  return (
    <main className="relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="relative overflow-hidden px-6 pt-40 pb-24 md:pt-48 md:pb-32">
        <div className="absolute inset-0 z-0 opacity-40 dark:opacity-20" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, var(--dots-color) 1.5px, transparent 0)',
          backgroundSize: '32px 32px',
        }}></div>
        <div className="absolute -top-40 right-0 w-[700px] h-[500px] bg-accent/15 dark:bg-accent/10 blur-[140px] rounded-full pointer-events-none"></div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-secondary mb-8"
          >
            <span className="text-accent mr-2">●</span>{t('eyebrow')}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-[0.95] text-primary max-w-5xl"
          >
            {t('titleLead')}<br />
            <span className="text-gradient-accent">{t('titleAccent')}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-8 text-lg md:text-xl text-secondary font-light leading-relaxed max-w-2xl"
          >
            {t('subtitle')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-10 flex flex-col sm:flex-row gap-3"
          >
            <WhatsAppLink message={t('whatsappMessage')} source="hero" className={primaryButton}>
              <FaWhatsapp size={20} />
              {t('ctaWhatsapp')}
            </WhatsAppLink>
            <a href="#paquetes" className={secondaryButton}>
              {t('ctaPackages')}
              <ArrowDown size={16} />
            </a>
          </motion.div>
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-10 flex flex-wrap gap-x-8 gap-y-3"
          >
            {trust.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-secondary">
                <Check size={16} className="text-accent" />
                {item}
              </li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <SectionHeading num="01" title={t('servicesTitle')} subtitle={t('servicesSubtitle')} />
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map(({ id, icon: Icon }, index) => (
            <motion.li
              key={id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative glass-dark metal-edge rounded-2xl p-7 shadow-sm overflow-hidden hover:border-accent/40 transition-colors"
            >
              <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-accent/0 group-hover:bg-accent/10 blur-3xl transition-colors duration-500"></div>
              <div className="relative">
                <div className="w-12 h-12 rounded-xl border border-subtle flex items-center justify-center text-accent mb-6">
                  <Icon size={22} />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{t(`items.${id}.title`)}</h3>
                <p className="text-secondary font-light leading-relaxed">{t(`items.${id}.description`)}</p>
                <p className="mt-4 text-sm text-muted">
                  <span className="font-medium text-secondary">{t('idealForLabel')}:</span> {t(`items.${id}.idealFor`)}
                </p>
                <WhatsAppLink
                  message={t('whatsappService', { service: t(`items.${id}.title`) })}
                  source={`service-${id}`}
                  className="mt-6 inline-flex items-center gap-2 text-xs font-bold tracking-[0.15em] uppercase text-primary hover:text-accent transition-colors"
                >
                  {t('askAbout')}
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </WhatsAppLink>
              </div>
            </motion.li>
          ))}
        </ul>
      </section>

      {/* Real projects */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <SectionHeading num="02" title={t('projectsTitle')} subtitle={t('projectsSubtitle')} />
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.li
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <ProjectCard project={project} />
            </motion.li>
          ))}
        </ul>
      </section>

      {/* Process */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <SectionHeading num="03" title={t('processTitle')} subtitle={t('processSubtitle')} />
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className="relative rounded-2xl border border-subtle p-7"
            >
              <span className="absolute top-5 right-6 text-6xl font-black text-outline select-none" aria-hidden>
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-[11px] font-medium text-accent">
                <Clock size={12} />
                {step.duration}
              </span>
              <h3 className="mt-6 text-lg font-bold text-primary">{step.title}</h3>
              <p className="mt-2 text-sm text-secondary font-light leading-relaxed">{step.description}</p>
            </motion.li>
          ))}
        </ol>
      </section>

      {/* Pricing */}
      <section id="paquetes" className="py-24 px-6 max-w-6xl mx-auto scroll-mt-20">
        <SectionHeading num="04" title={t('pricingTitle')} subtitle={t('pricingSubtitle')} />
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {plans.map(({ id, price, popular }, index) => {
            const features = t.raw(`plans.${id}.features`) as string[];
            const name = t(`plans.${id}.name`);
            return (
              <motion.li
                key={id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`relative flex flex-col rounded-2xl p-7 shadow-sm ${
                  popular
                    ? 'border-2 border-accent bg-accent/[0.06] shadow-[0_0_40px_-10px_rgba(204,41,43,0.45)]'
                    : 'glass-dark metal-edge'
                }`}
              >
                {popular && (
                  <span className="absolute -top-3 left-7 rounded-full bg-accent px-3 py-1 text-[10px] font-bold tracking-[0.15em] uppercase text-white">
                    {t('popular')}
                  </span>
                )}
                <h3 className="text-lg font-bold text-primary">{name}</h3>
                <p className="mt-2 text-sm text-secondary font-light min-h-10">{t(`plans.${id}.description`)}</p>
                <div className="mt-6">
                  {price !== null ? (
                    <>
                      <span className="block text-xs text-muted">{t('from')}</span>
                      <span className="text-3xl font-black tracking-tight text-primary">{formatCop(price, locale)}</span>
                    </>
                  ) : (
                    <>
                      <span className="block text-xs text-muted">&nbsp;</span>
                      <span className="text-3xl font-black tracking-tight text-primary">{t('customPrice')}</span>
                    </>
                  )}
                </div>
                <p className="mt-2 flex items-center gap-1.5 text-xs text-muted">
                  <Clock size={12} />
                  {t('delivery')}: {t(`plans.${id}.delivery`)}
                </p>
                <ul className="mt-6 space-y-3 flex-1">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-secondary">
                      <Check size={16} className="mt-0.5 shrink-0 text-accent" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <WhatsAppLink
                  message={t('whatsappPlan', { plan: name })}
                  source={`plan-${id}`}
                  className={`mt-8 inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-bold transition ${
                    popular
                      ? 'bg-accent text-white hover:bg-accent-dark'
                      : 'border border-subtle text-primary hover:border-accent hover:text-accent'
                  }`}
                >
                  <FaWhatsapp size={16} />
                  {t('choose')}
                </WhatsAppLink>
              </motion.li>
            );
          })}
        </ul>
        <div className="mt-8 space-y-2 text-sm text-muted">
          <p className="flex items-start gap-2">
            <Plus size={16} className="mt-0.5 shrink-0 text-accent" />
            {t('maintenance', { price: formatCop(maintenancePrice, locale) })}
          </p>
          <p className="text-xs">{t('currencyNote')}</p>
        </div>
      </section>

      {/* Why me */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <SectionHeading num="05" title={t('whyTitle')} />
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {why.map((item, index) => {
            const Icon = whyIcons[index % whyIcons.length];
            return (
              <motion.li
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="glass-dark metal-edge rounded-2xl p-7 shadow-sm"
              >
                <Icon size={22} className="text-accent" />
                <h3 className="mt-5 text-lg font-bold text-primary">{item.title}</h3>
                <p className="mt-2 text-sm text-secondary font-light leading-relaxed">{item.description}</p>
              </motion.li>
            );
          })}
        </ul>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 max-w-3xl mx-auto">
        <SectionHeading num="06" title={t('faqTitle')} />
        <div className="border-t border-subtle">
          {faq.map((item) => (
            <details key={item.q} className="group border-b border-subtle">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left font-medium text-primary hover:text-accent transition-colors [&::-webkit-details-marker]:hidden">
                {item.q}
                <Plus size={18} className="shrink-0 text-muted transition-transform duration-300 group-open:rotate-45 group-open:text-accent" />
              </summary>
              <p className="pb-6 pr-8 text-secondary font-light leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 max-w-6xl mx-auto py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl border border-subtle bg-card-solid px-8 py-16 md:px-16 text-center"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(204,41,43,0.2),transparent_60%)] pointer-events-none"></div>
          <h2 className="relative text-3xl md:text-5xl font-black tracking-tight text-primary">{t('finalTitle')}</h2>
          <p className="relative mt-5 text-lg text-secondary font-light max-w-xl mx-auto">{t('finalSubtitle')}</p>
          <div className="relative mt-10 flex flex-col items-center gap-4">
            <WhatsAppLink message={t('whatsappMessage')} source="final-cta" className={primaryButton}>
              <FaWhatsapp size={20} />
              {t('ctaWhatsapp')}
            </WhatsAppLink>
            <a href={`mailto:${site.email}`} className="text-sm text-muted hover:text-accent transition-colors">
              {site.email}
            </a>
          </div>
        </motion.div>
      </section>

      {/* Floating WhatsApp button */}
      <WhatsAppLink
        message={t('whatsappMessage')}
        source="floating"
        aria-label={t('floating')}
        title={t('floating')}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-[0_8px_30px_rgba(37,211,102,0.45)] hover:scale-110 transition-transform"
      >
        <FaWhatsapp size={28} />
      </WhatsAppLink>
    </main>
  );
}
