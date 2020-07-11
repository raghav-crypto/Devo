import React, { useEffect, useState } from "react";

import MyButton from "../utils/myButton";
import { Link } from "react-router-dom";
import clsx from "clsx";
import NewChat from "./NewChat";
import { theme } from "./chattheme";
// MUI
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import HomeIcon from "@material-ui/icons/Home";

import ChatList from "./ChatList";
import ChatView from "./ChatView";
import ChatTextBox from "./ChatTextBox";
import { connect } from "react-redux";
import { CircularProgress } from "@material-ui/core";
const useStyles = makeStyles(theme);

const firebase = require("firebase");

function Sidebar({
  user: {
    credentials: { email, loading, authenticated },
  },
  history,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [userChats, setUserChats] = useState(null);
  const [state, setState] = useState({
    selectedChat: null,
    newChatFormVisible: false,
    loading: false,
    message: "",
  });
  const { selectedChat, newChatFormVisible } = state;
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      setOpen(true);
    }
    return () => (mounted = false);
  }, []);
  useEffect(() => {
    let mounted = true;
    if (mounted && email) {
      firebase
        .firestore()
        .collection("chats")
        .where("users", "array-contains", email)
        .onSnapshot(async (res) => {
          const chats = res.docs.map((doc) => doc.data());
          setUserChats(chats);
        });
      return () => (mounted = false);
    }
  }, [email]);
  const selectChat = (chatIndex) => {
    setState({
      ...state,
      selectedChat: chatIndex,
      loading: false,
      newChatFormVisible: false,
    });
  };
  const buildDocKey = (friend) => {
    return [email, friend].sort().join(":");
  };
  const goToChatFn = async (docKey, msg) => {
    const usersInChat = docKey.split(":");
    const chat = userChats.find((_chat) =>
      usersInChat.every((_user) => _chat.users.includes(_user))
    );
    setState({ ...state, newChatFormVisible: false });
    await selectChat(userChats.indexOf(chat));
    firebase
      .firestore()
      .collection("chats")
      .doc(docKey)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion({
          sender: email,
          message: msg,
          timestamp: Date.now(),
        }),
        receiverHasRead: false,
      });
  };
  useEffect(() => {
    let mounted = true;
    if (mounted && newChatFormVisible) {
      setOpen(false);
    }
  }, [newChatFormVisible]);
  const newChatSubmitFn = async (chatObj) => {
    const docKey = buildDocKey(chatObj.sendTo);
    await firebase
      .firestore()
      .collection("chats")
      .doc(docKey)
      .set({
        receiverHasRead: false,
        users: [email, chatObj.sendTo],
        messages: [
          {
            message: chatObj.message,
            sender: email,
          },
        ],
      });
    setState({
      ...state,
      newChatFormVisible: false,
    });
    setState({ ...state, newChatFormVisible: false });
    if (userChats !== null && userChats.length) {
      selectChat(userChats.length - 1);
    }
    selectChat(0);
  };

  const messageRead = () => {
    const docKey = buildDocKey(
      userChats[selectedChat].users.filter((_user) => _user !== email)[0]
    );
    if (clickedChatWhereNotSender(selectedChat)) {
      firebase.firestore().collection("chats").doc(docKey).update({
        receiverHasRead: true,
      });
    } else {
    }
  };
  const clickedChatWhereNotSender = (chatIndex) => {
    return (
      userChats[chatIndex].messages[userChats[chatIndex].messages.length - 1]
        .sender !== email
    );
  };
  const newChatBtnClicked = () => {
    setState({
      newChatFormVisible: true,
      selectedChat: null,
      loading: true,
    });
  };
  const submitMessage = (msg) => {
    const docKey = buildDocKey(
      userChats[selectedChat].users.filter((_user) => _user !== email)[0]
    );
    firebase
      .firestore()
      .collection("chats")
      .doc(docKey)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion({
          sender: email,
          message: msg,
          timestamp: Date.now(),
        }),
        receiverHasRead: false,
      });
  };
  useEffect(() => {
    let mounted = true;
    if (mounted && selectedChat !== null) {
      setOpen(false);
    }
    return () => (mounted = false);
  }, [selectedChat]);

  return !loading && userChats !== null ? (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        elevation={0}
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>

          <Link to="/">
            <MyButton style={{ color: "white" }} tip="home">
              <HomeIcon />
            </MyButton>
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <ChatList
          email={email}
          newChatBtnClicked={newChatBtnClicked}
          history={history}
          newChatBtnFunction={newChatBtnClicked}
          chats={userChats}
          selectedChat={selectedChat}
          selectChat={selectChat}
        />
      </Drawer>

      {newChatFormVisible ? null : userChats && selectedChat !== null ? (
        <ChatView open={open} user={email} chat={userChats[selectedChat]} />
      ) : null}
      {selectedChat !== null && !newChatFormVisible ? (
        <ChatTextBox
          open={open}
          messageRead={messageRead}
          submitMessageFn={submitMessage}
        />
      ) : null}
      {newChatFormVisible ? (
        <NewChat
          setState={setState}
          email={email}
          open={open}
          goToChatFn={goToChatFn}
          newChatSubmitFn={newChatSubmitFn}
        />
      ) : null}
    </div>
  ) : (
    <div>
      <AppBar elevation={0} position="fixed">
        <Toolbar></Toolbar>
      </AppBar>
      <div style={{ marginTop: "200px", textAlign: "center" }}>
        <CircularProgress size={120} thickness={2} />
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  user: state.user,
});
export default connect(mapStateToProps, {})(Sidebar);
