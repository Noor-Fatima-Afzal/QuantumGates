import { useState } from "react";

export default function GateControls({ applyGate }) {
  const [selectedGate, setSelectedGate] = useState("");

  const singleQubitGates = [
    { label: "Hadamard (H)", value: "H" },
    { label: "Pauli-X", value: "X" },
    { label: "Pauli-Y", value: "Y" },
    { label: "Pauli-Z", value: "Z" },
    { label: "Phase (S)", value: "S" },
    { label: "T Gate (π/8)", value: "T" },
    { label: "Rotate X-axis (Rx)", value: "Rx" },
    { label: "Rotate Y-axis (Ry)", value: "Ry" },
    { label: "Rotate Z-axis (Rz)", value: "Rz" },
  ];

  const multiQubitGates = [
    { label: "CNOT (Control-X)", value: "CNOT" },
    { label: "Toffoli (CCNOT)", value: "Toffoli" },
    { label: "SWAP", value: "SWAP" },
    // Add more multi-qubit gates here as needed
  ];

  const handleApply = () => {
    if (selectedGate) {
      applyGate(selectedGate);
    }
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="single-qubit"><strong>Single Qubit Gates:</strong> </label>
        <select
          id="single-qubit"
          value={selectedGate}
          onChange={(e) => setSelectedGate(e.target.value)}
          style={{ margin: "0 1rem", padding: "0.4rem" }}
        >
          <option value="">-- Choose Gate --</option>
          {singleQubitGates.map(gate => (
            <option key={gate.value} value={gate.value}>{gate.label}</option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="multi-qubit"><strong>Multi Qubit Gates:</strong> </label>
        <select
          id="multi-qubit"
          value={selectedGate}
          onChange={(e) => setSelectedGate(e.target.value)}
          style={{ margin: "0 1rem", padding: "0.4rem" }}
        >
          <option value="">-- Choose Gate --</option>
          {multiQubitGates.map(gate => (
            <option key={gate.value} value={gate.value}>{gate.label}</option>
          ))}
        </select>
      </div>

      <button onClick={handleApply} style={{ padding: "0.5rem 1rem" }}>
        Apply Gate
      </button>
    </div>
  );
}
