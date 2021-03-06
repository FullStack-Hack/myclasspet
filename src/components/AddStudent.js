import React, { Component } from "react";
import { Button, Input } from "semantic-ui-react";
import axios from "axios";

const defaultState = {
  firstName: "",
  lastName: "",
  email: "",
};
class AddStudent extends Component {
  constructor() {
    super();
    this.state = defaultState;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleAddStudent = this.toggleAddStudent.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    //post to DB here??
    try {
      const { data } = await axios.post("/api/students/add", {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
      });
    } catch (error) {
      console.log(error);
    }
    this.setState(defaultState);
  }

  toggleAddStudent() {
    this.setState({
      addStudentForm: !this.state.addStudentForm,
    });
  }
  render() {
    return (
      <div className="add-student">
        <form className="add-student-form">
          <Input
            onChange={this.handleChange}
            name="firstName"
            placeholder="First Name"
            value={this.state.firstName}
          />
          <Input
            onChange={this.handleChange}
            name="lastName"
            placeholder="Last Name"
            value={this.state.lastName}
          />
          <Input
            onChange={this.handleChange}
            name="email"
            placeholder="email"
            value={this.state.email}
          />
          <br />
          <Button type="submit" onClick={this.handleSubmit}>
            Save
          </Button>
        </form>
      </div>
    );
  }
}

export default AddStudent;
