import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Animated particles that float in 3D space
 * Creates a network of connected points with interactive behavior
 */
function FloatingParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  // Generate particle positions
  const particleCount = 100;
  const positions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, []);

  // Generate connections between nearby particles
  const linePositions = useMemo(() => {
    const lines: number[] = [];
    const maxDistance = 3;
    
    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const x1 = positions[i * 3];
        const y1 = positions[i * 3 + 1];
        const z1 = positions[i * 3 + 2];
        const x2 = positions[j * 3];
        const y2 = positions[j * 3 + 1];
        const z2 = positions[j * 3 + 2];
        
        const distance = Math.sqrt((x2-x1)**2 + (y2-y1)**2 + (z2-z1)**2);
        
        if (distance < maxDistance) {
          lines.push(x1, y1, z1, x2, y2, z2);
        }
      }
    }
    return new Float32Array(lines);
  }, [positions]);

  // Animate particles with gentle floating motion
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      linesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group>
      {/* Floating particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={positions}
            count={particleCount}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial 
          size={0.05} 
          color="#3b82f6" 
          transparent
          opacity={0.8}
          sizeAttenuation={true}
        />
      </points>

      {/* Connection lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={linePositions}
            count={linePositions.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial 
          color="#3b82f6" 
          transparent
          opacity={0.2}
        />
      </lineSegments>
    </group>
  );
}

/**
 * Floating geometric shapes for visual interest
 */
function FloatingGeometry() {
  return (
    <group>
      <Float
        speed={1.5}
        rotationIntensity={1}
        floatIntensity={0.5}
        floatingRange={[-2, 2]}
      >
        <mesh position={[-8, 3, -5]}>
          <octahedronGeometry args={[0.5]} />
          <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.3} />
        </mesh>
      </Float>

      <Float
        speed={2}
        rotationIntensity={1.5}
        floatIntensity={0.8}
        floatingRange={[-1, 1]}
      >
        <mesh position={[6, -2, -8]}>
          <icosahedronGeometry args={[0.3]} />
          <meshBasicMaterial color="#06b6d4" wireframe transparent opacity={0.4} />
        </mesh>
      </Float>

      <Float
        speed={1.8}
        rotationIntensity={0.8}
        floatIntensity={0.6}
        floatingRange={[-1.5, 1.5]}
      >
        <mesh position={[3, 5, -6]}>
          <tetrahedronGeometry args={[0.4]} />
          <meshBasicMaterial color="#f59e0b" wireframe transparent opacity={0.3} />
        </mesh>
      </Float>
    </group>
  );
}

/**
 * Main 3D space background component
 * Provides animated starfield and floating elements
 */
export default function SpaceBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ 
          position: [0, 0, 10], 
          fov: 60,
          near: 0.1,
          far: 1000
        }}
        style={{ background: 'transparent' }}
      >
        {/* Ambient lighting */}
        <ambientLight intensity={0.2} />
        
        {/* Animated starfield */}
        <Stars 
          radius={100} 
          depth={50} 
          count={5000} 
          factor={4} 
          saturation={0} 
          fade 
          speed={0.5}
        />
        
        {/* Floating particle network */}
        <FloatingParticles />
        
        {/* Floating geometric shapes */}
        <FloatingGeometry />
      </Canvas>
    </div>
  );
}