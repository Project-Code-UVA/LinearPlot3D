import "./App.css";
import { Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useState } from "react";
import * as THREE from "three";
import TransVector from "./TransVector.jsx"

export default function MyCanvas({ origin, coordX, coordY, coordZ, inputVectors, colors, animSpeed, matrix }) {
  const [ t, setT ] = useState(0);

  useFrame(
    () => {
      setT(t + 0.01*animSpeed);
    },
  )

  let vectors = [];
  inputVectors.forEach((e) => {
    vectors.push(new TransVector(e.x, e.y, e.z, matrix, t));
  });

  return (
    <>
      <Line points={[origin, coordX]} color="black"></Line>
      <Line points={[origin, coordY]} color="black"></Line>
      <Line points={[origin, coordZ]} color="black"></Line>
      {vectors.map((vector, index) => (
        <Line
          key={index}
          points={[origin, new THREE.Vector3(vector.currX, vector.currY, vector.currZ)]}
          color={colors}
          lineWidth={4}
        />
      ))}
    </>
  );
}
