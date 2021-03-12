import React, { Component } from "react";
import axios from "axios";
import { Table, Button } from "semantic-ui-react";
import AddStudent from "./AddStudent";
import { Link } from "react-router-dom";

class AllStudents extends Component {
  constructor() {
    super();
    this.state = {
      students: [],
      addStudentForm: false,
      firstName: "",
      lastName: "",
      email: "",
      rewards: [],
    };
    this.toggleAddStudent = this.toggleAddStudent.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getStudents = this.getStudents.bind(this);
    this.deleteStudent = this.deleteStudent.bind(this);
    this.redeemReward = this.redeemReward.bind(this);
  }
  toggleAddStudent() {
    this.setState({ addStudentForm: !this.state.addStudentForm });
  }
  async componentDidMount() {
    this.getStudents();
  }
  async getStudents() {
    try {
      let response = await axios.get("/api/students");
      this.setState({ students: response.data });
    } catch (error) {
      console.log(error);
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      await axios.post("/api/students/", {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
      });
      this.getStudents();
    } catch (error) {
      console.log(error);
    }
  }
  async redeemReward(event) {
    event.preventDefault();
    let payload = {
      studentId: event.target.attributes.studentid.value,
      rewardId: event.target.attributes.rewardid.value,
    };
    try {
      await axios.put("api/students/reward", payload);
    } catch (error) {
      console.log(error);
    }
    this.getStudents();
  }
  async deleteStudent(event) {
    try {
      await axios.delete(`api/students/${event.target.id}`);
      this.getStudents();
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
          {this.state.addStudentForm && (
            <AddStudent
              props={this.state}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
            />
          )}
        </div>
        <Table celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>First Name</Table.HeaderCell>
              <Table.HeaderCell>Last Name</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>
                Rewards Available <br />
                (click to redeem)
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {students.map((student, idx) => {
              let { rewards } = student;
              return (
                <Table.Row key={idx}>
                  <Table.Cell>{student.id}</Table.Cell>

                  <Table.Cell>
                    <Link to={`/students/${student.id}/activities`}>
                      {student.firstName}
                    </Link>
                  </Table.Cell>

                  <Table.Cell>{student.lastName}</Table.Cell>
                  <Table.Cell>{student.email}</Table.Cell>
                  <Table.Cell>
                    {rewards.map((reward, idx) => {
                      return (
                        <Button
                          key={idx}
                          studentid={student.id}
                          rewardid={reward.id}
                          onClick={this.redeemReward}
                        >
                          {reward.name}
                        </Button>
                      );
                    }) || ""}
                  </Table.Cell>

                  <Table.Cell>
                    <Button onClick={this.deleteStudent} id={student.id}>
                      X
                    </Button>
                  </Table.Cell>
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
