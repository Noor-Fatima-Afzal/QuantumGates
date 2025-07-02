import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, Line, Html } from "@react-three/drei";
import { useMemo } from "react";
import { motion } from "framer-motion";

export default function BlochSphere({ stateVector }) {
  const blochPoint = useMemo(() => {
    const [theta, phi] = stateVector;
    const x = Math.sin(theta) * Math.cos(phi);
    const y = Math.sin(theta) * Math.sin(phi);
    const z = Math.cos(theta);
    return [x, y, z];
  }, [stateVector]);

  return (
    <Canvas style={{ height: 400 }}>
      <ambientLight />
      <OrbitControls />

      {/* Sphere */}
      <Sphere args={[1, 32, 32]} wireframe>
        <meshBasicMaterial color="lightblue" wireframe />
      </Sphere>

      {/* Axes Labels */}
      <Html position={[0, 0, 1.2]} center><b>|0⟩</b></Html>
      <Html position={[0, 0, -1.2]} center><b>|1⟩</b></Html>
      <Html position={[1.2, 0, 0]} center><b>+X</b></Html>
      <Html position={[-1.2, 0, 0]} center><b>-X</b></Html>
      <Html position={[0, 1.2, 0]} center><b>+Y</b></Html>
      <Html position={[0, -1.2, 0]} center><b>-Y</b></Html>

      {/* Animated State Vector */}
      <Line points={[[0, 0, 0], blochPoint]} color="red" lineWidth={3} />
    </Canvas>
  );
}
