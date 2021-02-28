import "./App.css";

function App() {
  return (
    <div className="App">
      <div>
        test
        <iframe
          title="bot"
          src={`https://webchat.botframework.com/embed/myclasspet1?s=${process.env.REACT_APP_YOUR_SECRET_HERE}`}
          style={{ minWidth: "400px", width: "100%", minHeight: "500px" }}
        ></iframe>
      </div>
    </div>
  );
}

export default App;
