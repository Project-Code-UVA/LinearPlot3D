import { Canvas } from "@react-three/fiber";
import { Text } from "@react-three/drei";

export default function ThreeDTextScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      {/* Add ambient light */}
      <ambientLight intensity={0.5} />
      
      {/* 3D Text */}
      <Text
        position={[0, 0, 0]} 
        fontSize={1}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        Hello, Three.js!
      </Text>
    </Canvas>
  );
}
