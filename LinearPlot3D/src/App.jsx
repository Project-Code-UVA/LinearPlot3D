import { useEffect, useRef, useState } from "react";
// import { createRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  // whenever setCount is called with a new value, the component will re-render
  const [count, setCount] = useState([]);

  useEffect(() => {
    console.log("count is", count);
  });

  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);

  const [input1, setInput1] = useState(0);
  const [input2, setInput2] = useState(0);

  const handleInput1Change = () => {
    setInput1(Number(inputRef1.current.value));
  };

  const handleInput2Change = () => {
    setInput2(Number(inputRef2.current.value));
  };
  
  // div tag is normally building blocks that doesn't display anything by itself
  // but it can be styled with css

  // a tag is a hyperlink that can be styled with css
  // href is the hyperlink reference

  // h1 tag is a header tag (title) that can be styled with css

  // .{className} styles tags with the class name
  // #{idName} styles tags with the id name

  // see if you can create two inputs and get the sum of the two inputs to display

  // to display it, run "npm run dev" in the terminal
  // and go to http://localhost:5173/

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <input ref={inputRef1} onChange={handleInput1Change} />
      <input ref={inputRef2} onChange={handleInput2Change} />
      <p>Sum is {input1 + input2}</p>
      <h1 id="hello">Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => [...count, 1])}>
          count is {count}
        </button>
        <p>Edit src/App.jsx and save to test HMR</p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
