import "./App.css";
import * as THREE from "three";
import MyCanvas from "./MyCanvas";
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { TrackballControls, Text } from '@react-three/drei'
import ThreeDTextScene from "./playground";


const origin = new THREE.Vector3(0, 0, 0);

function App() {
  const [animSpeed, setAnimSpeed] = useState(1.0);
  const [vectors, setVectors] = useState([]);
  const [matrix, setMatrix] = useState([1, 0, 0, 1]);
  const [colors, setColors] = useState("purple");

  const updateAnimSpeed = (e) => {
    setAnimSpeed(e.target.value);
  };

  const handleAddVector = () => {
    setVectors([...vectors, { x: 0, y: 0, z: 0 }]);
  };

  const handleDeleteVector = () => {
    setVectors(vectors.slice(0, vectors.length - 1));
  };

  const handleDeleteAllVectors = () => {
    setVectors([]);
  };

  const handleColorChange = (e) => {
    setColors(e.target.value);
  };

  const handleMatrixa11Change = (e) => {
    setMatrix([
      ...matrix.slice(0, 0),
      Number(e.target.value),
      ...matrix.slice(1),
    ]);
  };

  const handleMatrixa12Change = (e) => {
    setMatrix([
      ...matrix.slice(0, 1),
      Number(e.target.value),
      ...matrix.slice(2),
    ]);
  };

  const handleMatrixa21Change = (e) => {
    setMatrix([
      ...matrix.slice(0, 2),
      Number(e.target.value),
      ...matrix.slice(3),
    ]);
  };

  const handleMatrixa22Change = (e) => {
    setMatrix([
      ...matrix.slice(0, 3),
      Number(e.target.value),
      ...matrix.slice(4),
    ]);
  };

  const coordX = new THREE.Vector3(5, 0, 0);
  const coordY = new THREE.Vector3(0, 5, 0);
  const coordZ = new THREE.Vector3(0, 0, 5);
  const coordXRev = new THREE.Vector3(-5, 0, 0);
  const coordYRev = new THREE.Vector3(0, -5, 0);
  const coordZRev = new THREE.Vector3(0, 0, -5);

  return (
    <>
      <div className="app">
        <div className="side">
          <div className="animation-speed-input">
            <div className="anim-speed-title">
              Animation Speed
              <input placeholder="1.0" onChange={updateAnimSpeed}></input>
            </div>
          </div>
          <div className="matrix-input">
            <div className="matrix-title">Matrix</div>
            <div className="matrix-row">
              <input placeholder="1" onChange={handleMatrixa11Change}></input>
              <input placeholder="0" onChange={handleMatrixa12Change}></input>
            </div>
            <div className="matrix-row">
              <input placeholder="0" onChange={handleMatrixa21Change}></input>
              <input placeholder="1" onChange={handleMatrixa22Change}></input>
            </div>
          </div>
          <div className="vector-input">
            {vectors.map((vector, index) => (
              <div key={index} className="input-box">
                <div>x</div>
                <input
                  placeholder="x-value"
                  onChange={(e) => {
                    let newVectors = [
                      ...vectors.slice(0, index),
                      {
                        x: e.target.value,
                        y: vectors[index].y,
                        z: vectors[index].z,
                      },
                      ...vectors.slice(index + 1),
                    ];
                    setVectors(newVectors);
                  }}
                ></input>
                <div>y</div>
                <input
                  placeholder="y-value"
                  onChange={(e) => {
                    let newVectors = [
                      ...vectors.slice(0, index),
                      {
                        x: vectors[index].x,
                        y: e.target.value,
                        z: vectors[index].z,
                      },
                      ...vectors.slice(index + 1),
                    ];
                    setVectors(newVectors);
                  }}
                ></input>
                <div>color</div>
              </div>
            ))}
          </div>
          <button className="vector-button" onClick={handleAddVector}>
            Add a vector
          </button>
          <button className="vector-button" onClick={handleDeleteVector}>
            Delete a vector
          </button>
          <button className="vector-button" onClick={handleDeleteAllVectors}>
            Delete all vectors
          </button>
          <input placeholder="color" onChange={handleColorChange}></input>
          <button
            onClick={() => {
              console.log(vectors);
              console.log(matrix);
            }}
          >
            Debug Button
          </button>
        </div>
        <div className="canvas-bound">
          <Canvas>
            <Text position={[0, 0, 0]} fontSize={1} color="black" anchorX="center" anchorY="middle">
              111
            </Text>
            <TrackballControls />
            <MyCanvas
              origin={origin}
              coords={[coordX, coordY, coordZ, coordXRev, coordYRev, coordZRev]}
              inputVectors={vectors}
              colors={colors}
              animSpeed={animSpeed}
              matrix={matrix}
            ></MyCanvas>
          </Canvas>
        </div>
      </div>
    </>
  );
}

export default App;
