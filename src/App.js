import "./App.css";
import ChatComponent from "./ChatComponent";
import React from "react";
import { Navbar } from "./components";
import Routes from "./routes";
import { BrowserRouter } from "react-router-dom";
import { useSelector } from "react-redux";
// import AllStudents from "./components/AllStudents";

function App() {

  const {user} = useSelector((state) => state)

  return (
    <div className="App">
      <div>
        <BrowserRouter>
          <Navbar />
          <Routes />
          {user.id && (
            <ChatComponent />
          )}
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
