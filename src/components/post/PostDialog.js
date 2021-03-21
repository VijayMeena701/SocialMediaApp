import React, { Component, Fragment } from 'react';
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../utils/MyButton";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import Comments from "./Comments";
import CommentForm from "./CommentForm";


// Material UI Import Stuff
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

//Material UI Icons
import CloseIcon from "@material-ui/icons/CloseRounded";
import AddCommentRoundedIcon from "@material-ui/icons/AddCommentRounded"

//Redux
import { connect } from "react-redux";
import { getPost, clearErrors } from "../../redux/actions/dataActions";
import LikeButton from './LikeButton';

const styles = (theme) => ({
    ...theme.spreadThis,
        expandButton: {
            position: "relative",
            float: "right",
            margin: "auto"
        },
        invisibleSeperator: {
            border: "none",
            margin: 2
        },
        img: {
            maxWidth: 200,
            objectFit: 'cover',
            borderRadius: "50%",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto"
        },
        circularProgress: {
            textAlign: "center",

        },
        closeButton: {
            position: "absolute",
            right: "1%",
            top: "5%"
        },
        contentBox: {
            padding: 20,
            '&::webkit-scrollbar':{
                display: "none"
            }
        },
        visibleSeperator: {
            width: "100%",
            borderBottom: "1px solid rgba(0,0,0,0.1)",
            marginBottom: "20px"
        }
})

export class PostDialog extends Component {
    state = {
        open: false,
        oldPath: '',
        newPath: ''
    };
    componentDidMount(){
        if(this.props.openDialog){
            this.handleOpen();
        }
    }
    handleOpen = () => {
        let oldPath = window.location.pathname;

        const { userHandle, screamId } = this.props;
        const newPath = `/users/${userHandle}/post/${screamId}`;

        if(oldPath === newPath) oldPath = `/users/${userHandle}`;

        window.history.pushState(null,null,newPath);


        this.setState({ open: true, oldPath, newPath });
        this.props.getPost(this.props.screamId);
    };
    handleClose = () => {
        window.history.pushState(null,null, this.state.oldPath);
        this.setState({ open: false });
        this.props.clearErrors();
    };
    render() {
        const { classes, UI: { loading }, scream: {screamId, body, createdAt, likeCount, commentCount, userHandle, userImage, comments }} = this.props;
        const dialogMarkup = loading ? (
            <div className={classes.circularProgress}>
                <CircularProgress size={100} thickness={2} />
            </div>
        ) : (
            <Fragment>
                <Grid container >
                    <Grid item sm={5} xs={12} component={Link} to={`/users/${userHandle}`}>
                        <img className={classes.img} src={userImage} alt="Profile"/>
                    </Grid>
                    <Grid item sm={7} xs={12}>
                        <Typography component={Link} to={`/users/${userHandle}`} color="primary" variant="h5">
                            @{userHandle}
                        </Typography>
                        <hr className={classes.invisibleSeperator} />
                        <Typography variant="body2" color="textSecondary" > {dayjs(createdAt).format('h:mm a, MMM DD YYYY')} </Typography>
                        <hr className={classes.invisibleSeperator} />
                        <Typography variant="body1"> {body}</Typography>
                        <LikeButton screamId={screamId} />
                        <span>{likeCount} Likes</span>
                        <MyButton tip="comments">
                            <AddCommentRoundedIcon color="primary"></AddCommentRoundedIcon>
                        </MyButton>
                        <span>{commentCount} comments</span>
                    </Grid>
                    <hr className={classes.visibleSeperator}/>
                    <Comments comments={comments}/>
                    <CommentForm screamId={screamId}/>
                </Grid>
            </Fragment>
        );
        return (
            <Fragment>
                <MyButton tip="Expand" onClick={this.handleOpen} tipClassName={classes.expandButton}>
                    <ExpandMoreIcon color="primary"></ExpandMoreIcon>
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <MyButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}><CloseIcon></CloseIcon></MyButton>
                        <DialogContent className={classes.contentBox}>
                            {dialogMarkup}
                        </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
};

PostDialog.propTypes = {
    getPost: PropTypes.func.isRequired,
    userHandle: PropTypes.string.isRequired,
    screamId: PropTypes.string.isRequired,
    scream: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    scream: state.data.scream,
    user: state.user,
    UI: state.UI
});

const  mapActionToProps  = {
    getPost, clearErrors
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(PostDialog))
