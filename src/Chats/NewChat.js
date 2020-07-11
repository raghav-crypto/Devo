import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  Paper,
  CssBaseline,
  Typography,
  makeStyles,
} from "@material-ui/core";
import firebase from "firebase";

const NewChat = ({
  newChatSubmitFn,
  goToChatFn,
  open: sidebar,
  email,
  setState,
}) => {
  const useStyles = makeStyles((theme) => ({
    main: {
      width: "auto",
      display: "block", // Fix IE 11 issue.
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(3),
      [theme.breakpoints.up(400 + theme.spacing(3) * 2)]: {
        width: 400,
        marginLeft: "auto",
        marginRight: "auto",
      },
    },
    paper: {
      padding: `${theme.spacing(3) * 2}px ${theme.spacing(3)}px ${theme.spacing(
        3
      )}px`,
      position: "absolute",
      width: "350px",
      top: "100px",
      left: sidebar ? "270px" : "30px",
    },
    input: {},
    form: {
      width: "100%",
      marginTop: theme.spacing(3),
    },
    submit: {
      marginTop: theme.spacing(3),
    },
    errorText: {
      color: "red",
      textAlign: "center",
    },
  }));
  const classes = useStyles();
  const [data, setData] = useState({
    username: "",
    message: "",
  });
  const [error, setError] = React.useState(null);
  const { username, message } = data;
  const userTyping = (type, e) => {
    switch (type) {
      case "username":
        setData({ ...data, username: e.target.value });
        break;
      case "message":
        setData({ ...data, message: e.target.value });
        break;
      default:
        break;
    }
  };

  const userExists = async () => {
    const usersSnapShot = await firebase.firestore().collection("users").get();
    const exists = usersSnapShot.docs
      .map((doc) => doc.data().email)
      .includes(username);
    return exists;
  };
  const chatExists = async () => {
    const docKey = buildDocKey();
    const chat = await firebase
      .firestore()
      .collection("chats")
      .doc(docKey)
      .get();
    return chat.exists;
  };
  const onsubmit = async (e) => {
    e.preventDefault();
    if (username === email) {
      setError("Send messages to others. Loner");
      setData({ ...data, username: "" });
      return;
    }
    const user_Exists = await userExists();
    if (user_Exists) {
      const chat_Exists = await chatExists();
      chat_Exists ? goToChat() : createChat();
    } else {
      setError("User Does Not Exists");
      setData({ ...data, username: "" });
      return;
    }
  };

  const goToChat = () => {
    goToChatFn(buildDocKey(), message);
    console.log("chatExists");
  };
  const createChat = () => {
    const chatObj = {
      sendTo: username,
      message: message,
    };
    newChatSubmitFn(chatObj);
    console.log("chat created");
  };
  const buildDocKey = () => {
    return [email, username].sort().join(":");
  };
  return (
    <main className={classes.main}>
      <CssBaseline></CssBaseline>
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h5">
          New Message
        </Typography>
        <form className={classes.form} onSubmit={(e) => onsubmit(e)}>
          <FormControl fullWidth>
            <InputLabel htmlFor="new-chat-username">
              Enter Your Friend's Email
            </InputLabel>
            <Input
              required
              className={classes.input}
              autoFocus
              onChange={(e) => userTyping("username", e)}
              id="new-chat-username"
            ></Input>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="new-chat-message">
              Enter Your Message
            </InputLabel>
            <Input
              required
              className={classes.input}
              onChange={(e) => userTyping("message", e)}
              id="new-chat-message"
            ></Input>
            <Button
              style={{ color: "white" }}
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Submit
            </Button>
          </FormControl>
        </form>
        {error && (
          <Typography className={classes.errorText}>{error}</Typography>
        )}
      </Paper>
    </main>
  );
};
export default NewChat;
