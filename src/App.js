import "./App.css";
import ChatComponent from "./ChatComponent";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  return (
    <div className="App">
      <div>
        test
        <ChatComponent />
      </div>
    </div>
  );
}

export default App;
