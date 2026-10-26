"use client";

import { MotionConfig } from 'motion/react';
import { ReactLenis } from 'lenis/react';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    // "user" turns transform animations off when the OS asks for reduced motion
    <MotionConfig reducedMotion="user">
      <ReactLenis root options={{ lerp: 0.12 }}>
        {children}
      </ReactLenis>
    </MotionConfig>
  );
}
