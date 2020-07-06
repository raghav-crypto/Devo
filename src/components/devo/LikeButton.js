import React from "react";
import { connect } from "react-redux";
import MyButton from "../../utils/myButton";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { likeDevo, unlikeDevo } from "../../redux/actions/dataActions";

function LikeButton({
  user: { authenticated, likes },
  likeDevo,
  unlikeDevo,
  devoId,
}) {
  const likedDevo = () => {
    if (likes && likes.find((like) => like.devoId === devoId)) {
      return true;
    } else {
      return false;
    }
  };
  const like = () => {
    likeDevo(devoId);
  };
  const unlike = () => {
    unlikeDevo(devoId);
  };
  const likeButton = !authenticated ? (
    <MyButton tip="like">
      <Link to="/login">
        <FavoriteBorderIcon fontSize="small" color="primary" />
      </Link>
    </MyButton>
  ) : likedDevo() ? (
    <MyButton click={unlike} tip="Undo Like">
      <FavoriteIcon fontSize="small" color="primary" />
    </MyButton>
  ) : (
    <MyButton click={like} tip="Like">
      <FavoriteBorderIcon fontSize="small" color="primary" />
    </MyButton>
  );
  return likeButton;
}
const mapStateToProps = (state) => ({
  user: state.user,
});
LikeButton.propTypes = {
  likeDevo: PropTypes.func.isRequired,
  unlikeDevo: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, { likeDevo, unlikeDevo })(LikeButton);
