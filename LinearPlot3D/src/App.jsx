import "./App.css";
import * as THREE from "three";
import MyCanvas from "./MyCanvas";
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { v4 as uuidv4 } from "uuid";
import { Github } from "lucide-react";

const origin = new THREE.Vector3(0, 0, 0);

function App() {
  const [animSpeed, setAnimSpeed] = useState(1.0);
  const [vectors, setVectors] = useState([]);
  const [matrix, setMatrix] = useState([1, 0, 0, 0, 1, 0, 0, 0, 1]);
  const [colors, setColors] = useState("purple");

  const [showAnimation, setShowAnimation] = useState(true);
  const [showVectorLabels, setShowVectorLabels] = useState(true);

  const updateAnimSpeed = (e) => {
    setAnimSpeed(e.target.value);
  };

  const handleAddVector = () => {
    setVectors([...vectors, { x: 0, y: 0, z: 0, id: uuidv4() }]);
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

  const handleMatrixa13Change = (e) => {
    setMatrix([
      ...matrix.slice(0, 2),
      Number(e.target.value),
      ...matrix.slice(3),
    ]);
  };

  const handleMatrixa21Change = (e) => {
    setMatrix([
      ...matrix.slice(0, 3),
      Number(e.target.value),
      ...matrix.slice(4),
    ]);
  };

  const handleMatrixa22Change = (e) => {
    setMatrix([
      ...matrix.slice(0, 4),
      Number(e.target.value),
      ...matrix.slice(5),
    ]);
  };

  const handleMatrixa23Change = (e) => {
    setMatrix([
      ...matrix.slice(0, 5),
      Number(e.target.value),
      ...matrix.slice(6),
    ]);
  };
  const handleMatrixa31Change = (e) => {
    setMatrix([
      ...matrix.slice(0, 6),
      Number(e.target.value),
      ...matrix.slice(7),
    ]);
  };

  const handleMatrixa32Change = (e) => {
    setMatrix([
      ...matrix.slice(0, 7),
      Number(e.target.value),
      ...matrix.slice(8),
    ]);
  };

  const handleMatrixa33Change = (e) => {
    setMatrix([
      ...matrix.slice(0, 9),
      Number(e.target.value),
      ...matrix.slice(9),
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
      {/* <nav className="navbar">LinearPlot3D</nav> */}
      <div className="app">
        <div className="side">
          <nav>
            <h1 className="app-name">LinearPlot3D</h1>
          </nav>
          <hr className="divider-h"></hr>
          <div className="animation-speed-input">
            <div className="anim-speed-title">
              Animation Speed
              <input placeholder="1.0" onChange={updateAnimSpeed}></input>
            </div>
          </div>
          <hr className="divider-h"></hr>
          <div className="matrix-input">
            <div className="matrix-title">Transformation Matrix</div>
            <div className="matrix-row">
              <input
                placeholder="1"
                onChange={handleMatrixa11Change}
                className="matrix-input-box"
              ></input>
              <input
                placeholder="0"
                onChange={handleMatrixa12Change}
                className="matrix-input-box"
              ></input>
              <input
                placeholder="0"
                onChange={handleMatrixa13Change}
                className="matrix-input-box"
              ></input>
            </div>
            <div className="matrix-row">
              <input
                placeholder="0"
                onChange={handleMatrixa21Change}
                className="matrix-input-box"
              ></input>
              <input
                placeholder="1"
                onChange={handleMatrixa22Change}
                className="matrix-input-box"
              ></input>
              <input
                placeholder="0"
                onChange={handleMatrixa23Change}
                className="matrix-input-box"
              ></input>
            </div>
            <div className="matrix-row">
              <input
                placeholder="0"
                onChange={handleMatrixa31Change}
                className="matrix-input-box"
              ></input>
              <input
                placeholder="0"
                onChange={handleMatrixa32Change}
                className="matrix-input-box"
              ></input>
              <input
                placeholder="1"
                onChange={handleMatrixa33Change}
                className="matrix-input-box"
              ></input>
            </div>
          </div>
          <hr className="divider-h"></hr>
          <div className="vector-input">
            {vectors.map((vector, index) => (
              <div key={vector.id} className="input-box">
                <input
                  placeholder="x-value"
                  onChange={(e) => {
                    let val = e.target.value;
                    if (isNaN(parseFloat(val))) {
                      val = 0;
                    }
                    let newVectors = [
                      ...vectors.slice(0, index),
                      {
                        x: val,
                        y: vectors[index].y,
                        z: vectors[index].z,
                        id: vectors[index].id,
                      },
                      ...vectors.slice(index + 1),
                    ];
                    setVectors(newVectors);
                  }}
                ></input>
                <input
                  placeholder="y-value"
                  onChange={(e) => {
                    let val = e.target.value;
                    if (isNaN(parseFloat(val))) {
                      val = 0;
                    }
                    let newVectors = [
                      ...vectors.slice(0, index),
                      {
                        x: vectors[index].x,
                        y: val,
                        z: vectors[index].z,
                        id: vectors[index].id,
                      },
                      ...vectors.slice(index + 1),
                    ];
                    setVectors(newVectors);
                  }}
                ></input>
                <input
                  placeholder="z-value"
                  onChange={(e) => {
                    let val = e.target.value;
                    if (isNaN(parseFloat(val))) {
                      val = 0;
                    }
                    let newVectors = [
                      ...vectors.slice(0, index),
                      {
                        x: vectors[index].x,
                        y: vectors[index].y,
                        z: val,
                        id: vectors[index].id,
                      },
                      ...vectors.slice(index + 1),
                    ];
                    setVectors(newVectors);
                  }}
                ></input>
                <button
                  className="delete-vector-button"
                  onClick={() => {
                    setVectors(vectors.filter((_, i) => i !== index));
                  }}
                >
                  delete
                </button>
                <div className="temp-fix"></div>
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
          <button
            className="vector-button"
            onClick={() => {
              setShowAnimation(!showAnimation);
            }}
          >
            {showAnimation ? "Stop Animation" : "Start Animation"}
          </button>
          <button
            className="vector-button"
            onClick={() => {
              setShowVectorLabels(!showVectorLabels);
            }}
          >
            {showVectorLabels ? "Hide Vector Labels" : "Show Vector Labels"}
          </button>
          <hr className="divider-h"></hr>
          <label className="color-label">Color</label>
          <select
            className="color-select"
            onChange={handleColorChange}
            defaultValue="purple"
          >
            <option value="purple">Purple</option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="yellow">Yellow</option>
          </select>
        </div>
        <div className="canvas-bound">
          <img
            src="/gh.png"
            alt="github"
            className="github"
            onClick={() => {
              window.open("https://github.com/Project-Code-UVA/LinearPlot3D");
            }}
          ></img>
          <Canvas>
            <OrbitControls
              enableZoom={true}
              enablePan={true}
              enableRotate={true}
            />
            <PerspectiveCamera
              makeDefault
              position={[10, 10, 10]}
              fov={60}
              zoom={1.3}
            />
            <MyCanvas
              origin={origin}
              coords={[coordX, coordY, coordZ, coordXRev, coordYRev, coordZRev]}
              inputVectors={vectors}
              colors={colors}
              animSpeed={animSpeed}
              matrix={matrix}
              showAnimation={showAnimation}
              showVectorLabels={showVectorLabels}
            ></MyCanvas>
          </Canvas>
        </div>
      </div>
    </>
  );
}

export default App;
