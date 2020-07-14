import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
// MUI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

function Comments({ comments }) {
  const useStyles = makeStyles(() => ({
    visibleSeperator: {
      width: "100%",
      borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
      marginBottom: "20px",
    },
    invisibleSeperator: {
      border: "none",
      margin: 4,
    },
    commentImage: {
      width: "100px",
      height: "100px",
      objectFit: "cover",
      borderRadius: "50%",
    },
    commentData: {
      marginLeft: "20px",
    },
  }));
  const classes = useStyles();
  return (
    <>
      <Grid container>
        {comments.map((comment, index) => {
          const { body, createdAt, userImage, userHandle } = comment;
          return (
            <Fragment key={createdAt}>
              <Grid item sm={12}>
                <Grid container>
                  <Grid item sm={2}>
                    <img
                      src={userImage}
                      className={classes.commentImage}
                      alt="comment"
                    />
                  </Grid>
                  <Grid item sm={9}>
                    <div className={classes.commentData}>
                      <Typography
                        variant="h5"
                        component={Link}
                        color="primary"
                        to={`/users/${userHandle}`}
                      >
                        {userHandle}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
                      </Typography>
                      <hr className={classes.invisibleSeperator} />
                      <Typography variant="body1">{body}</Typography>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              {index !== comments.length - 1 && (
                <hr className={classes.visibleSeperator} />
              )}
            </Fragment>
          );
        })}
      </Grid>
    </>
  );
}

export default Comments;
