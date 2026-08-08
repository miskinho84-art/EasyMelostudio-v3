'use client';

import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { ParticleField } from './ParticleField';
import { GlowSphere } from './GlowSphere';
import { FloatingNotes } from './FloatingNotes';

function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return prefersReduced;
}

/**
 * Scène 3D signature du Hero : sphère lumineuse + particules + notes
 * flottantes. Rendue uniquement côté client. Respecte
 * prefers-reduced-motion en désactivant les animations continues.
 */
export function HeroScene() {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) {
    // Fallback statique : un halo dégradé au lieu d'une scène animée.
    return (
      <div
        aria-hidden="true"
        className="h-full w-full rounded-full bg-gradient-radial from-emerald-500/20 via-transparent to-transparent"
      />
    );
  }

  return (
    <div aria-hidden="true" className="h-full w-full">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[4, 4, 4]} intensity={1} color="#10B981" />
        <pointLight position={[-4, -2, -2]} intensity={0.6} color="#D4AF7A" />

        <Suspense fallback={null}>
          <GlowSphere />
          <FloatingNotes />
          <ParticleField />
        </Suspense>
      </Canvas>
    </div>
  );
}
