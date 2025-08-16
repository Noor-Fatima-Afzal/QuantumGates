// import { useState } from "react";
// import BlochSphere from "./components/BlochSphere";
// import GateControls from "./components/GateControls";
// import GateInfo from "./components/GateInfo";

// export default function App() {
//   const [theta, setTheta] = useState(0);  // Polar angle
//   const [phi, setPhi] = useState(0);      // Azimuthal angle
//   const [currentGate, setCurrentGate] = useState(null);  // Track applied gate

//   const applyGate = (gate) => {
//   setCurrentGate(gate);

//   if (gate === "X") setTheta(Math.PI);
//   if (gate === "H") setTheta(Math.PI / 2);
//   if (gate === "Z") setPhi(phi + Math.PI);
//   if (gate === "Y") {
//     setTheta(Math.PI - theta);
//     setPhi(phi + Math.PI);
//   }
//   if (gate === "S") setPhi(phi + Math.PI / 2);
//   if (gate === "T") setPhi(phi + Math.PI / 4);

//   if (gate === "Rx") setTheta(theta + Math.PI / 4);  // Example: 45° rotation
//   if (gate === "Ry") setTheta(theta + Math.PI / 4);  // Similar for Y-axis
//   if (gate === "Rz") setPhi(phi + Math.PI / 4);      // Z-axis phase rotation
// };


//   return (
//     <div>
//       <h1>Quantum Gates Visualizer</h1>
//       <GateControls applyGate={applyGate} />
//       <BlochSphere stateVector={[theta, phi]} />
//       <GateInfo gate={currentGate} stateVector={[theta, phi]} />
//     </div>
//   );
// }


// App.jsx
import { useState } from "react";
import GateControls from "./components/GateControls";
import GateInfo from "./components/GateInfo";

// 3D + UI bits from the simulator
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, Line, Html } from "@react-three/drei";
import { motion } from "framer-motion";
import "./BlochSphereSimulator.css";

export default function App() {
  const [theta, setTheta] = useState(0);  // Polar angle
  const [phi, setPhi] = useState(0);      // Azimuthal angle
  const [currentGate, setCurrentGate] = useState(null);  // Track applied gate

  // --- your gate logic kept, but with safe functional updates to avoid stale state ---
  const applyGate = (gate) => {
    setCurrentGate(gate);

    if (gate === "X") setTheta(() => Math.PI);
    if (gate === "H") setTheta(() => Math.PI / 2);
    if (gate === "Z") setPhi(p => p + Math.PI);
    if (gate === "Y") {
      setTheta(t => Math.PI - t);
      setPhi(p => p + Math.PI);
    }
    if (gate === "S") setPhi(p => p + Math.PI / 2);
    if (gate === "T") setPhi(p => p + Math.PI / 4);

    if (gate === "Rx") setTheta(t => t + Math.PI / 4);  // Example: 45° rotation
    if (gate === "Ry") setTheta(t => t + Math.PI / 4);  // Similar for Y-axis
    if (gate === "Rz") setPhi(p => p + Math.PI / 4);    // Z-axis phase rotation
  };

  // --- simulator math (driven by the same theta/phi) ---
  const x = Math.sin(theta) * Math.cos(phi);
  const y = Math.sin(theta) * Math.sin(phi);
  const z = Math.cos(theta);
  const toDegrees = (radians) => (radians * 180) / Math.PI;

  return (
    <div className="bloch-container">
      <h1 className="bloch-title">Quantum Gates Visualizer</h1>

      {/* your gate buttons, unchanged */}
      <GateControls applyGate={applyGate} />

      {/* merged simulator UI */}
      <div className="bloch-grid">
        <div className="bloch-panel">
          <h2 className="bloch-subtitle">Control Panel</h2>

          <div className="bloch-control">
            <label>Theta (0° to 180°):</label>
            <input
              type="range"
              min="0"
              max={Math.PI}
              step="0.01"
              value={theta}
              onChange={(e) => setTheta(parseFloat(e.target.value) || 0)}
            />
            <span>θ = {toDegrees(theta).toFixed(1)}°</span>
          </div>

          <div className="bloch-control">
            <label>Phi (0° to 360°):</label>
            <input
              type="range"
              min="0"
              max={2 * Math.PI}
              step="0.01"
              value={phi}
              onChange={(e) => setPhi(parseFloat(e.target.value) || 0)}
            />
            <span>ϕ = {toDegrees(phi).toFixed(1)}°</span>
          </div>

          <div className="bloch-full-coords">
            <h3>Coordinate Calculation:</h3>
            <ul>
              <li>θ = {toDegrees(theta).toFixed(1)}°, ϕ = {toDegrees(phi).toFixed(1)}°</li>
              <li>x = sin(θ) × cos(ϕ) = {x.toFixed(2)}</li>
              <li>y = sin(θ) × sin(ϕ) = {y.toFixed(2)}</li>
              <li>z = cos(θ) = {z.toFixed(2)}</li>
            </ul>
          </div>
        </div>

        <div className="bloch-visual">
          <Canvas camera={{ position: [3, 3, 3] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[5, 5, 5]} />
            <OrbitControls />

            <Sphere args={[1, 64, 64]}>
              <meshStandardMaterial color="#00FFFF" transparent opacity={0.15} />
            </Sphere>

            <Line points={[[0, 0, 0], [1.5, 0, 0]]} color="red" />
            <Html position={[1.7, 0, 0]} center>
              <span className="axis-label">X-axis</span>
            </Html>

            <Line points={[[0, 0, 0], [0, 1.5, 0]]} color="green" />
            <Html position={[0, 1.7, 0]} center>
              <span className="axis-label">Y-axis</span>
            </Html>

            <Line points={[[0, 0, 0], [0, 0, 1.5]]} color="blue" />
            <Html position={[0, 0, 1.7]} center>
              <span className="axis-label">Z-axis</span>
            </Html>

            {/* Quantum state vector */}
            <Line points={[[0, 0, 0], [x, y, z]]} color="orange" lineWidth={3} />

            {/* North Pole |0⟩ */}
            <Html position={[0, 0, 1.1]} center>
              <div className="state-label">|0⟩</div>
            </Html>

            {/* South Pole |1⟩ */}
            <Html position={[0, 0, -1.1]} center>
              <div className="state-label">|1⟩</div>
            </Html>

            {/* Equator Superposition Markers */}
            <Line points={[[1, 0, 0], [-1, 0, 0]]} color="yellow" />
            <Line points={[[0, 1, 0], [0, -1, 0]]} color="yellow" />

            <Html position={[1.2, 0, 0]} center>
              <div className="state-label">Superposition Plane</div>
            </Html>

            {/* Live angle indicators */}
            <Html position={[x / 2, y / 2, 0]} center>
              <div className="state-label">ϕ = {toDegrees(phi).toFixed(1)}°</div>
            </Html>

            <Html position={[0, 0, z / 2]} center>
              <div className="state-label">θ = {toDegrees(theta).toFixed(1)}°</div>
            </Html>
          </Canvas>
        </div>
      </div>

      <motion.div className="bloch-equation" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h2>Quantum State Representation</h2>
        <p>|ψ⟩ = cos(θ/2)|0⟩ + e<sup>iφ</sup> sin(θ/2)|1⟩</p>
      </motion.div>

      {/* your GateInfo unchanged, now reflecting merged state */}
      <GateInfo gate={currentGate} stateVector={[theta, phi]} />
    </div>
  );
}

