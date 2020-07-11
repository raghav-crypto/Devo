import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import NotificationImportant from "@material-ui/icons/NotificationImportant";
function ChatList({
  chats,
  email,
  newChatBtnClicked,
  selectedChat,
  selectChat,
}) {
  const userIsSender = (chat) => {
    return chat.messages[chat.messages.length - 1].sender === email;
  };
  return chats ? (
    <main>
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        onClick={() => {
          newChatBtnClicked();
        }}
      >
        New Message
      </Button>
      <List>
        {chats.map((_chat, _index) =>
          _chat.messages.length === 0 ? (
            <main>
              <Button
                variant="contained"
                fullWidth
                onClick={() => {
                  newChatBtnClicked();
                }}
                color="primary"
              >
                New Message
              </Button>
            </main>
          ) : (
            <div key={_index}>
              <ListItem
                selected={selectedChat === _index}
                id="autoClick"
                onClick={() => {
                  selectChat(_index);
                }}
                alignItems="flex-start"
              >
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp">
                    {
                      _chat.users
                        .filter((_user) => _user !== email)[0]
                        .toUpperCase()
                        .split("")[0]
                    }
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={_chat.users.filter((_user) => _user !== email)[0]}
                  secondary={
                    <React.Fragment>
                      <Typography component="span" color="textPrimary">
                        {_chat.messages[
                          _chat.messages.length - 1
                        ].message.substring(0, 30) + " ..."}
                      </Typography>
                    </React.Fragment>
                  }
                ></ListItemText>
                {_chat.receiverHasRead === false && !userIsSender(_chat) ? (
                  <ListItemIcon style={{ color: "red", marginTop: "32px" }}>
                    <NotificationImportant />
                  </ListItemIcon>
                ) : null}
              </ListItem>
              <Divider></Divider>
            </div>
          )
        )}
      </List>
    </main>
  ) : null;
}

export default ChatList;
