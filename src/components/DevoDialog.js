// Dependencies
import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import PropTypes from "prop-types";

import MyButton from "../utils/myButton";
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
// MUI stuff
import { makeStyles } from "@material-ui/core/styles";
// import InputLabel from "@material-ui/core/InputLabel";
// import Button from "@material-ui/core/Button";
// import FormControl from "@material-ui/core/FormControl";
// import Input from "@material-ui/core/Input";
import Dialog from "@material-ui/core/Dialog";
// import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
// import DialogTitle from "@material-ui/core/DialogTitle";
// import IconButton from "@material-ui/core/IconButton";
// import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";

// Redux
import { connect } from "react-redux";
import { getDevo } from "../redux/actions/dataActions";
import { useState } from "react";
import { CircularProgress, Typography } from "@material-ui/core";

import LikeButton from "./LikeButton";
import ChatIcon from "@material-ui/icons/Chat";
function DevoDialog({
  getDevo,
  devoId: id,
  userHandle: handle,
  devo,
  UI: { loading },
}) {
  const {
    createdAt,
    userHandle,
    likeCount,
    userImage,
    body,
    commentCount,
    devoId,
    devoImg,
  } = devo;
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
    getDevo(id);
  };
  const handleClose = () => {
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
  const classes = useStyles();
  //   <FormControl required fullWidth margin="normal">
  //     <InputLabel htmlFor="comment">Post comment</InputLabel>
  //     <Input
  //       name="comment"
  //       autoFocus
  //       margin="dense"
  //       id="comment"
  //       type="test"
  //       fullWidth
  //     />
  //   </FormControl>;
  const dialogMarkup = loading ? (
    <div className={classes.spinnerDiv}>
      <CircularProgress size={160} thickness={2} />
    </div>
  ) : (
    <Grid container>
      <Grid item xs={12} sm={6}>
        <img src={devoImg} className={classes.image} alt="Profile" />
      </Grid>
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
        <LikeButton devoId={devoId} />
        <span>{likeCount}</span>
        <MyButton tip="comments">
          <ChatIcon color="primary" fontSize="small" />
        </MyButton>
        <span>{commentCount}</span>
      </Grid>
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
