import "./App.css";
import {temp} from "./secrets";

// const myurl = temp;
function App() {
  console.log(process.env);
  return (
    <div className="App">
      <div>
        test
        <iframe
          title="bot"
          src={`https://webchat.botframework.com/embed/myclasspet1?s=${temp}`}
          style={{ minWidth: "400px", width: "100%", minHeight: "500px" }}
        ></iframe>
      </div>
    </div>
  );
}

export default App;
