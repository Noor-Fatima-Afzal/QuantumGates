export default function GateInfo({ gate, stateVector }) {
  if (!gate) return <p>Apply a gate to see details...</p>;

  const singleQubitGates = {
    H: {
      name: "Hadamard Gate",
      matrix: [["1/√2", "1/√2"], ["1/√2", "-1/√2"]],
      description: "Creates superposition.",
      animation: "Rotate to equator.",
      diagram: `|ψ⟩ ──H──`
    },
    X: {
      name: "Pauli-X Gate",
      matrix: [[0, 1], [1, 0]],
      description: "Bit flip (|0⟩ ↔ |1⟩).",
      animation: "Flips vertically.",
      diagram: `|ψ⟩ ──X──`
    },
    Y: {
      name: "Pauli-Y Gate",
      matrix: [[0, "-i"], ["i", 0]],
      description: "Bit & phase flip.",
      animation: "Rotates Y-axis.",
      diagram: `|ψ⟩ ──Y──`
    },
    Z: {
      name: "Pauli-Z Gate",
      matrix: [[1, 0], [0, -1]],
      description: "Phase flip.",
      animation: "Rotates Z-axis.",
      diagram: `|ψ⟩ ──Z──`
    },
    S: {
      name: "Phase (S) Gate",
      matrix: [[1, 0], [0, "i"]],
      description: "√Z phase shift.",
      animation: "Phase rotation.",
      diagram: `|ψ⟩ ──S──`
    },
    T: {
      name: "T Gate (π/8)",
      matrix: [[1, 0], [0, "e^{iπ/4}"]],
      description: "π/8 phase shift.",
      animation: "Small phase rotation.",
      diagram: `|ψ⟩ ──T──`
    },
    Rx: {
      name: "Rx Rotation",
      matrix: [["cos(θ/2)", "-i sin(θ/2)"], ["-i sin(θ/2)", "cos(θ/2)"]],
      description: "Rotate around X-axis.",
      animation: "Adjusts θ.",
      diagram: `|ψ⟩ ──Rx──`
    },
    Ry: {
      name: "Ry Rotation",
      matrix: [["cos(θ/2)", "-sin(θ/2)"], ["sin(θ/2)", "cos(θ/2)"]],
      description: "Rotate around Y-axis.",
      animation: "Adjusts θ.",
      diagram: `|ψ⟩ ──Ry──`
    },
    Rz: {
      name: "Rz Rotation",
      matrix: [["e^{-iφ/2}", 0], [0, "e^{iφ/2}"]],
      description: "Rotate around Z-axis.",
      animation: "Adjusts φ.",
      diagram: `|ψ⟩ ──Rz──`
    }
  };

  const multiQubitGates = {
    CNOT: {
      name: "CNOT Gate (Control-X)",
      description: "Entangles control and target qubits. Flips target if control is |1⟩.",
      diagram: `
Control ──●──
Target  ──X──`
    },
    Toffoli: {
      name: "Toffoli Gate (CCNOT)",
      description: "Flips target if both control qubits are |1⟩.",
      diagram: `
Control ──●──
Control ──●──
Target  ──X──`
    },
    SWAP: {
      name: "SWAP Gate",
      description: "Swaps the state of two qubits.",
      diagram: `
Qubit A ──X──
           │  
Qubit B ──X──`
    }
  };

  const [theta, phi] = stateVector;

  // Check which group the gate belongs to
  if (singleQubitGates[gate]) {
    const details = singleQubitGates[gate];

    return (
      <div className="gate-info">
        <h2>{details.name} (Single Qubit)</h2>

        <p><strong>Description:</strong> {details.description}</p>

        <p><strong>Matrix:</strong></p>
        <div className="matrix">
          {details.matrix.map((row, rowIndex) => (
            <div key={`row-${rowIndex}`} className="matrix-row">
              [ {row.map((el, elIndex) => (
                <span key={`el-${rowIndex}-${elIndex}`} className="matrix-el">{el}</span>
              ))} ]
            </div>
          ))}
        </div>

        <p><strong>Gate Diagram:</strong></p>
        <pre>{details.diagram}</pre>

        <p><strong>Current State:</strong></p>
        <pre>
          θ (theta): {(theta * 180 / Math.PI).toFixed(2)}°{"\n"}
          φ (phi): {(phi * 180 / Math.PI).toFixed(2)}°
        </pre>

        <p><strong>Visual Explanation:</strong> {details.animation}</p>
      </div>
    );
  }

  if (multiQubitGates[gate]) {
    const details = multiQubitGates[gate];

    return (
      <div className="gate-info">
        <h2>{details.name} (Multi Qubit)</h2>
        <p><strong>Description:</strong> {details.description}</p>
        <p><strong>Gate Diagram:</strong></p>
        <pre>{details.diagram}</pre>
        <p style={{ color: "#ff6666" }}><strong>Note:</strong> Multi-qubit visualization is not yet supported on Bloch Sphere.</p>
      </div>
    );
  }

  return <p>Gate information not found.</p>;
}
