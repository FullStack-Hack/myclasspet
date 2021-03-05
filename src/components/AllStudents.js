import React, { Component } from "react";
import axios from "axios";

class AllStudents extends Component {
  constructor() {
    super();
    this.state = {
      students: [],
    };
  }

  async componentDidMount() {
    try {
      let response = await axios.get("/api/students");
      this.setState({ students: response.data });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    let { students } = this.state;
    return students.length
      ? students.map((student, idx) => {
          return <li key={idx}>{student.firstName}</li>;
        })
      : "hello world";
  }
}

export default AllStudents;
