import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

// Theme
import { profileTheme } from "../theme";

// MUI stuff
import MuiLink from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

//Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";

function StaticProfile({
  profile: { handle, createdAt, imageUrl, bio, website, location },
}) {
  const useStyles = makeStyles(profileTheme);
  const classes = useStyles();
  return (
    <div>
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="image-wrapper">
            <img src={imageUrl} className="profile-image" alt="profile" />
          </div>
          <hr />
          <div className="profile-details">
            <MuiLink
              component={Link}
              to={`/user/${handle}`}
              color="primary"
              variant="h5"
            >
              @{handle}
            </MuiLink>
            <hr />
            {bio && <Typography variant="body2">{bio}</Typography>}
            <hr />
            {location && (
              <>
                <LocationOn color="primary" /> <span>{location}</span>
                <hr />
              </>
            )}
            {website && (
              <>
                <LinkIcon color="primary" />
                <a href={website} target="_blank" rel="noopener noreferrer">
                  {" "}
                  {website}
                </a>
                <hr />
              </>
            )}
            <CalendarToday color="primary" />{" "}
            <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
          </div>
        </div>
      </Paper>
    </div>
  );
}

export default StaticProfile;
