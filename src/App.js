import "./App.css";
import ChatComponent from "./ChatComponent";
import React from "react";
import { Navbar } from "./components";
import Routes from "./routes";
import { BrowserRouter } from "react-router-dom";
// import AllStudents from "./components/AllStudents";

function App() {
  return (
    <div className="App">
      <div>
        <BrowserRouter>
          <Navbar />
          <Routes />
          <ChatComponent />
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
