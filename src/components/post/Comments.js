import React, { Component, Fragment } from 'react';
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from 'react-router-dom';
import dayjs from "dayjs";

//MUI stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

//Redux
// import { connect } from "react-redux";


const styles = (theme) => ({
    ...theme.spreadThis,
    commentImage: {
        maxWidth: "100px",
        objectFit: "cover",
        borderRadius: "50%",
    },
    invisibleSeperator: {
        border: "none",
        margin: 2
    },
    visibleSeperator: {
        width: "100%",
        borderBottom: "1px solid rgba(0,0,0,0.1)",
        marginBottom: "20px"
    },
    commentData: {
        marginLeft: 20
    },
    commentImageContainer: {
        display: "flex",
        marginLeft: "auto",
        marginRight: "auto",
        textAlign:"middle"
    }
});

class Comments extends Component {
    render() {
        const { comments, classes } = this.props;
        return (
            <Grid container spacing={3}>
                {comments.map((comment, index) => {
                    const { body, createdAt, userImage, userHandle } = comment;
                    return(
                        <Fragment key={createdAt}>
                            <Grid item sm={12}>
                                <Grid container spacing={1}>
                                    <Grid item sm={2}className={classes.commentImageContainer} >
                                        <div className={classes.commentImageContainer}>
                                            <img src={userImage} alt="commentedBy" className={classes.commentImage}/>
                                        </div>
                                    </Grid>
                                    <Grid item sm={9}>
                                        <div className={classes.commentData}>
                                            <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary">@{userHandle}</Typography>
                                            <Typography variant="body2" color="textSecondary" >{dayjs(createdAt).format("h:mm a, MMM DD YYYY")}</Typography>
                                            <hr className={classes.invisibleSeperator}/>
                                            <Typography variant="body1">{body}</Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {
                                index !== comments.length -1 && (
                                    <hr className={classes.visibleSeperator}/>
                                )
                            }
                        </Fragment>
                    )
                })}
            </Grid>
        )
    }
}

Comments.propTypes = {
    classes: PropTypes.object.isRequired,
    comments: PropTypes.array.isRequired
}

export default withStyles(styles)(Comments);
