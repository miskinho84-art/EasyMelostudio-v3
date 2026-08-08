'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type * as THREE from 'three';

interface FloatingIconProps {
  position: [number, number, number];
  scale?: number;
  color: string;
  speed: number;
  variant: 'note' | 'ring';
}

function FloatingIcon({ position, scale = 1, color, speed, variant }: FloatingIconProps) {
  const groupRef = useRef<THREE.Group>(null);
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.position.y = position[1] + Math.sin(t * speed + offset) * 0.4;
    groupRef.current.rotation.y = t * 0.25;
    groupRef.current.rotation.z = Math.sin(t * 0.3 + offset) * 0.15;
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {variant === 'note' ? (
        <>
          <mesh>
            <torusGeometry args={[0.16, 0.055, 8, 16]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.55} />
          </mesh>
          <mesh position={[0.14, 0.2, 0]}>
            <boxGeometry args={[0.045, 0.36, 0.045]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.55} />
          </mesh>
        </>
      ) : (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.22, 0.03, 8, 24]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.45} transparent opacity={0.8} />
        </mesh>
      )}
    </group>
  );
}

const ICONS: FloatingIconProps[] = [
  { position: [-3.2, 1.4, -1.5], color: '#34D399', speed: 0.5, variant: 'note', scale: 1.1 },
  { position: [3.0, -1, -2], color: '#D4AF7A', speed: 0.4, variant: 'ring', scale: 1.3 },
  { position: [-2.6, -1.6, -1], color: '#6EE7B7', speed: 0.65, variant: 'note', scale: 0.85 },
  { position: [3.3, 1.6, -1.2], color: '#10B981', speed: 0.35, variant: 'ring', scale: 0.9 },
  { position: [0, 2.2, -2.5], color: '#D4AF7A', speed: 0.55, variant: 'note', scale: 0.75 },
];

/** Groupe d'icônes musicales stylisées flottant avec une rotation lente. */
export function FloatingMusicIcons3D() {
  return (
    <>
      {ICONS.map((icon, i) => (
        <FloatingIcon key={i} {...icon} />
      ))}
    </>
  );
}
