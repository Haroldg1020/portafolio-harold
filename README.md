# Portafolio · Harold Guerrero

Portafolio personal bilingüe (español / inglés) construido con **Next.js 16**, **React 19**, **Tailwind CSS 4**, **next-intl**, **MDX**, **Motion** y **Lenis**.

🌐 [portafolio-harold.vercel.app](https://portafolio-harold.vercel.app)

## Desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). Copia `.env.example` a `.env.local` y completa las variables que necesites.

## Agregar un proyecto

1. Crea la carpeta `src/content/projects/<slug>/` con dos archivos: `es.mdx` y `en.mdx`.
2. Al inicio de cada archivo exporta sus metadatos:

   ```mdx
   export const metadata = {
     title: 'Nombre del proyecto',
     summary: 'Una frase que lo describa.',
     date: '2026-01-31',
     tags: ['Next.js', 'Python'],
     repo: 'https://github.com/Haroldg1020/mi-repo', // opcional
     demo: 'https://mi-demo.vercel.app',             // opcional
     cover: '/projects/<slug>/cover.png',            // opcional, imagen en /public
     featured: true,                                 // opcional, aparece en la portada
     status: 'done',                                 // 'done' | 'in-progress'
   }

   ## El reto
   ...
   ```

3. Agrega el `<slug>` a la lista en `src/content/projects/index.ts`.

Sin `cover` se genera una portada automática. En la página de inicio salen los 3 proyectos con `featured: true` más recientes.

## Agregar una nota

Igual que un proyecto, pero en `src/content/blog/<slug>/`, con `title`, `summary`, `date` y `tags`. Agrega el slug a `src/content/blog/index.ts`.

## Otros datos editables

| Qué | Dónde |
| --- | --- |
| Correo, LinkedIn, GitHub, disponibilidad, CV | `src/config/site.ts` |
| Textos de todas las secciones (ES / EN) | `messages/es.json` y `messages/en.json` |
| Tecnologías del Stack | `src/content/stack.ts` |

Para mostrar el botón **Descargar CV**, sube el PDF a `public/` y pon su ruta en `cvUrl` dentro de `src/config/site.ts`.

## Formulario de contacto

Usa una Server Action que envía el correo con [Resend](https://resend.com):

1. Crea una cuenta en Resend y genera una API key.
2. En Vercel → Settings → Environment Variables, agrega `RESEND_API_KEY`.
3. Opcional: `CONTACT_TO_EMAIL` (por defecto el correo de `site.ts`) y `CONTACT_FROM_EMAIL`. Con el remitente de prueba `onboarding@resend.dev`, Resend solo entrega al correo con el que creaste la cuenta. Para usar otro remitente, verifica tu dominio en Resend.

Sin la API key, el formulario muestra un mensaje invitando a escribir directamente al correo.

## Funciones

- Paleta de comandos con <kbd>Ctrl</kbd> / <kbd>⌘</kbd> + <kbd>K</kbd>
- Modo claro / oscuro con transición circular (View Transitions)
- Scroll suave (Lenis) y animaciones (Motion) que respetan `prefers-reduced-motion`
- Actividad de GitHub en vivo (se actualiza cada hora; `GITHUB_TOKEN` opcional)
- SEO por idioma: `hreflang`, sitemap, robots e imagen Open Graph generada
- Vercel Analytics y Speed Insights
