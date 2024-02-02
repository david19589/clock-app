import "./App.css";
import Header from "./Components/Header";
import Time from "./Components/Time";
import NewWindow from "./Components/NewWindow";
import { useState } from "react";

function App() {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <div className="container">
      <Header isClicked={isClicked} setIsClicked={setIsClicked} />
      <Time isClicked={isClicked} setIsClicked={setIsClicked} />
      <NewWindow isClicked={isClicked} setIsClicked={setIsClicked} />
    </div>
  );
}

export default App;
