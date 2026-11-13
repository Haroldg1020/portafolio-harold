import type { LucideIcon } from 'lucide-react';
import { Bot, Code2, Globe, ShoppingCart } from 'lucide-react';

// Textos en messages/*.json → "Services". Aquí solo el orden, iconos y precios.

export type ServiceId = 'web' | 'store' | 'automation' | 'custom';
export type PlanId = 'essential' | 'professional' | 'store' | 'custom';

export const services: { id: ServiceId; icon: LucideIcon }[] = [
  { id: 'web', icon: Globe },
  { id: 'store', icon: ShoppingCart },
  { id: 'automation', icon: Bot },
  { id: 'custom', icon: Code2 },
];

/** Precio "desde" en pesos colombianos. null = "A medida". */
export const plans: { id: PlanId; price: number | null; popular?: boolean }[] = [
  { id: 'essential', price: 900_000 },
  { id: 'professional', price: 1_800_000, popular: true },
  { id: 'store', price: 3_500_000 },
  { id: 'custom', price: null },
];

export const maintenancePrice = 150_000;

/** Proyectos que se muestran como ejemplos en /servicios. */
export const showcaseProjects = ['novadiligencia', 'undersound', 'portafolio'];

export function formatCop(value: number, locale: string) {
  return new Intl.NumberFormat(locale === 'es' ? 'es-CO' : 'en-US', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(value);
}
