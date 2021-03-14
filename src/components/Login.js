import React from "react";
import { connect, useSelector } from "react-redux";
import { login } from "./store";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#B8C1EC",
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#B8C1EC",
  },
}));

const Login = (props) => {
  const { handleSubmit } = props;

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <HomeIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Welcome back!
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Log In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => {
  // Hey, check it out! Because we pass the connected Login to a Route
  // (we do this in client/index.js), it receives the "route props"
  // (match, location, and history) as its "own props".

  return {
    async handleSubmit(evt) {
      try {
        evt.preventDefault();
        const email = evt.target.email.value;
        const password = evt.target.password.value;
        console.log("in login.js", email, password);
        const dispatchData = await dispatch(login({ email, password }));
        //if check if user is an admin/teacher?, if not, push to their student id
        
        ownProps.history.push("/rewards");
      } catch (error) {
        console.error(error);
      }
    },
  };
};

export default connect(null, mapDispatchToProps)(Login);
