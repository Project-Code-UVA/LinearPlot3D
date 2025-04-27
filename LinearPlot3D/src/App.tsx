import "./App.css";
import * as THREE from "three";
import MyCanvas from "./MyCanvas";
import { useState, ChangeEvent } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { v4 as uuidv4 } from "uuid";
import WrappedDivider from "./components/wrappedDivider";

const origin = new THREE.Vector3(0, 0, 0);

type Vector3WithId = THREE.Vector3 & { id: string };

function App() {
  const [animSpeed, setAnimSpeed] = useState<number>(1.0);
  const [vectors, setVectors] = useState<Vector3WithId[]>([]);
  const [matrix, setMatrix] = useState<number[]>([1, 0, 0, 0, 1, 0, 0, 0, 1]);
  const [colors, setColors] = useState<string>("blue");

  const [showAnimation, setShowAnimation] = useState<boolean>(true);
  const [showVectorLabels, setShowVectorLabels] = useState<boolean>(true);

  const numOfRow = 3;
  const numOfCol = 3;

  const updateAnimSpeed = (e: ChangeEvent<HTMLInputElement>) => {
    setAnimSpeed(parseFloat(e.target.value) || 0);
  };

  const handleAddVector = () => {
    const v: Vector3WithId = Object.assign(new THREE.Vector3(0, 0, 0), {
      id: uuidv4(),
    });
    setVectors([...vectors, v]);
  };

  const handleDeleteVector = () => {
    setVectors(vectors.slice(0, -1));
  };

  const handleDeleteAllVectors = () => {
    setVectors([]);
  };

  const handleColorChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setColors(e.target.value);
  };

  const coordX = new THREE.Vector3(5, 0, 0);
  const coordY = new THREE.Vector3(0, 5, 0);
  const coordZ = new THREE.Vector3(0, 0, 5);
  const coordXRev = new THREE.Vector3(-5, 0, 0);
  const coordYRev = new THREE.Vector3(0, -5, 0);
  const coordZRev = new THREE.Vector3(0, 0, -5);

  return (
    <>
      <div className="flex w-screen h-screen bg-bg-500 overflow-x-hidden">
        <div className="flex flex-col justify-start items-center w-[600px] overflow-x-hidden h-[calc(100vh-100px)] bg-bg-600 p-2 shadow-2xl m-[50px] drop-shadow-2xl">
          <nav className="flex justify-center items-center text-4xl font-bold p-3">
            <h1>LinearPlot3D</h1>
          </nav>
          <WrappedDivider title="Animation Speed" />
          <div className="w-full px-1">
            <input
              className="w-full px-4 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="1.0"
              onChange={updateAnimSpeed}
            />
          </div>
          <WrappedDivider title="Transformation Matrix" />
          <div className="flex flex-col items-center justify-center">
            {Array.from({ length: numOfRow }).map((_, rowIndex) => (
              <div key={rowIndex} className="flex flex-row">
                {Array.from({ length: numOfCol }).map((_, colIndex) => {
                  return (
                    <input
                      key={colIndex}
                      placeholder={rowIndex === colIndex ? "1" : "0"}
                      onChange={(e) => {
                        let val = parseFloat(e.target.value);
                        if (isNaN(val)) val = 0;
                        const index = rowIndex * numOfRow + colIndex;
                        const newMatrix = [...matrix];
                        newMatrix[index] = val;
                        setMatrix(newMatrix);
                      }}
                      className="m-1 w-full px-4 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  );
                })}
              </div>
            ))}
          </div>
          <WrappedDivider title="Vector Operations" />
          <div className="h-2"></div>
          <div className="flex flex-col items-center justify-center overflow-x-hidden overflow-y-scroll w-full">
            {vectors.length !== 0 && (
              <div className="flex flex-row items-center w-full justify-between">
                <div className="m-1 w-full px-4 flex flex-row items-start">
                  <span className="font-semibold">x</span>
                </div>
                <div className="m-1 w-full px-4 flex flex-row items-start">
                  <span className="font-semibold">y</span>
                </div>
                <div className="m-1 w-full px-4 flex flex-row items-start">
                  <span className="font-semibold">z</span>
                </div>
                <div className="m-1 w-full px-4 flex flex-row items-start">
                  <span className="font-semibold"></span>
                </div>
              </div>
            )}
            {vectors.map((vector, index) => (
              <div
                key={vector.id}
                className="flex flex-row items-center w-full"
              >
                <input
                  className="m-1 w-full px-4 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="x-value"
                  value={vector.x}
                  onChange={(e) => {
                    let val = parseFloat(e.target.value);
                    if (isNaN(val)) val = 0;
                    const updatedVector = vector
                      .clone()
                      .set(val, vector.y, vector.z);
                    updatedVector.id = vector.id;
                    const newVectors = [...vectors];
                    newVectors[index] = updatedVector;
                    setVectors(newVectors);
                  }}
                />
                <input
                  className="m-1 w-full px-4 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="y-value"
                  value={vector.y}
                  onChange={(e) => {
                    let val = parseFloat(e.target.value);
                    if (isNaN(val)) val = 0;
                    const updatedVector = vector
                      .clone()
                      .set(vector.x, val, vector.z);
                    updatedVector.id = vector.id;
                    const newVectors = [...vectors];
                    newVectors[index] = updatedVector;
                    setVectors(newVectors);
                  }}
                />
                <input
                  className="m-1 w-full px-4 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="z-value"
                  value={vector.z}
                  onChange={(e) => {
                    let val = parseFloat(e.target.value);
                    if (isNaN(val)) val = 0;
                    const updatedVector = vector
                      .clone()
                      .set(vector.x, vector.y, val);
                    updatedVector.id = vector.id;
                    const newVectors = [...vectors];
                    newVectors[index] = updatedVector;
                    setVectors(newVectors);
                  }}
                />
                <button
                  className="ml-1 w-full px-4 py-2 bg-red-600 text-white font-semibold shadow-md hover:bg-red-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
                  onClick={() => {
                    setVectors(vectors.filter((_, i) => i !== index));
                  }}
                >
                  delete
                </button>
              </div>
            ))}
          </div>
          <div className="h-2"></div>
          <div className="flex flex-col gap-2 items-center justify-center p-1 w-full">
            <button
              className="w-full px-4 py-2 bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
              onClick={handleAddVector}
            >
              Add a vector
            </button>
            <button
              className="w-full px-4 py-2 bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
              onClick={handleDeleteVector}
            >
              Delete a vector
            </button>
            <button
              className="w-full px-4 py-2 bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
              onClick={handleDeleteAllVectors}
            >
              Delete all vectors
            </button>
            <button
              className="w-full px-4 py-2 bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
              onClick={() => setShowAnimation(!showAnimation)}
            >
              {showAnimation ? "Stop Animation" : "Start Animation"}
            </button>
            <button
              className="w-full px-4 py-2 bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
              onClick={() => setShowVectorLabels(!showVectorLabels)}
            >
              {showVectorLabels ? "Hide Vector Labels" : "Show Vector Labels"}
            </button>
            {/* <select
              className="w-full pl-4 pr-8 py-2 bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
              onChange={handleColorChange}
              defaultValue="blue"
            >
              <option value="blue">Blue</option>
              <option value="red">Red</option>
              <option value="green">Green</option>
              <option value="yellow">Yellow</option>
              <option value="purple">Purple</option>
            </select> */}
          </div>
        </div>
        <div className="w-full h-screen flex justify-center items-center">
          {/* <img
            src="/gh.png"
            alt="github"
            className="absolute top-0 right-0 m-4 rounded-full cursor-pointer w-[30px] h-[30px] z-10"
            onClick={() => {
              window.open("github link");
            }}
          /> */}
          <Canvas>
            <OrbitControls enableZoom enablePan enableRotate />
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
              matrix={new THREE.Matrix3().fromArray(matrix).transpose()}
              showAnimation={showAnimation}
              showVectorLabels={showVectorLabels}
            />
          </Canvas>
          <div className="absolute bottom-0 right-0 m-4 rounded-full cursor-pointer z-10 flex flex-col items-start justify-start">
            <div className="flex flex-row items-center justify-center">
              <div className="w-[20px] h-[20px] bg-blue-500 mr-2"> </div>
              <span>Animation Vector</span>
            </div>
            <div className="flex flex-row items-center justify-center">
              <div className="w-[20px] h-[20px] bg-red-500 mr-2"> </div>
              <span>Original Vector</span>
            </div>
            <div className="flex flex-row items-center justify-center">
              <div className="w-[20px] h-[20px] bg-black mr-2"> </div>
              <span>Final Vector</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
