import React, { useState } from "react";
import { TextField, makeStyles } from "@material-ui/core";
import { theme } from "./chattheme";
const ChatTextBox = ({ submitMessageFn, messageRead, open }) => {
  const useStyles = makeStyles(theme);
  const classes = useStyles();
  const [chatText, setChatText] = useState("");

  const messageValid = (text) => {
    return text && text.replace(/\s/g, "").length;
  };
  const userTyping = (e) => {
    e.keyCode === 13 ? submitmessage(e) : setChatText(e.target.value);
  };
  const userClicked = () => {
    messageRead();
  };
  const submitmessage = (e) => {
    console.log("submitted");
    if (messageValid(chatText)) {
      submitMessageFn(chatText);
      document.getElementById("chatText-box").value = "";
    }
  };
  return (
    <div className={classes.chatTextBoxContainer}>
      <div style={{ padding: "1em", backgroundColor: "inherit" }}>
        <TextField
          placeholder="Say Something"
          onKeyUp={(e) => userTyping(e)}
          id="chatText-box"
          className={classes.chatTextBox}
          onFocus={() => {
            userClicked();
          }}
        />
      </div>
    </div>
  );
};

export default ChatTextBox;
