import React, { Component } from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import MyButton from "../../utils/MyButton";
import DeletePost from "./DeletePost";
import PostDialog from "./PostDialog";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

//Importing Material Ui Cards styling
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
//Redux 
import { connect } from  "react-redux";

//Icons
import AddCommentRoundedIcon from '@material-ui/icons/AddCommentRounded';
import { ButtonBase, Grid } from '@material-ui/core';
import LikeButton from './LikeButton';

const styles = {
    card: {
        position: "relative",
        display: 'flex',
        margin: 20,
    },
    image: {
        width: 128,
        height: 128,
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "15px"
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    }
}

class Post extends Component {
    render() {
        dayjs.extend(relativeTime)
        const { classes, scream: {
                body,
                createdAt,
                userImage,
                userHandle,
                screamId,
                likeCount,
                commentCount
            },
            user: { authenticated, credentials: { handle } }
        } = this.props;
        const deleteButton = authenticated && userHandle === handle ? (
            <DeletePost screamId={screamId}/>
        ) : null;

        return (
            <Card className={classes.card}>
                <Grid container spacing={1} justify="center" alignItems="center" >
                    <Grid item lg={3} xs={12} justify="center" alignItems="center" container>
                        <ButtonBase className={classes.image}>
                            <img className={classes.img} alt="Profile" src={userImage}/>
                        </ButtonBase>
                    </Grid>
                    <Grid item lg={9} xs={12}>
                        <CardContent className={classes.content}>
                            <Typography variant="h5"component={Link} to={`/users/${userHandle}`} color="primary" >{userHandle}</Typography>
                            {deleteButton}
                            <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                            <Typography variant="body1">{body}</Typography>
                            <LikeButton screamId={screamId} />
                            <span>{likeCount} Likes</span> 
                            <MyButton tip="comments" onClick={this.props.openDialog}>
                                <AddCommentRoundedIcon color="primary"></AddCommentRoundedIcon>
                            </MyButton>
                            <span>{commentCount} comments</span>
                            <PostDialog screamId={screamId} userHandle={userHandle} openDialog={this.props.openDialog}/>
                        </CardContent>
                    </Grid>
                </Grid>
            </Card>
        )
    }
}

Post.propTypes ={
    user: PropTypes.object.isRequired,
    scream: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    openDialog: PropTypes.object,
};

const mapStateToProps = (state) => ({
    user: state.user,
});


export default connect(mapStateToProps)(withStyles(styles)(Post));
