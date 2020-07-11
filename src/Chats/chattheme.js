export const theme = (theme) => ({
  root: {
    display: "flex",
    margin: 0,
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: "linear-gradient(to right, #00B4DB, #0083B0)",
    color: "#fff",
    margin: "auto",
  },
  appBarShift: {
    width: `calc(100% - ${240}px)`,
    marginLeft: 240,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -270,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  spinner: {
    margin: "auto",
    marginTop: 150,
  },
  container: {
    position: "relative",
  },
  userSent: {
    float: "right",
    clear: "both",
    padding: "20px",
    boxSizing: "border-box",
    wordWrap: "break-word",
    marginTop: "10px",
    backgroundColor: "#707BC4",
    color: "white",
    // width: "200px",
    borderRadius: "10px",
  },
  friendSent: {
    float: "left",
    clear: "both",
    padding: "20px",
    boxSizing: "border-box",
    wordWrap: "break-word",
    marginTop: "10px",
    backgroundColor: "#707BC4",
    color: "white",
    // width: "200px",
    borderRadius: "10px",
  },
  chatContent: {
    height: "calc(100vh - 100px)",
    overflow: "auto",
    padding: "25px",
    boxSizing: "border-box",
    overflowY: "scroll",
    top: "50px",
    width: "100%",
    position: "absolute",
  },
  chatTextBoxContainer: {
    position: "absolute",
    bottom: "-2px",
    boxSizing: "border-box",
    overflow: "auto",
    width: "100%",
  },

  chatTextBox: {
    width: "calc(100% - 25px)",
  },
});
