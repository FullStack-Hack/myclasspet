import "./App.css";
import ChatComponent from "./ChatComponent";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [activities, setActivities] = useState([]);

  //GET activities from selected student
  //presumably we would pass the studentId down from the 'AllStudents' view
  useEffect(() => {
    //need another function for async/await within useEffect
    //can just call the function when using Redux
    const getActivities = async () => {
      //make sure server port and front end port are the same?
      const { data } = await axios.get(`/api/students/1/activities`);
      setActivities(data);
    };
    getActivities();
  }, []);
  console.log(activities);

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
