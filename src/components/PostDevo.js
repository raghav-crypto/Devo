import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import MyButton from "../utils/myButton";

import { loginTheme } from "../pages/theme";
// MUi
import makeStyles from "@material-ui/styles/makeStyles";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import CircularProgress from "@material-ui/core/CircularProgress";

// ICons
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

import { postDevo } from "../redux/actions/dataActions";

function PostDevo({ postDevo, loading }) {
  const [open, setOpen] = useState(false);
  const [emptyError, setError] = useState(false);
  const [formData, setFormData] = useState({
    body: "",
  });
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
  };

  const useStyles = makeStyles(loginTheme);
  const classes = useStyles();
  const onChange = (e) => {
    if (emptyError) {
      setError(false);
      setFormData({ ...body, [e.target.name]: e.target.value });
    } else {
      setFormData({ ...body, [e.target.name]: e.target.value });
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (body === "") {
      setError(true);
    } else {
      postDevo(formData);
    }
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
                helperText={emptyError ? "Empty Field..." : null}
                name="body"
                label="Devo"
                error={emptyError ? true : null}
                multiline
                autoFocus
                id="body"
                type="text"
                rows="3"
                onChange={(e) => onChange(e)}
              />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button fullWidth type="submit" color="primary" type="submit">
              Submit
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
          </DialogActions>
        </form>
        {emptyError ? (
          <Typography color="secondary">
            Must have Something ! Share it...
          </Typography>
        ) : null}
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
