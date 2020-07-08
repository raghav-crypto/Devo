import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import MyButton from "../../utils/myButton";

import { loginTheme } from "../../pages/theme";
// MUi
import makeStyles from "@material-ui/styles/makeStyles";
// import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import CircularProgress from "@material-ui/core/CircularProgress";
// ICons
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import Image from "@material-ui/icons/Image";

import { postDevo } from "../../redux/actions/dataActions";

function PostDevo({ postDevo, loading }) {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [emptyError, setError] = useState(false);
  const [formData, setFormData] = useState({
    body: "",
  });
  const [data, setData] = useState({
    error: false,
    wordCount: "",
  });
  const wordLimit = 50;
  const { wordCount, error } = data;
  const { body } = formData;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({
      body: "",
    });
    setError(false);
    setData({
      wordCount: "",
      error: false,
    });
  };

  const useStyles = makeStyles(loginTheme);
  const classes = useStyles();

  const onChange = (e) => {
    const wordCount =
      e.target.value === "" ? 0 : e.target.value.split(" ").length;
    setData({
      wordCount: wordCount,
    });
    if (emptyError || (error && wordCount < wordLimit)) {
      setError(false);
      setData({ error: false });
      setFormData({ ...formData, [e.target.name]: e.target.value });
    } else {
      if (wordCount < wordLimit) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      } else {
        return setData({ error: true });
      }
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (error) {
      return alert("Limit Exceded");
    }
    if (body === "") {
      return setError(true);
    } else {
      postDevo(formData, image);
    }
  };
  const handleImageChange = (e) => {
    const image = e.target.files[0];
    const imageData = new FormData();
    imageData.append("devoImg", image, image.name);
    setImage(imageData);
  };

  return (
    <>
      <MyButton click={handleClickOpen} tip="Post a Devo">
        <AddIcon />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <MyButton
          tip="Close"
          click={handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <form onSubmit={(e) => onSubmit(e)} className={classes.form}>
          <DialogTitle>Post a New Devo</DialogTitle>
          <DialogContent>
            <FormControl required fullWidth margin="normal">
              <TextField
                helperText={
                  emptyError
                    ? "Must be something..."
                    : error
                    ? "Devo length exceded..."
                    : null
                }
                name="body"
                label="Devo"
                error={emptyError || (error && true)}
                multiline
                autoFocus
                id="body"
                type="text"
                rows="3"
                onChange={(e) => {
                  onChange(e);
                }}
              />
            </FormControl>
            <span>
              {wordCount}/{wordLimit}
            </span>
          </DialogContent>
          <DialogActions>
            <input
              className="inputfile"
              type="file"
              id="file"
              onChange={(e) => {
                handleImageChange(e);
              }}
            />
            <label className="imagelabel" htmlFor="file">
              Choose Image
            </label>
            <Image color="primary" />
            <Button fullWidth type="submit" color="primary">
              Submit
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
const mapStateToProps = (state) => ({
  loading: state.UI.loading,
});
PostDevo.propTypes = {
  postDevo: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};
export default connect(mapStateToProps, { postDevo })(PostDevo);
