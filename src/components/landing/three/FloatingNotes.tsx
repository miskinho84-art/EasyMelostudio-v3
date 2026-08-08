'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Center } from '@react-three/drei';
import type * as THREE from 'three';

interface FloatingNoteProps {
  position: [number, number, number];
  speed: number;
  color: string;
}

function FloatingNote({ position, speed, color }: FloatingNoteProps) {
  const ref = useRef<THREE.Group>(null);
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.position.y = position[1] + Math.sin(t * speed + offset) * 0.35;
    ref.current.rotation.y = t * 0.3;
  });

  return (
    <group ref={ref} position={position}>
      {/* Note stylisée géométriquement (tête + hampe) — pas de police 3D externe chargée, pour rester léger */}
      <Center>
        <mesh>
          <torusGeometry args={[0.18, 0.06, 8, 16]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
        </mesh>
      </Center>
      <mesh position={[0.16, 0.22, 0]}>
        <boxGeometry args={[0.05, 0.4, 0.05]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

const NOTE_POSITIONS: Array<{ position: [number, number, number]; speed: number; color: string }> = [
  { position: [-2.6, 1.2, -0.5], speed: 0.6, color: '#34D399' },
  { position: [2.4, -0.8, 0.3], speed: 0.5, color: '#D4AF7A' },
  { position: [-2.0, -1.4, 0.8], speed: 0.7, color: '#6EE7B7' },
  { position: [2.8, 1.5, -0.2], speed: 0.45, color: '#10B981' },
];

/**
 * Groupe de notes de musique stylisées flottant autour de la sphère centrale.
 */
export function FloatingNotes() {
  return (
    <>
      {NOTE_POSITIONS.map((note, i) => (
        <FloatingNote key={i} {...note} />
      ))}
    </>
  );
}
