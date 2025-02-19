import "./App.css";
import { Billboard, Line, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useState, useRef } from "react";
import * as THREE from "three";
import TransVector from "./TransVector.jsx";

function ArrowHelper({ vector, color }) {
  const vectorArrow = useRef();

  if (!vectorArrow.current) {
    const start = new THREE.Vector3(0, 0, 0);
    const end = new THREE.Vector3(vector.currX, vector.currZ, vector.currY);
    const direction = new THREE.Vector3().subVectors(end, start).normalize();
    const length = start.distanceTo(end);

    vectorArrow.current = new THREE.ArrowHelper(direction, start, length, color);
  }

  useFrame(() => {
    if (vectorArrow.current) {
      const start = new THREE.Vector3(0, 0, 0);
      const end = new THREE.Vector3(vector.currX, vector.currZ, vector.currY);
      const direction = new THREE.Vector3().subVectors(end, start).normalize();
      const length = start.distanceTo(end);

      vectorArrow.current.setDirection(direction);
      vectorArrow.current.setLength(length);
      vectorArrow.current.setColor(color);
    }
  });

  return <primitive object={vectorArrow.current} />;
}

export default function MyCanvas({
  origin,
  coords,
  inputVectors,
  colors,
  animSpeed,
  matrix,
}) {
  const [t, setT] = useState(0);

  useFrame(() => {
    setT(t + 0.01 * animSpeed);
  });

  let vectors = [];
  inputVectors.forEach((e) => {
    vectors.push(new TransVector(e.x, e.y, e.z, matrix, t));
  });

  return (
    <>
      <Billboard position={[5.5, 0, 0]}>
        <Text fontSize={0.5} color="black" anchorX="center" anchorY="middle">
          X
        </Text>
      </Billboard>

      <Billboard position={[0, 0, 5.5]}>
        <Text fontSize={0.5} color="black" anchorX="center" anchorY="middle">
          Y
        </Text>
      </Billboard>
      <Billboard position={[0, 5.5, 0]}>
        <Text fontSize={0.5} color="black" anchorX="center" anchorY="middle">
          Z
        </Text>
      </Billboard>

      {coords.map((coord, index) => (
        <Line key={index} points={[origin, coord]} color="black"></Line>
      ))}

      {vectors.map((vector, index) => (
        <Line
          key={index}
          points={[
            origin,
            new THREE.Vector3(vector.currX, vector.currZ, vector.currY),
          ]}
          color={colors}
          lineWidth={4}
        />
      ))}

      {vectors.map((vector, index) => (
        <ArrowHelper key={index} vector={vector} color={colors} />
      ))}
    </>
  );
}
