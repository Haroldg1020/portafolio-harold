import type { IconType } from 'react-icons';
import {
  SiNextdotjs, SiReact, SiTypescript, SiTailwindcss, SiFramer, SiNodedotjs,
  SiPostgresql, SiPython, SiDocker, SiGit, SiFigma,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';

export type StackCategory = 'frontend' | 'backend' | 'data' | 'tools';

export type Tech = {
  name: string;
  icon: IconType;
  /** Brand color shown on hover */
  color: string;
};

// Edita esta lista para cambiar las tecnologías que aparecen en la sección Stack
export const stack: Record<StackCategory, Tech[]> = {
  frontend: [
    { name: 'Next.js', icon: SiNextdotjs, color: '#a1a1aa' },
    { name: 'React', icon: SiReact, color: '#61dafb' },
    { name: 'TypeScript', icon: SiTypescript, color: '#3178c6' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#38bdf8' },
    { name: 'Framer Motion', icon: SiFramer, color: '#e11d74' },
  ],
  backend: [
    { name: 'Node.js', icon: SiNodedotjs, color: '#5fa04e' },
    { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169e1' },
  ],
  data: [
    { name: 'Python', icon: SiPython, color: '#3776ab' },
  ],
  tools: [
    { name: 'Docker', icon: SiDocker, color: '#2496ed' },
    { name: 'AWS', icon: FaAws, color: '#ff9900' },
    { name: 'Git', icon: SiGit, color: '#f05032' },
    { name: 'Figma', icon: SiFigma, color: '#a259ff' },
  ],
};
