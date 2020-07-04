// Dependencies
import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";

// Components
import DeleteDevo from "./DeleteDevo";
import MyButton from "../utils/myButton";
import DevoDialog from "./DevoDialog";
// MUI stuff
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

// MUI Icons
import ChatIcon from "@material-ui/icons/Chat";
// Redux
import { connect } from "react-redux";
import LikeButton from "./LikeButton";

// Action functions
function Devos({
  devos,
  user: {
    likes,
    authenticated,
    credentials: { handle },
  },
  likeDevo,
  unlikeDevo,
}) {
  dayjs.extend(relativeTime);
  const {
    body,
    createdAt,
    userImage,
    devoId,
    userHandle,
    likeCount,
    commentCount,
  } = devos;

  const deleteButton =
    authenticated && userHandle === handle ? (
      <DeleteDevo devoId={devoId} />
    ) : null;
  const useStyles = makeStyles((theme) => ({
    card: {
      position: "relative",
      display: "flex",
      marginBottom: 20,
    },
    image: {
      minWidth: 200,
    },
    content: {
      padding: 25,
      objectFit: "cover",
    },
  }));
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardMedia
        image={userImage}
        title="Profile image"
        className={classes.image}
      />
      <CardContent className={classes.content}>
        <Typography
          color="primary"
          variant="h5"
          component={Link}
          to={`/users/userHandle`}
        >
          {userHandle}
        </Typography>
        {deleteButton}
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).from(dayjs(), true)} ago
        </Typography>
        <Typography variant="body1">{body}</Typography>
        <LikeButton devoId={devoId} />
        <span>{likeCount}</span>
        <MyButton tip="comments">
          <ChatIcon fontSize="small" color="primary" />
        </MyButton>
        <span>{commentCount}</span>
        <DevoDialog devoId={devoId} userHandle={userHandle} />
      </CardContent>
    </Card>
  );
}
const mapStateToProps = (state) => ({
  user: state.user,
});

Devos.propTypes = {
  user: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(Devos);
