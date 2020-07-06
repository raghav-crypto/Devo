import React from "react";
import PropTypes from "prop-types";

// MUI stuff
import MyButton from "../../utils/myButton";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";

// icons
import DeleteIcon from "@material-ui/icons/DeleteOutlineOutlined";

// Redux
import { connect } from "react-redux";

// Action functions
import { deleteDevo } from "../../redux/actions/dataActions";
import { useState } from "react";

function DeleteDevo({ deleteDevo, devoId }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const Delete = () => {
    deleteDevo(devoId);
    setOpen(false);
  };
  const useStyles = makeStyles((theme) => ({
    deleteButton: { position: "absolute", left: "90%" },
  }));
  const classes = useStyles();
  return (
    <>
      <MyButton
        click={handleOpen}
        tipClassName={classes.deleteButton}
        tip="Delete Devo"
      >
        <DeleteIcon color="secondary" />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Are you sure you want to delete this devo ?</DialogTitle>
        <DialogActions>
          <Button onClick={() => handleClose()} color="primary">
            Cancel
          </Button>
          <Button onClick={() => Delete()} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
DeleteDevo.propTypes = {
  deleteDevo: PropTypes.func.isRequired,
};
export default connect(null, { deleteDevo })(DeleteDevo);
