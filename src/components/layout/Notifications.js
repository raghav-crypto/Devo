import React, { useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// MUI stuff
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";

// Icons
import NotificationsIcon from "@material-ui/icons/Notifications";
import Favourite from "@material-ui/icons/FavoriteOutlined";
import ChatIcon from "@material-ui/icons/Chat";

// Redux
import { connect } from "react-redux";
import { notificationsRead } from "../../redux/actions/userActions";

function Notifications({ notificationsRead, notifications }) {
  dayjs.extend(relativeTime);
  const [anchor, setAnchor] = useState(null);
  const anchorEl = anchor;
  const handleOpen = (e) => {
    setAnchor(e.target);
  };
  const handleClose = () => {
    setAnchor(null);
  };
  const onMenuOpen = () => {
    let unreadNotificationsIds = notifications
      .filter((not) => !not.read)
      .map((not) => not.notificationsId);
    notificationsRead(unreadNotificationsIds);
  };
  let notificationIcon;
  if (notifications && notifications.length > 0) {
    if (notifications.filter((not) => not.read === false).length > 0) {
      notificationIcon = (
        <Badge
          badgeContent={
            notifications.filter((not) => not.read === false).length
          }
          color="secondary"
        >
          <NotificationsIcon />
        </Badge>
      );
    } else {
      notificationIcon = <NotificationsIcon />;
    }
  } else {
    notificationIcon = <NotificationsIcon />;
  }
  let notificationMarkup;
  if (notifications && notifications.length > 0) {
    notificationMarkup = notifications.map((not) => {
      const verb = not.type === "like" ? "liked" : "commented on";
      const time = dayjs(not.createdAt).fromNow();
      const iconColor = not.read ? "primary" : "secondary";
      const icon =
        not.type === "like" ? (
          <Favourite color={iconColor} style={{ marginRight: 10 }} />
        ) : (
          <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
        );
      return (
        <MenuItem key={not.createdAt} onClick={() => handleClose()}>
          {icon}
          <Typography
            component={Link}
            color="textPrimary"
            variant="body1"
            to={`/user/${not.recipient}/devo/${not.devoId}`}
          >
            {not.sender} {verb} Your devo {time}
          </Typography>
        </MenuItem>
      );
    });
  } else {
    notificationMarkup = (
      <MenuItem onClick={() => handleClose()}>
        You Have no notifications yet
      </MenuItem>
    );
  }
  return (
    <>
      <Tooltip placement="top" title="Notifications">
        <IconButton
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={(e) => handleOpen(e)}
        >
          {notificationIcon}
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleClose()}
        onEntered={() => onMenuOpen()}
      >
        {notificationMarkup}
      </Menu>
    </>
  );
}

const mapStateToProps = (state) => ({
  notifications: state.user.notifications,
});
export default connect(mapStateToProps, { notificationsRead })(Notifications);
