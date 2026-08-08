'use client';

import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { DashboardParticles } from './DashboardParticles';
import { FloatingMusicIcons3D } from './FloatingMusicIcons3D';
import { Equalizer3D } from './Equalizer3D';

function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return prefersReduced;
}

/**
 * Fond 3D ambiant du dashboard : particules, icônes musicales flottantes
 * et égaliseur discret. Purement décoratif, chargé côté client uniquement.
 */
export function DashboardScene() {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div
        aria-hidden="true"
        className="h-full w-full bg-gradient-radial from-emerald-500/10 via-transparent to-transparent"
      />
    );
  }

  return (
    <div aria-hidden="true" className="h-full w-full">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 6], fov: 50 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.35} />
        <pointLight position={[4, 3, 4]} intensity={0.9} color="#10B981" />
        <pointLight position={[-4, -2, -2]} intensity={0.5} color="#D4AF7A" />

        <Suspense fallback={null}>
          <FloatingMusicIcons3D />
          <Equalizer3D />
          <DashboardParticles />
        </Suspense>
      </Canvas>
    </div>
  );
}
