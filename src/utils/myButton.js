import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import { IconButton } from "@material-ui/core";
function myButton({
  children,
  click,
  btnClassName,
  tipClassName,
  tip,
  placement,
  style,
}) {
  return (
    <Tooltip title={tip} className={tipClassName} placement="top">
      <IconButton
        style={style}
        className={btnClassName}
        onClick={!click ? null : () => click()}
      >
        {children}
      </IconButton>
    </Tooltip>
  );
}

export default myButton;
