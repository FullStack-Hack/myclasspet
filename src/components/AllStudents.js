import React, { Component } from "react";
import axios from "axios";
import { Table, Button } from "semantic-ui-react";
import AddStudent from "./AddStudent";

class AllStudents extends Component {
  constructor() {
    super();
    this.state = {
      students: [],
      addStudentForm: false,
    };
    this.toggleAddStudent = this.toggleAddStudent.bind(this);
  }
  toggleAddStudent() {
    this.setState({ addStudentForm: !this.state.addStudentForm });
  }
  async componentDidMount() {
    try {
      let response = await axios.get("/api/students");
      console.log(response.data);
      this.setState({ students: response.data });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    let { students } = this.state;
    return (
      <div>
        <div className="add-student-container">
          <Button className="icon-btn" onClick={this.toggleAddStudent}>
            {this.state.addStudentForm ? "Close Form" : "Add Student"}
          </Button>
          <br />
          {this.state.addStudentForm && <AddStudent />}
        </div>
        <Table celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>First Name</Table.HeaderCell>
              <Table.HeaderCell>Last Name</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {students.map((student, idx) => {
              return (
                <Table.Row key={idx}>
                  <Table.Cell>{student.id}</Table.Cell>
                  <Table.Cell>{student.firstName}</Table.Cell>
                  <Table.Cell>{student.lastName}</Table.Cell>
                  <Table.Cell>{student.email}</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default AllStudents;
