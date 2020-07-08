// Dependencies
import React, { useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import PropTypes from "prop-types";

// Icons
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import ChatIcon from "@material-ui/icons/Chat";
// MUI stuff
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";

// Redux
import { connect } from "react-redux";
import { getDevo } from "../../redux/actions/dataActions";
import { useState } from "react";
import { CircularProgress, Typography } from "@material-ui/core";

// Components
import PostComments from "./PostComments";
import LikeButton from "./LikeButton";
import MyButton from "../../utils/myButton";
import Comments from "./Comments";
function DevoDialog({
  getDevo,
  devoId: id,
  userHandle: handle,
  devo,
  UI: { loading },
  openDialog,
}) {
  const {
    createdAt,
    userHandle,
    likeCount,
    body,
    commentCount,
    devoId,
    devoImg,
    comments,
  } = devo;
  const [open, setOpen] = useState(false);
  const [path, setPath] = useState({
    oldPath: "",
    newPath: "",
  });
  const { oldPath } = path;
  const handleClickOpen = useCallback(() => {
    let oldPath = window.location.pathname;
    const newPath = `/user/${handle}/devo/${id}`;
    if (oldPath === newPath) {
      oldPath = `/user/${handle}`;
    }
    window.history.pushState(null, null, newPath);
    setOpen(true);
    setPath({ oldPath, newPath });
    getDevo(id);
  }, [getDevo, handle, id]);
  const handleClose = () => {
    window.history.pushState(null, null, oldPath);
    setOpen(false);
  };
  const useStyles = makeStyles((theme) => ({
    image: {
      height: 200,
      width: 200,
      maxWidth: 200,
      maxHeight: 200,
      borderRadius: "50%",
      objectFit: "cover",
    },
    visibleSeperator: {
      width: "100%",
      borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
      marginBottom: "20px",
    },
    invisibleSeperator: {
      border: "none",
      margin: 4,
    },
    dialogContent: {
      padding: 20,
    },
    closeButton: {
      position: "absolute",
      left: "87%",
      top: "2%",
    },
    spinnerDiv: {
      textAlign: "center",
      margin: 50,
      marginBottom: 50,
    },
  }));
  useEffect(() => {
    if (openDialog) {
      handleClickOpen();
    }
  }, [handleClickOpen, openDialog]);
  const classes = useStyles();
  const dialogMarkup = loading ? (
    <div className={classes.spinnerDiv}>
      <CircularProgress size={160} thickness={2} />
    </div>
  ) : (
    <Grid container>
      {devoImg ? (
        <Grid item xs={12} sm={6}>
          <img src={devoImg} className={classes.image} alt="Profile" />
        </Grid>
      ) : null}
      <Grid item xs={12} sm={6}>
        <Typography
          color="primary"
          component={Link}
          variant="h5"
          to={`/users/${userHandle}`}
        >
          @{userHandle}
        </Typography>
        <hr className={classes.invisibleSeperator} />
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
        </Typography>
        <hr className={classes.invisibleSeperator} />
        <Typography variant="body1">{body}</Typography>
        <LikeButton devoId={id} />
        <span>{likeCount}</span>
        <MyButton tip="comments">
          <ChatIcon color="primary" fontSize="small" />
        </MyButton>
        <span>{commentCount}</span>
      </Grid>
      <hr className={classes.visibleSeperator} />
      <PostComments devoId={devoId} />
      <Comments comments={comments} />
    </Grid>
  );
  return (
    <>
      <MyButton
        click={handleClickOpen}
        tipClassName={classes.expandButton}
        tip="Devo Details"
      >
        <UnfoldMore color="primary" />
      </MyButton>
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <MyButton
          tip="Close"
          click={handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogContent className={classes.dialogContent}>
          {dialogMarkup}
        </DialogContent>
        {/* <DialogActions>
            <Button type="submit" color="primary">
              Submit
            </Button>
          </DialogActions> */}
      </Dialog>
    </>
  );
}
const mapStateToProps = (state) => ({
  devo: state.data.devo,
  UI: state.UI,
});
DevoDialog.propTypes = {
  devo: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, { getDevo })(DevoDialog);
