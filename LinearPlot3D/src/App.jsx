import { useRef, useState } from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Line, Text } from "@react-three/drei";
import * as THREE from "three";

const origin = new THREE.Vector3(0, 0, 0);

function App() {
  const coordX = new THREE.Vector3(5, 0, 0);
  const coordY = new THREE.Vector3(0, 5, 0);

  const [line1, setLine1] = useState([origin, origin]);

  const [line2, setLine2] = useState([origin, origin]);

  const [line3, setLine3] = useState([origin, origin]);

  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);
  const inputRef4 = useRef(null);
  const inputRef5 = useRef(null);
  const inputRef6 = useRef(null);

  const handleInput1Change = () => {
    setLine1([
      line1[0],
      new THREE.Vector3(
        Number(inputRef1.current.value),
        line1[1].y,
        line1[1].z
      ),
    ]);
  };

  const handleInput2Change = () => {
    setLine1([
      line1[0],
      new THREE.Vector3(
        line1[1].x,
        Number(inputRef2.current.value),
        line1[1].z
      ),
    ]);
  };

  const handleInput3Change = () => {
    setLine2([
      line2[0],
      new THREE.Vector3(
        Number(inputRef3.current.value),
        line2[1].y,
        line2[1].z
      ),
    ]);
  };

  const handleInput4Change = () => {
    setLine2([
      line2[0],
      new THREE.Vector3(
        line2[1].x,
        Number(inputRef4.current.value),
        line2[1].z
      ),
    ]);
  };

  const handleInput5Change = () => {
    setLine3([
      line3[0],
      new THREE.Vector3(
        Number(inputRef5.current.value),
        line3[1].y,
        line3[1].z
      ),
    ]);
  };

  const handleInput6Change = () => {
    setLine3([
      line3[0],
      new THREE.Vector3(
        line3[1].x,
        Number(inputRef6.current.value),
        line3[1].z
      ),
    ]);
  };

  return (
    <>
      <div className="app">
        <div className="side">
          <div className="input-box">
            <div>x1</div>
            <input ref={inputRef1} onChange={handleInput1Change}></input>
          </div>
          <div className="input-box">
            <div>y1</div>
            <input ref={inputRef2} onChange={handleInput2Change}></input>
          </div>
          <div className="input-box">
            <div>x2</div>
            <input ref={inputRef3} onChange={handleInput3Change}></input>
          </div>
          <div className="input-box">
            <div>y2</div>
            <input ref={inputRef4} onChange={handleInput4Change}></input>
          </div>
          <div className="input-box">
            <div>x3</div>
            <input ref={inputRef5} onChange={handleInput5Change}></input>
          </div>
          <div className="input-box">
            <div>y3</div>
            <input ref={inputRef6} onChange={handleInput6Change}></input>
          </div>
        </div>
        <div className="test">
          <Canvas>
            <Text
              position={[0, 0, 0]} // Position in 3D space
              color="black" // Color of the text
            >
              Hello, React Three.js!
            </Text>
            <Line points={[origin, coordX]} color="black"></Line>
            <Line points={[origin, coordY]} color="black"></Line>
            <Line points={line1} color="blue" lineWidth={4} />
            <Line points={line2} color="red" lineWidth={4} />
            <Line points={line3} color="green" lineWidth={4} />
          </Canvas>
        </div>
      </div>
    </>
  );
}

export default App;
