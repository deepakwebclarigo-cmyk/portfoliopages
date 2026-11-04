'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useReducedMotion } from 'framer-motion';
import { Component, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import type { Group, Points } from 'three';

function OrbitalArtwork({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<Group>(null);
  const particles = useRef<Points>(null);
  const positions = useMemo(() => {
    const values = new Float32Array(540);
    for (let index = 0; index < values.length / 3; index += 1) {
      const vertical = 1 - (index / (values.length / 3 - 1)) * 2;
      const radius = Math.sqrt(1 - vertical * vertical);
      const angle = Math.PI * (3 - Math.sqrt(5)) * index;
      const spread = 1.65 + Math.sin(index * 17.7) * 0.18;
      values[index * 3] = Math.cos(angle) * radius * spread;
      values[index * 3 + 1] = vertical * spread;
      values[index * 3 + 2] = Math.sin(angle) * radius * spread;
    }
    return values;
  }, []);

  useFrame(({ pointer }, delta) => {
    if (!group.current || !particles.current || reducedMotion) return;
    delta = Math.min(delta, .05);
    group.current.rotation.y += delta * 0.06;
    group.current.rotation.x += (pointer.y * 0.12 - group.current.rotation.x) * delta * 0.3;
    group.current.rotation.y += (pointer.x * 0.12 - group.current.rotation.y) * delta * 0.12;
    particles.current.rotation.y -= delta * 0.025;
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.22, 2]} />
        <meshBasicMaterial color="#f4415a" wireframe transparent opacity={0.28} />
      </mesh>
      <mesh rotation={[0.5, 0.35, 0.2]}>
        <torusGeometry args={[1.55, 0.003, 5, 160]} />
        <meshBasicMaterial color="#ef4761" transparent opacity={0.38} />
      </mesh>
      <mesh rotation={[-0.45, 0.2, 0.7]}>
        <torusGeometry args={[1.72, 0.002, 5, 160]} />
        <meshBasicMaterial color="#6d7897" transparent opacity={0.25} />
      </mesh>
      <points ref={particles}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#f4415a" size={0.022} sizeAttenuation transparent opacity={0.72} />
      </points>
      <mesh>
        <sphereGeometry args={[0.09, 24, 24]} />
        <meshBasicMaterial color="#f4415a" />
      </mesh>
    </group>
  );
}

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <div className="sceneFallback" /> : this.props.children; }
}

export default function PortfolioScene() {
  const reducedMotion = useReducedMotion() ?? false;
  const container = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);
  useEffect(() => {
    let visible = true;
    const update = () => setActive(visible && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
    if (container.current) observer.observe(container.current);
    document.addEventListener('visibilitychange', update);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', update); };
  }, []);
  return (
    <div ref={container} style={{ width: '100%', height: '100%' }}><SceneBoundary>
    <Canvas
      camera={{ position: [0, 0, 5.2], fov: 40 }}
      dpr={[1, 1.5]}
      frameloop={!active ? 'never' : reducedMotion ? 'demand' : 'always'}
      gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}
      fallback={<div className="sceneFallback" />}
      aria-hidden="true"
    >
      <ambientLight intensity={0.8} />
      <OrbitalArtwork reducedMotion={reducedMotion} />
    </Canvas>
    </SceneBoundary></div>
  );
}
