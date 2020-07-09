import React, { useState, useEffect } from "react";
import "./App.css";
import jwtDecode from "jwt-decode";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import register from "./pages/register";
import Navbar from "./components/layout/Navbar";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import AuthRoute from "./utils/AuthRoute";
import User from "./pages/User";
import {
  orange,
  lightBlue,
  deepOrange,
  deepPurple,
} from "@material-ui/core/colors";
// Redux
import { Provider } from "react-redux";
import store from "./redux/reducers/store";
import { SET_AUTHENTICATED } from "./redux/reducers/types";
import { logout, getUserData } from "./redux/actions/userActions";
import axios from "axios";
axios.defaults.baseURL = "https://asia-east2-devo-dc5dc.cloudfunctions.net/api";

const token = localStorage.token;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    alert("Token has expired..");
    store.dispatch(logout());
    window.location.href = "/login";
  } else {
    store.dispatch({
      type: SET_AUTHENTICATED,
    });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}
function App() {
  const getPrefColorScheme = () => {
    if (!window.matchMedia) return;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  };
  const getIntialMode = () => {
    const isReturningUser = "dark" in localStorage;
    const savedMode = JSON.parse(localStorage.getItem("dark"));
    const userPrefersDark = getPrefColorScheme();
    if (isReturningUser) {
      return savedMode;
    } else if (userPrefersDark) return true;
    else {
      return false;
    }
  };

  const [darkMode, setDarkMode] = useState(getIntialMode());
  const palletType = darkMode ? "dark" : "light";
  const mainPrimaryColor = darkMode ? orange[500] : lightBlue[500];
  const mainSecondaryColor = darkMode ? deepOrange[500] : deepPurple[500];
  const theme = createMuiTheme({
    palette: {
      type: palletType,
      primary: {
        main: mainPrimaryColor,
      },
      secondary: {
        main: mainSecondaryColor,
      },
    },
  });

  useEffect(() => {
    localStorage.setItem("dark", JSON.stringify(darkMode));
  }, [darkMode]);
  return (
    <div className="app">
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <Router>
            <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
            <Switch>
              <>
                <div className="container">
                  <Route exact path="/" component={Home} />
                  <AuthRoute exact path="/login" component={Login} />
                  <AuthRoute exact path="/register" component={register} />
                  <Route exact path="/user/:handle" component={User} />
                  <Route
                    exact
                    path="/user/:handle/devo/:devoId"
                    component={User}
                  />
                </div>
              </>
            </Switch>
          </Router>
        </Provider>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
