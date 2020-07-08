import React, { useState, useEffect } from "react";

// MUI stuff
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

// Redux
import { connect } from "react-redux";
// Action functions
import { postComment } from "../../redux/actions/dataActions";
function PostComments({
  postComment,
  devoId,
  authenticated,
  UI: { errors, loading },
}) {
  const [formData, setFormData] = useState({
    body: "",
  });
  const [error, setErrors] = useState({});
  const useStyles = makeStyles((theme) => ({
    submit: {
      marginTop: theme.spacing(1),
    },
  }));
  useEffect(() => {
    let mounted = true;
    if (errors && mounted && !loading) {
      setErrors(errors);
    }
    return () => (mounted = false);
  }, [errors, loading]);
  const classes = useStyles();
  const onChange = (e) => {
    if (error.comment) {
      setFormData({ body: e.target.value });
      setErrors({});
    } else {
      setFormData({ body: e.target.value });
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    postComment(devoId, formData);
    setFormData({ body: "" });
  };
  const commentMarkup = authenticated ? (
    <Grid item sm={12} style={{ textAlign: "center" }}>
      <form onSubmit={(e) => onSubmit(e)}>
        <TextField
          name="body"
          type="text"
          label="Comment on devo"
          error={error.comment ? true : false}
          helperText={error.comment}
          value={formData.body}
          onChange={(e) => onChange(e)}
          className={classes.TextField}
          fullWidth
        />

        <Button
          type="submit"
          color="primary"
          variant="contained"
          style={{ color: "white" }}
          className={classes.submit}
        >
          Submit
        </Button>
      </form>
      <hr />
    </Grid>
  ) : null;
  return <>{commentMarkup}</>;
}
const mapStateToProps = (state) => ({
  UI: state.UI,
  authenticated: state.user.authenticated,
});
export default connect(mapStateToProps, { postComment })(PostComments);
