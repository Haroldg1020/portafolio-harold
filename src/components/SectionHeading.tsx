import * as motion from 'motion/react-client';

interface SectionHeadingProps {
  num: string;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export default function SectionHeading({ num, title, subtitle, action }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
    >
      <div>
        <p className="text-xs font-mono text-accent mb-3 tracking-widest">{num} /</p>
        <h2 className="text-3xl md:text-5xl font-bold text-primary">{title}</h2>
        {subtitle && <p className="mt-4 text-secondary font-light max-w-xl">{subtitle}</p>}
      </div>
      {action}
    </motion.div>
  );
}
