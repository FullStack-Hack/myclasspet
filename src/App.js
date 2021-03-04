import "./App.css";
import ChatComponent from "./ChatComponent";
import React from "react";
import { Navbar } from "./components";
import Routes from "./routes";

function App() {
  return (
    <div className="App">
      <div>
        <Navbar />
        <ChatComponent />
        <Routes />
      </div>
    </div>
  );
}

export default App;
