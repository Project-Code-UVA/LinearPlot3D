import { useState } from "react";
import "./App.css";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import MyCanvas from "./MyCanvas";

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
    setVectors([...vectors, {x : 0, y : 0, z :0}]);
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
                      { x : e.target.value,
                        y : vectors[index].y,
                        z : vectors[index].z
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
                      { x : vectors[index].x,
                        y : e.target.value,
                        z : vectors[index].z
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
        </div>
        <button
          onClick={() => {
            console.log(matrix);
          }}
        >
          Click Me
        </button>
        <div className="canvas-bound">
          <Canvas>
            <MyCanvas
              origin={origin}
              coordX={coordX}
              coordY={coordY}
              coordZ={coordZ}
              inputVectors={vectors}
              colors={colors}
              animSpeed={animSpeed}
              matrix={matrix}
            ></MyCanvas>
            {/* <Line points={[origin, coordX]} color="black"></Line>
            <Line points={[origin, coordY]} color="black"></Line>
            {vectors.map((vector, index) => (
              <Line
                key={index}
                points={[
                  origin,
                  new THREE.Vector3(vector.x, vector.y, vector.z),
                ]}
                color={colors}
                lineWidth={4}
              />
            ))}
            {transVectors.map((vector, index) => (
              <Line
                key={index}
                points={[
                  origin,
                  new THREE.Vector3(vector.x, vector.y, vector.z),
                ]}
                color={colors}
                lineWidth={4}
              />
            ))} */}
          </Canvas>
        </div>
      </div>
    </>
  );
}

export default App;
