import { useState } from "react";
import BlochSphere from "./components/BlochSphere";
import GateControls from "./components/GateControls";
import GateInfo from "./components/GateInfo";

export default function App() {
  const [theta, setTheta] = useState(0);  // Polar angle
  const [phi, setPhi] = useState(0);      // Azimuthal angle
  const [currentGate, setCurrentGate] = useState(null);  // Track applied gate

  const applyGate = (gate) => {
  setCurrentGate(gate);

  if (gate === "X") setTheta(Math.PI);
  if (gate === "H") setTheta(Math.PI / 2);
  if (gate === "Z") setPhi(phi + Math.PI);
  if (gate === "Y") {
    setTheta(Math.PI - theta);
    setPhi(phi + Math.PI);
  }
  if (gate === "S") setPhi(phi + Math.PI / 2);
  if (gate === "T") setPhi(phi + Math.PI / 4);

  if (gate === "Rx") setTheta(theta + Math.PI / 4);  // Example: 45° rotation
  if (gate === "Ry") setTheta(theta + Math.PI / 4);  // Similar for Y-axis
  if (gate === "Rz") setPhi(phi + Math.PI / 4);      // Z-axis phase rotation
};


  return (
    <div>
      <h1>Quantum Gates Visualizer</h1>
      <GateControls applyGate={applyGate} />
      <BlochSphere stateVector={[theta, phi]} />
      <GateInfo gate={currentGate} stateVector={[theta, phi]} />
    </div>
  );
}
