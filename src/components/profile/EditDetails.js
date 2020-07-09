// Dependencies
import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import MyButton from "../../utils/myButton";
// MUI stuff
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useEffect } from "react";
// Icons
import EditIcon from "@material-ui/icons/Edit";

// Actions
import { setUserDetails } from "../../redux/actions/userActions";
import { getUserData } from "../../redux/actions/userActions";
function EditDetails({
  user: {
    credentials: { bio: Userbio, website: Userwebsite, location: Userlocation },
  },
  setUserDetails,
}) {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState({
    bio: "",
    location: "",
    website: "",
  });
  const { bio, location, website } = formData;

  const handleClickOpen = () => {
    setFormData({
      bio: !Userbio ? "" : Userbio,
      location: !Userlocation ? "" : Userlocation,
      website: !Userwebsite ? "" : Userwebsite,
    });
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const userDetails = {
      bio,
      location,
      website,
    };
    setUserDetails(userDetails);
  };

  useEffect(() => {
    let mounted = true;
    getUserData();
    if (mounted) {
      setFormData({
        bio: !Userbio ? "" : Userbio,
        location: !Userlocation ? "" : Userlocation,
        website: !Userwebsite ? "" : Userwebsite,
      });
    }
    return () => (mounted = false);
  }, [Userbio, Userlocation, Userwebsite]);

  return (
    <>
      <MyButton
        click={handleClickOpen}
        style={{ float: "right" }}
        tip="Edit Profile"
      >
        <EditIcon color="primary" />
      </MyButton>{" "}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form onFirebase Hosting Setup CompleteSubmit={(e) => onSubmit(e)}>
          <DialogTitle id="form-dialog-title">User Details</DialogTitle>
          <DialogContent>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="bio">bio</InputLabel>
              <Input
                name="bio"
                value={bio}
                onChange={(e) => onChange(e)}
                autoFocus
                margin="dense"
                id="bio"
                type="test"
                fullWidth
              />
            </FormControl>
            <FormControl required fullWidth margin="normal">
              {" "}
              <InputLabel htmlFor="location">Location</InputLabel>
              <Input
                name="location"
                value={location}
                onChange={(e) => onChange(e)}
                margin="dense"
                id="location"
                type="text"
                fullWidth
              />
            </FormControl>
            <FormControl required fullWidth margin="normal">
              {" "}
              <InputLabel htmlFor="website">Website / Github</InputLabel>
              <Input
                name="website"
                value={website}
                onChange={(e) => onChange(e)}
                margin="dense"
                id="website"
                type="text"
                fullWidth
              />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleClose()} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
const mapStateToProps = (state) => ({
  user: state.user,
});
EditDetails.propTypes = {
  user: PropTypes.object.isRequired,
  setUserDetails: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, { setUserDetails, getUserData })(
  EditDetails
);
