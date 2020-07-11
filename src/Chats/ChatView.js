import React, { useEffect } from "react";
import clsx from "clsx";
import { theme } from "./chattheme";

import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme);

function ChatView({ open, chat, user }) {
  useEffect(() => {
    const container = document.getElementById("chatview-container");
    if (container) {
      container.scrollTo(0, container.scrollHeight);
    }
  });
  const classes = useStyles();
  if (chat === null || chat === undefined) {
    return null;
  } else {
    return (
      <div
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <main id="chatview-container" className={classes.chatContent}>
          {chat.messages.map((_msg, index) => (
            <div
              className={
                _msg.sender === user ? classes.userSent : classes.friendSent
              }
              key={index}
            >
              {_msg.message}
            </div>
          ))}
        </main>
      </div>
    );
  }
}

export default ChatView;
