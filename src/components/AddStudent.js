import React, { Component } from "react";
import { Button, Input } from "semantic-ui-react";

class AddStudent extends Component {
  constructor(props) {
    super(props);

    console.log(this.props);
  }

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
