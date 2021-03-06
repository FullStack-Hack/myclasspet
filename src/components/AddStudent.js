import React, { Component } from "react";
import { Button, Input } from "semantic-ui-react";
import axios from "axios";

const defaultState = {
  firstName: "",
  lastName: "",
  email: "",
};
class AddStudent extends Component {
  constructor(props) {
    super(props);
    // this.state = defaultState;
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    console.log(this.props);
  }
  // handleChange(event) {
  //   this.setState({ [event.target.name]: event.target.value });
  // }

  // async handleSubmit(event) {
  //   event.preventDefault();
  //   try {
  //     const { data } = await axios.post("/api/students/add", {
  //       firstName: this.state.firstName,
  //       lastName: this.state.lastName,
  //       email: this.state.email,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   this.setState(defaultState);
  //   //need to lift state up to trigger re-render of all students
  // }

  render() {
    return (
      <div className="add-student">
        <form className="add-student-form">
          <Input
            onChange={this.props.handleChange}
            name="firstName"
            placeholder="First Name"
            value={this.props.firstName}
          />
          <Input
            onChange={this.props.handleChange}
            name="lastName"
            placeholder="Last Name"
            value={this.props.lastName}
          />
          <Input
            onChange={this.props.handleChange}
            name="email"
            placeholder="email"
            value={this.props.email}
          />
          <br />
          <Button type="submit" onClick={this.props.handleSubmit}>
            Save
          </Button>
        </form>
      </div>
    );
  }
}

export default AddStudent;
