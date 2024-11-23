import "./App.css";
import { Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useState } from "react";
import * as THREE from "three";

export default function MyCanvas({ origin, coordX, coordY, vectors, colors }) {

  const [ x, setX ] = useState(0);

  useFrame(
    () => {
      vectors.forEach((vector) => {
        vector.x = vector.x + 0.01;
        vector.y = vector.y + 0.01;
        vector.z = vector.z + 0.01;
      });
      setX(x + 0.01);
    },
  )

  return (
    <>
      <Line points={[origin, coordX]} color="black"></Line>
      <Line points={[origin, coordY]} color="black"></Line>
      {vectors.map((vector, index) => (
        <Line
          key={index}
          points={[origin, new THREE.Vector3(vector.x, vector.y, vector.z)]}
          color={colors}
          lineWidth={4}
        />
      ))}
    </>
  );
}
