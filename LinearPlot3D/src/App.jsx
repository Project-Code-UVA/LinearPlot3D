import { useState } from "react";
import "./App.css";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import MyCanvas from "./MyCanvas";

const origin = new THREE.Vector3(0, 0, 0);

class Vec {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

function applyMatrix(vector, matrix) {
  let transX = vector.x * matrix[0] + vector.y * matrix[1];
  let transY = vector.x * matrix[2] + vector.y * matrix[3];
  return new Vec(transX, transY, vector.z);
}

function App() {
  const [vectors, setVectors] = useState([]);
  const [transVectors, setTransVectors] = useState([]);
  const [matrix, setMatrix] = useState([0, 0, 0, 0]);

  const handleAddVector = () => {
    setVectors([...vectors, new Vec(0, 0, 0)]);
    updateTransVectors([...vectors, new Vec(0, 0, 0)]);
  };

  const handleDeleteVector = () => {
    setVectors(vectors.slice(0, vectors.length - 1));
    updateTransVectors(vectors.slice(0, vectors.length - 1));
  };

  const handleDeleteAllVectors = () => {
    setVectors([]);
    updateTransVectors([]);
  };

  const [colors, setColors] = useState("purple");
  const handleColorChange = (e) => {
    setColors(e.target.value);
  };

  const updateTransVectors = (varray) => {
    // setTransVectors([]);
    // for (let i = 0; i < vectors.length; i++) {
    //   setTransVectors([...transVectors, applyMatrix(vectors[i], matrix)]);
    // }
    setTransVectors(varray.map((v) => applyMatrix(v, matrix)));
  };

  const handleMatrixa11Change = (e) => {
    setMatrix([
      ...matrix.slice(0, 0),
      Number(e.target.value),
      ...matrix.slice(1),
    ]);
    updateTransVectors(vectors);
  };

  const handleMatrixa12Change = (e) => {
    setMatrix([
      ...matrix.slice(0, 1),
      Number(e.target.value),
      ...matrix.slice(2),
    ]);
    updateTransVectors(vectors);
  };

  const handleMatrixa21Change = (e) => {
    setMatrix([
      ...matrix.slice(0, 2),
      Number(e.target.value),
      ...matrix.slice(3),
    ]);
    updateTransVectors(vectors);
  };

  const handleMatrixa22Change = (e) => {
    setMatrix([
      ...matrix.slice(0, 3),
      Number(e.target.value),
      ...matrix.slice(4),
    ]);
    updateTransVectors(vectors);
  };

  const coordX = new THREE.Vector3(5, 0, 0);
  const coordY = new THREE.Vector3(0, 5, 0);

  return (
    <>
      <div className="app">
        <div className="side">
          <div className="matrix-input">
            <div className="matrix-title">Matrix</div>
            <div className="matrix-row">
              <input placeholder="a11" onChange={handleMatrixa11Change}></input>
              <input placeholder="a12" onChange={handleMatrixa12Change}></input>
            </div>
            <div className="matrix-row">
              <input placeholder="a21" onChange={handleMatrixa21Change}></input>
              <input placeholder="a22" onChange={handleMatrixa22Change}></input>
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
                      new Vec(
                        Number(e.target.value),
                        vectors[index].y,
                        vectors[index].z
                      ),
                      ...vectors.slice(index + 1),
                    ];
                    setVectors(newVectors);
                    updateTransVectors(newVectors);
                  }}
                ></input>
                <div>y</div>
                <input
                  placeholder="y-value"
                  onChange={(e) => {
                    let newVectors = [
                      ...vectors.slice(0, index),
                      new Vec(
                        vectors[index].x,
                        Number(e.target.value),
                        vectors[index].z
                      ),
                      ...vectors.slice(index + 1),
                    ];
                    setVectors(newVectors);
                    setTransVectors(newVectors)
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
              vectors={vectors}
              colors={colors}
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
