import { useState } from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";

const origin = new THREE.Vector3(0, 0, 0);

class Vec {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

function App() {
  const [vectors, setVectors] = useState([]);
  const handleAddVector = () => {
    setVectors([...vectors, new Vec(0, 0, 0)]);
  };

  const handleDeleteVector = () => {
    setVectors(vectors.slice(0, vectors.length - 1));
  };

  const handleDeleteAllVectors = () => {
    setVectors([])
  };

  const [colors, setColors] = useState("purple");
  const handleColorChange = (e) => {
    setColors(e.target.value)
  };

  const coordX = new THREE.Vector3(5, 0, 0);
  const coordY = new THREE.Vector3(0, 5, 0);

  return (
    <>
      <div className="app">
        <div className="side">
          <div className="scroll-div">
            {vectors.map((vector, index) => (
              <div key={index} className="input-box">
                <div>x</div>
                <input
                  placeholder="x-value"
                  onChange={(e) => {
                    setVectors([

                      ...vectors.slice(0, index),
                      new Vec(
                        Number(e.target.value),
                        vectors[index].y,
                        vectors[index].z
                      ),
                      ...vectors.slice(index + 1),
                    ]);
                  }}
                ></input>
                <div>y</div>
                <input
                  placeholder="y-value"
                  onChange={(e) => {
                    setVectors([

                      ...vectors.slice(0, index),
                      new Vec(
                        vectors[index].x,
                        Number(e.target.value),
                        vectors[index].z
                      ),
                      ...vectors.slice(index + 1),
                    ]);
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
          <button className="vector-button" onClick={(handleDeleteAllVectors)}>
            Delete all vectors
          </button>
          <input
            placeholder="color"
            onChange={handleColorChange}
          ></input>
        </div>

        <div className="canvas-bound">

          <Canvas>
            <Line points={[origin, coordX]} color="black"></Line>
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
          </Canvas>
        </div>
      </div>
    </>
  );
}

export default App;
