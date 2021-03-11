import React, { useState } from "react";
import {useDispatch} from "react-redux"
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {signUp} from './store'
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const dispatch = useDispatch();
  const classes = useStyles();
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('signed up', email, password, firstName, lastName);
    const newUser = {email:email, password:password, firstName:firstName, lastName:lastName, isAdmin:true}
    console.log(newUser)
    dispatch(signUp(newUser))
  };
  return (
    <div>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          required
          id="standard-required"
          label="Email"
          value={email}
          onInput={(e) => setEmail(e.target.value)}
          />
        <TextField
          required
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          onInput={(e) => setPassword(e.target.value)}
          />
        <TextField id="standard-first-name" label="First Name" 
          value={firstName}
          onInput={(e) => setFirstName(e.target.value)}
          />
        <TextField id="standard-last-name" label="Last Name" 
          value={lastName}
          onInput={(e) => setLastName(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default Signup;
