import { Billboard, Line, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useState, useRef } from "react";
import * as THREE from "three";

interface ArrowHelperProps {
  vector: THREE.Vector3;
  color: string;
}

function ArrowHelper({ vector, color }: ArrowHelperProps) {
  const arrowRef = useRef<THREE.ArrowHelper>(
    new THREE.ArrowHelper(new THREE.Vector3(), new THREE.Vector3(), 0, color)
  );

  useFrame(() => {
    const start = new THREE.Vector3(0, 0, 0);
    const end = new THREE.Vector3(vector.x, vector.y, vector.z);
    const direction = new THREE.Vector3().subVectors(end, start).normalize();
    const length = start.distanceTo(end);

    arrowRef.current.setDirection(direction);
    arrowRef.current.setLength(
      length,
      length > 1 ? 0.2 : length * 0.1,
      length > 1 ? 0.2 : length * 0.1
    );
    arrowRef.current.setColor(new THREE.Color(color));
  });

  return <primitive object={arrowRef.current} />;
}

interface MyCanvasProps {
  origin: THREE.Vector3;
  coords: THREE.Vector3[];
  inputVectors: THREE.Vector3[];
  colors: string;
  animSpeed: number;
  matrix: THREE.Matrix3;
  showVectorLabels: boolean;
  showAnimation: boolean;
}

export default function MyCanvas({
  origin,
  coords,
  inputVectors,
  colors,
  animSpeed,
  matrix,
  showVectorLabels,
  showAnimation,
}: MyCanvasProps) {
  const [t, setT] = useState<number>(0);

  useFrame(() => {
    if (showAnimation) {
      setT((prevT) => prevT + 0.01 * animSpeed);
    }
  });

  const animationTime = ((t % 1) + 1) % 1;
  const finalVectors: THREE.Vector3[] = inputVectors.map((vector) =>
    vector.clone().applyMatrix3(matrix)
  );
  const vectors: THREE.Vector3[] = inputVectors.map((vector, index) =>
    vector
      .clone()
      .addScaledVector(
        new THREE.Vector3().subVectors(finalVectors[index], vector),
        animationTime
      )
  );

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
        <Line key={index} points={[origin, coord]} color="black" />
      ))}
      {vectors.map((vector, index) => (
        <>
          <Line
            key={index}
            points={[origin, new THREE.Vector3(vector.x, vector.z, vector.y)]}
            color={colors}
            lineWidth={3}
          />
          {showVectorLabels && (
            <Billboard
              key={`label-${index}`}
              position={[vector.x + 0.1, vector.z + 0.1, vector.y + 0.1]}
            >
              <Text
                fontSize={0.2}
                color="black"
                anchorX="center"
                anchorY="middle"
              >
                {`(${vector.x.toFixed(2)}, ${vector.y.toFixed(
                  2
                )}, ${vector.z.toFixed(2)})`}
              </Text>
            </Billboard>
          )}
        </>
      ))}
      {finalVectors.map((vector, index) => (
        <>
          <Line
            key={`final-${index}`}
            points={[origin, new THREE.Vector3(vector.x, vector.z, vector.y)]}
            color="black"
            lineWidth={1}
          />
          {showVectorLabels && (
            <Billboard
              key={`final-label-${index}`}
              position={[vector.x + 0.1, vector.z + 0.1, vector.y + 0.1]}
            >
              <Text
                fontSize={0.2}
                color="black"
                anchorX="center"
                anchorY="middle"
              >
                {`(${vector.x.toFixed(2)}, ${vector.y.toFixed(
                  2
                )}, ${vector.z.toFixed(2)})`}
              </Text>
            </Billboard>
          )}
        </>
      ))}
      {inputVectors.map((vector, index) => (
        <>
          <Line
            key={`original-${index}`}
            points={[origin, new THREE.Vector3(vector.x, vector.z, vector.y)]}
            color="black"
            lineWidth={1}
          />
          {showVectorLabels && (
            <Billboard
              key={`final-label-${index}`}
              position={[vector.x + 0.1, vector.z + 0.1, vector.y + 0.1]}
            >
              <Text
                fontSize={0.2}
                color="black"
                anchorX="center"
                anchorY="middle"
              >
                {`(${vector.x.toFixed(2)}, ${vector.y.toFixed(
                  2
                )}, ${vector.z.toFixed(2)})`}
              </Text>
            </Billboard>
          )}
        </>
      ))}
      {vectors.map((vector, index) => (
        <ArrowHelper
          key={`arrow-${index}`}
          vector={new THREE.Vector3(vector.x, vector.z, vector.y)}
          color={colors}
        />
      ))}
      {finalVectors.map((vector, index) => (
        <ArrowHelper
          key={`final-arrow-${index}`}
          vector={new THREE.Vector3(vector.x, vector.z, vector.y)}
          color="black"
        />
      ))}
      {inputVectors.map((vector, index) => (
        <ArrowHelper
          key={`original-arrow-${index}`}
          vector={new THREE.Vector3(vector.x, vector.z, vector.y)}
          color="red"
        />
      ))}
    </>
  );
}
