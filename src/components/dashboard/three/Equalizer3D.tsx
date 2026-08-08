'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type * as THREE from 'three';

const BAR_COUNT = 9;

/** Égaliseur 3D : rangée de barres dont la hauteur pulse indépendamment. */
export function Equalizer3D({ position = [0, -1.6, -1] as [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const barsRef = useRef<(THREE.Mesh | null)[]>([]);

  const bars = useMemo(
    () =>
      Array.from({ length: BAR_COUNT }, (_, i) => ({
        x: (i - (BAR_COUNT - 1) / 2) * 0.32,
        speed: 0.8 + Math.random() * 1.4,
        offset: Math.random() * Math.PI * 2,
        color: i % 2 === 0 ? '#34D399' : '#D4AF7A',
      })),
    []
  );

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    bars.forEach((bar, i) => {
      const mesh = barsRef.current[i];
      if (!mesh) return;
      const height = 0.3 + (Math.sin(t * bar.speed + bar.offset) * 0.5 + 0.5) * 0.9;
      mesh.scale.y = height;
      mesh.position.y = height / 2;
    });
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.05) * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {bars.map((bar, i) => (
        <mesh
          key={i}
          position={[bar.x, 0.3, 0]}
          ref={(el) => {
            barsRef.current[i] = el;
          }}
        >
          <boxGeometry args={[0.14, 1, 0.14]} />
          <meshStandardMaterial
            color={bar.color}
            emissive={bar.color}
            emissiveIntensity={0.5}
            transparent
            opacity={0.85}
          />
        </mesh>
      ))}
    </group>
  );
}
