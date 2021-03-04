import React, { Component } from "react";

import axios from "axios";

class AllStudents extends Component {
  async componentDidMount() {
    try {
      let { data } = await axios.get("/api/students");
      this.setState({ students: data });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    let { students } = this.state || [];
    return this.state
      ? students.map((student, idx) => {
          return <li key={idx}>{student.firstName}</li>;
        })
      : "hello world";
  }
}

export default AllStudents;
