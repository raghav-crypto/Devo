// Dependencies
import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";

// Components
import DeleteDevo from "./DeleteDevo";
import MyButton from "../../utils/myButton";
import DevoDialog from "./DevoDialog";
import LikeButton from "./LikeButton";
// MUI stuff
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";

// MUI Icons
import ChatIcon from "@material-ui/icons/Chat";

// Redux
import { connect } from "react-redux";

function Devos({
  devos,
  user: {
    likes,
    authenticated,
    credentials: { handle },
  },
  likeDevo,
  unlikeDevo,
  openDialog,
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
    devoImg,
  } = devos;

  const deleteButton =
    authenticated && userHandle === handle ? (
      <DeleteDevo devoId={devoId} />
    ) : null;
  const matches = useMediaQuery("(min-width:621px)");
  const useStyles = makeStyles((theme) => ({
    card: {
      margin: "auto",
<<<<<<< HEAD:src/components/devo/Devos.js
=======
      width: "100%",
>>>>>>> 071b0a278e0610df2e392f0adf8e7783eba1e1e2:src/components/Devos.js
      display: "flex",
      flexDirection: "column",
      marginBottom: "25px",
      width: "100%",
    },
    profileSidebar: {
      display: "flex",
      padding: "2px",
    },
    image: {
      borderRadius: "50%",
      maxWidth: "50px",
      maxHeigth: "40px",
    },
    profileName: {
      padding: "0px",
      margin: "0px",
      marginLeft: "12px",
    },
    button: {
      display: "flex",
      position: "relative",
    },
    profileMain: matches
      ? { display: "flex", flexDirection: "row" }
      : {
          display: "flex",
          flexDirection: "column",
        },
    profileBody: matches
      ? devoImg
        ? { margin: "auto", marginLeft: "2em" }
        : { margin: "0px" }
      : devoImg
      ? { margin: "0px", marginTop: "1em" }
      : { margin: "0px" },
    devoImgClass: matches
      ? {
          maxWidth: "256px",
          maxHeight: "256px",
          padding: "0px",
          margin: "0px",
          borderRadius: "4%",
          border: `1px solid ${theme.palette.primary.main}`,
        }
      : {
          margin: "auto",
          border: `1px solid ${theme.palette.primary.main}`,
          maxWidth: "256px",
          maxHeight: "256px",
          borderRadius: "4%",
        },
    date: matches
      ? {
          paddingLeft: "20px",
          lineHeight: "2.0",
        }
      : { lineHeight: "2.0" },
  }));
  const classes = useStyles();
  const date = dayjs(createdAt).from(dayjs(), true);
  return (
    <Card className={classes.card}>
      <div className={classes.profileSidebar}>
        <Link to={`/user/${userHandle}`}>
          <img className={classes.image} src={userImage} alt="" />
        </Link>
        <Typography
          className={classes.profileName}
          color="primary"
          variant="h5"
          component={Link}
          to={`/user/${userHandle}`}
        >
          {userHandle}
        </Typography>
        <Typography className={classes.date}>~{date} ago</Typography>
      </div>
      <CardContent>
        <div className={classes.profileMain}>
          {devoImg ? (
            <img className={classes.devoImgClass} src={devoImg} alt="Devo" />
          ) : null}
          <Typography className={classes.profileBody}>{body}</Typography>
        </div>
        <div className={classes.button}>
          <div>
            <LikeButton devoId={devoId} />
            <span>{likeCount}</span>
            <MyButton tip="comments">
              <ChatIcon fontSize="small" color="primary" />
            </MyButton>
            <span>{commentCount}</span>
          </div>
          <div>
            <DevoDialog
              devoId={devoId}
              userHandle={userHandle}
              openDialog={openDialog}
            />
          </div>
          <div>{deleteButton}</div>
        </div>
      </CardContent>
    </Card>
  );
}
// style={{ marginTop: "16px" }}
const mapStateToProps = (state) => ({
  user: state.user,
});

Devos.propTypes = {
  user: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(Devos);
