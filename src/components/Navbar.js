import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import MyButton from "../utils/myButton";
import PostDevo from "./PostDevo";

//MUI stuff
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";

// Icons
import AddIcon from "@material-ui/icons/Add";
import HomeIcon from "@material-ui/icons/Home";
import Notifications from "@material-ui/icons/Notifications";

function Navbar({ setDarkMode, darkMode, authenticated, history }) {
  const useStyles = makeStyles((theme) => ({
    navColor: {
      background: "linear-gradient(to right, #00B4DB, #0083B0)",
      color: "#fff",
      opacity: ".8",
      padding: ".5rem 2rem",
    },
    darkNav: {
      background: "#ffa726",
      color: "#fff",
      opacity: ".8",
      padding: ".5rem 2rem",
    },
  }));

  const classes = useStyles();
  return (
    <AppBar className={!darkMode ? classes.navColor : classes.darkNav}>
      <Toolbar className="nav-container">
        {authenticated ? (
          <>
            <PostDevo />
            <Link to="/">
              <MyButton tip="home">
                <HomeIcon />
              </MyButton>
            </Link>
            <MyButton tip="Notifications">
              <Notifications />
            </MyButton>
            <Switch
              checked={darkMode}
              onClick={() => setDarkMode(!darkMode)}
            >
              Flip
            </Switch>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
            <Switch
              checked={darkMode}
              onClick={() => setDarkMode(!darkMode)}
            >
              Flip
            </Switch>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});
Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};
export default connect(mapStateToProps)(Navbar);
