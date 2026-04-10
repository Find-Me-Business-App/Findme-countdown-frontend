"use client";

import { memo, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

// Scale factor to map SVG viewBox (98x98) to 3D units suitable for the camera
const SCALE = 0.045;

const RINGS = [
    {
        color: "#2B365A", // Dark navy
        radiusX: 32.6 * SCALE,
        radiusY: 33.4 * SCALE,
        radialLength: 30 * SCALE,
        dashWidth: 4 * SCALE,
        segments: 34,
        rotationZ: 0,
        zOffset: -0.1,
    },
    {
        color: "#E82525", // Red
        radiusX: 29 * SCALE,
        radiusY: 30 * SCALE,
        radialLength: 30 * SCALE,
        dashWidth: 4 * SCALE,
        segments: 28,
        rotationZ: -0.18,
        zOffset: -0.05,
    },
    {
        color: "#999999", // Gray
        radiusX: 34.9 * SCALE,
        radiusY: 31.1 * SCALE,
        radialLength: 24 * SCALE,
        dashWidth: 3.5 * SCALE,
        segments: 32,
        rotationZ: 1.01,
        zOffset: -0.15,
    }
];

function DashedRing({ config, speedFactor }: { config: typeof RINGS[0], speedFactor: number }) {
    const groupRef = useRef<THREE.Group>(null);

    // Map SVG stroke dasharray to 3D radial box segments
    const segments = useMemo(() => {
        return Array.from({ length: config.segments }, (_, i) => {
            const angle = (i / config.segments) * Math.PI * 2;
            const x = Math.cos(angle) * config.radiusX;
            const y = Math.sin(angle) * config.radiusY;
            return { x, y, angle };
        });
    }, [config]);

    useFrame(({ clock }) => {
        if (groupRef.current) {
            const t = clock.getElapsedTime();
            // Spin slowly around Z axis (facing camera)
            groupRef.current.rotation.z = config.rotationZ + t * 0.15 * speedFactor;

            // Organic liquid wobble for the rings
            groupRef.current.rotation.x = Math.sin(t * 0.8 * speedFactor) * 0.05;
            groupRef.current.rotation.y = Math.cos(t * 0.6 * speedFactor) * 0.05;

            // Subtle expansion and contraction
            const scale = 1 + Math.sin(t * 2 + config.rotationZ) * 0.02;
            groupRef.current.scale.set(scale, scale, 1);
        }
    });

    return (
        <group ref={groupRef} position={[0, 0, config.zOffset]}>
            {segments.map((seg, i) => (
                <mesh
                    key={i}
                    position={[seg.x, seg.y, 0]}
                    rotation={[0, 0, seg.angle]}
                >
                    <boxGeometry args={[config.radialLength, config.dashWidth, 0.05]} />
                    <meshBasicMaterial color={config.color} />
                </mesh>
            ))}
        </group>
    );
}

function CoreGroup() {
    const groupRef = useRef<THREE.Group>(null);
    const lineRef = useRef<THREE.Mesh>(null);

    useFrame(({ clock }) => {
        if (groupRef.current) {
            const t = clock.getElapsedTime();
            // Float up and down slightly
            groupRef.current.position.y = Math.sin(t * 1.5) * 0.02;
            groupRef.current.rotation.z = Math.sin(t * 0.5) * 0.02;
        }
    });

    const rx = 33.2 * SCALE;

    // Scale the line down so it stays safely within the distorted sphere's minimum radius
    // Since the sphere distorts by ~0.25, we make the line short enough to never breach the edges
    const lineWidth = rx * 1.5;

    // Max expansion radius roughly accounts for the distortion factor
    const maxZ = rx + 0.35;

    return (
        <group ref={groupRef} position={[0, 0, 0.1]}>
            {/* The Solid Black Liquid Sphere */}
            <mesh scale={rx}>
                <sphereGeometry args={[1, 64, 64]} />
                <MeshDistortMaterial
                    color="#000000"
                    transparent={false}
                    opacity={1}
                    roughness={0.2}
                    metalness={0.8}
                    distort={0.25} // Liquid geometry distortion 
                    speed={2}      // Speed of the liquid morphing
                />
            </mesh>

            {/* The Equator Line */}
            <mesh ref={lineRef} position={[0, 0, maxZ]}>
                <boxGeometry args={[lineWidth, 0.015, 0.015]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
            </mesh>
        </group>
    );
}

function OrbScene() {
    return (
        <group scale={0.85}>
            {/* Lighting keeps the liquid core looking shiny and 3D */}
            <ambientLight intensity={0.5} />
            <directionalLight position={[2, 5, 4]} intensity={1.5} />
            <pointLight position={[-3, -3, 3]} intensity={1} color="#3b82f6" />

            <CoreGroup />
            {RINGS.map((config, i) => (
                <DashedRing key={i} config={config} speedFactor={0.5 + i * 0.25} />
            ))}
        </group>
    );
}

function AiOrbInner() {
    return (
        <div className="relative w-28 h-28 md:w-44 md:h-44">
            <Canvas
                camera={{ position: [0, 0, 6], fov: 45 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true }}
                style={{ background: "transparent" }}
            >
                <OrbScene />
            </Canvas>
        </div>
    );
}

const AiOrb = memo(AiOrbInner);
AiOrb.displayName = "AiOrb";

export default AiOrb;
