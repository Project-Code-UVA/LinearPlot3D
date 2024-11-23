import React, { useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";

function RotatingBox({ size }) {
  const meshRef = React.useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

function App() {
  const [boxSize, setBoxSize] = useState(1); // Default size of 1

  const coordX = new THREE.Vector3(5, 0, 0);
  const coordY = new THREE.Vector3(0, 5, 0);

  return (
    <>
      <div className="app">
        <div className="side">
          <div>
            <label>Box Size: </label>
            <input
              type="number"
              value={boxSize}
              min="0.1"
              step="0.1"
              onChange={(e) => setBoxSize(Number(e.target.value))}
            />
          </div>
        </div>
        <div className="canvas-bound">
          <Canvas>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Line points={[new THREE.Vector3(0, 0, 0), coordX]} color="black" />
            <Line points={[new THREE.Vector3(0, 0, 0), coordY]} color="black" />
            <RotatingBox size={boxSize} />
          </Canvas>
        </div>
      </div>
    </>
  );
}

export default App;
