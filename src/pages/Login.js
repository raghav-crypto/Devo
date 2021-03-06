import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { CircularProgress, Grid } from "@material-ui/core";
import { loginTheme } from "./theme";
import PropTypes from "prop-types";

//Redux
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";
import { useEffect } from "react";
function Login({ history, loginUser, UI: { loading, errors } }) {
  const [formData, setFormData] = useState({
    email: null,
    password: null,
  });
  const [loginError, setLoginError] = useState({});
  const { email, password } = formData;
  useEffect(() => {
    let mounted = true;
    if (errors && mounted && !loading) {
      setLoginError(errors);
    }
    return () => (mounted = false);
  }, [errors, loading]);
  const useStyles = makeStyles(loginTheme);
  const classes = useStyles();
  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    loginUser(userData, history);
  };
  const onChange = (type, e) => {
    switch (type) {
      case "email":
        setFormData({ ...formData, email: e.target.value });
        break;
      case "password":
        setFormData({ ...formData, password: e.target.value });
        break;
      default:
        break;
    }
  };
  return (
    <main className={classes.main}>
      <CssBaseline></CssBaseline>
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h5">
          Login !
        </Typography>
        <form className={classes.form} onSubmit={(e) => onSubmit(e)}>
          <FormControl required fullWidth margin="normal">
            <InputLabel htmlFor="login-email-input">Enter Email</InputLabel>
            <Input
              label="Enter your email"
              autoComplete="email"
              autoFocus
              id="login-email-input"
              onChange={(e) => onChange("email", e)}
            ></Input>
          </FormControl>
          <FormControl required fullWidth margin="normal">
            <InputLabel htmlFor="login-password-input">
              Enter password
            </InputLabel>
            <Input
              label="Enter password."
              type="password"
              id="login-password-input"
              onChange={(e) => onChange("password", e)}
            ></Input>
          </FormControl>
          <Button
            fullWidth
            type="submit"
            color="primary"
            className={classes.submit}
          >
            Log In{" "}
            {loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
        </form>
        <Typography className={classes.errorText}>
          {Object.keys(loginError).length !== 0
            ? loginError.general
              ? loginError.general
              : loginError.error
              ? loginError.error
              : null
            : null}
        </Typography>
        <Grid container>
          <Grid item xs={12} sm={12} md={12}>
            <Typography component="h6" className={classes.noAccountHeader}>
              Dont Have an Account?
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Button
              size="small"
              color="primary"
              className={classes.signUpLink}
              component={Link}
              to="/register"
            >
              Create Account
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </main>
  );
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});
export default connect(mapStateToProps, { loginUser })(Login);
