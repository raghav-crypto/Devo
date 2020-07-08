import React from "react";
import NoImg from "../utils/noimage.png";

// MUI
import { makeStyles } from "@material-ui/core/styles";
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import { Paper } from "@material-ui/core";

import { profileTheme } from "../components/theme";

function ProfileSkelton() {
  const useStyles = makeStyles(profileTheme);
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img src={NoImg} alt="profile" className="profile-image" />
        </div>
        <hr />
        <div className="profile-details">
          <div className={classes.handle} />
          <hr />
          <div className={classes.fullLine} />
          <hr />
          <LocationOn color="primary" /> <span>Location</span>
          <hr />
          <LinkIcon color="primary" /> https://website.com
          <hr />
          <CalendarToday color="primary" /> Joinded date
        </div>
      </div>
    </Paper>
  );
}

export default ProfileSkelton;
