"use client";

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function Hero() {
  const t = useTranslations('Hero');
  // Obtenemos el nombre y título del diccionario de traducciones, pero
  // para el diseño masivo vamos a separar el nombre.
  const fullName = t('name'); // asume que es "Harold Guerrero"
  const names = fullName.split(' ');
  const firstName = names[0] || 'HAROLD';
  const lastName = names[1] || 'GUERRERO';

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-carbon pt-32">
      {/* Patrón geométrico sutil (Brutalist wireframe vibe) */}
      <div className="absolute inset-0 z-0 opacity-20" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
        backgroundSize: '32px 32px'
      }}></div>

      {/* Acentos de luz sutiles */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <div className="w-[1000px] h-[300px] bg-accent/5 blur-[120px] rounded-[100%] rotate-45"></div>
      </div>

      <div className="relative z-10 w-full px-6 md:px-12 flex flex-col items-start justify-center">
        
        {/* Micro-typography top bar */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/5 pb-4 mb-8 md:mb-12 gap-4 md:gap-0"
        >
          <p className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-gray-400">
            <span className="text-accent mr-2">●</span> {t('areas')}
            <br/>
            <span className="text-accent mt-1 inline-block">{t('portfolio')} — {new Date().getFullYear()}</span>
          </p>
          <p className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-gray-500 text-left md:text-right">
            {t('role')}
            <br/>
            <span className="text-gray-600 mt-1 inline-block">{t('location')}</span>
          </p>
        </motion.div>

        {/* Tipografía Masiva (Brutalist style) */}
        <div className="w-full flex flex-col uppercase leading-[0.9] sm:leading-[0.85] select-none">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="relative z-20 w-fit"
          >
            <h1 className="text-[13vw] sm:text-[14vw] md:text-[15vw] font-black tracking-tighter text-white m-0 inline-block">
              {firstName}
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="w-fit"
          >
            <h1 className="text-[13vw] sm:text-[14vw] md:text-[15vw] font-black tracking-tighter text-outline m-0 ml-[2vw] sm:ml-[4vw] md:ml-[5vw] inline-block w-fit cursor-default">
              {lastName}
            </h1>
          </motion.div>
        </div>

        {/* Hook / Subtítulo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-12 md:mt-16 w-full flex flex-col md:flex-row justify-between items-start md:items-end border-t border-white/5 pt-8 gap-6 md:gap-0"
        >
          <p className="text-sm md:text-base text-gray-400 font-light max-w-md uppercase tracking-wider leading-relaxed">
            {t('hook')}
          </p>
          
          <a 
            href="#about"
            className="group flex items-center gap-4 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-white hover:text-accent transition-colors"
          >
            {t('scroll')}
            <span className="w-8 h-[1px] bg-white group-hover:bg-accent transition-colors block"></span>
          </a>
        </motion.div>
      </div>

      {/* Decoración geométrica adicional sugerida (el círculo rojo) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
        className="absolute bottom-[20%] right-[10%] z-0 hidden lg:block"
      >
        <div className="w-12 h-12 rounded-full bg-accent animate-pulse shadow-[0_0_30px_rgba(204,41,43,0.5)]"></div>
      </motion.div>

    </section>
  );
}
