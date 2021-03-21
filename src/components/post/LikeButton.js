import React, { Component } from 'react';
import MyButton from "../../utils/MyButton";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import FavoriteBorderRoundedIcon from "@material-ui/icons/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";
import { connect } from "react-redux";
import { likePost, unLikePost } from "../../redux/actions/dataActions";
// import { withStyles } from '@material-ui/core';

// const styles = (theme) => ({
//     ...theme.spreadThis,
// });


export class LikeButton extends Component {
    likedPost = () => {
        if(this.props.user.likes && this.props.user.likes.find((like) => like.screamId === this.props.screamId))
        return true;
        else return false;
    };
    likePost = () => {
        this.props.likePost(this.props.screamId);
    };
    unlikePost = () => {
        this.props.unLikePost(this.props.screamId);
    };
    render() {
        const {authenticated} = this.props.user;
        const likeButton = !authenticated ? (
            <Link to="/login">
                <MyButton tip="like">
                    <FavoriteBorderRoundedIcon color="primary"></FavoriteBorderRoundedIcon>
                </MyButton>
            </Link>
        ) : (
            this.likedPost() ? (
                <MyButton tip="unlike" onClick={this.unlikePost}>
                    <FavoriteRoundedIcon color="primary"></FavoriteRoundedIcon>
                </MyButton>
            ) : (
                <MyButton tip="like" onClick={this.likePost}>
                    <FavoriteBorderRoundedIcon color="primary"></FavoriteBorderRoundedIcon>
                </MyButton>
            )
        );
        return likeButton;
    }
}

LikeButton.propTypes = {
    user: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired,
    likePost: PropTypes.func.isRequired,
    unlikePost: PropTypes.func
}
const mapStateToProps = (state) => ({
    user: state.user,
});

const mapActionsToProps = {
    likePost,
    unLikePost,
};

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);