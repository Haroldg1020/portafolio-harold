// Datos personales y enlaces usados en todo el sitio. Edita aquí, no en los componentes.
export const site = {
  name: 'Harold Guerrero',
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://portafolio-harold.vercel.app').replace(/\/$/, ''),
  email: 'hguerrero1020@gmail.com',
  location: 'Cali, Colombia',
  github: {
    username: 'Haroldg1020',
    url: 'https://github.com/Haroldg1020',
  },
  linkedin: 'https://www.linkedin.com/in/harold-guerrero-a9a293258',
  // Muestra la insignia "Disponible para nuevos proyectos" en el hero
  available: true,
  // Sube tu CV a /public y pon la ruta aquí (ej. '/cv-harold-guerrero.pdf') para mostrar el botón
  cvUrl: null as string | null,
} as const;
