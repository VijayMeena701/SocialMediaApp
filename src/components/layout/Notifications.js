import React, { Component, Fragment } from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Grid from "@material-ui/core/Grid";


//Importing MaterialUi Stuff
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import Box from "@material-ui/core/Box";

//Import Icons
import NotificationsIcon from "@material-ui/icons/Notifications";
import ThumbUpAltRoundedIcon from '@material-ui/icons/ThumbUpAltRounded';
import CommentRoundedIcon from '@material-ui/icons/CommentRounded';
//Import Redux
import {connect } from "react-redux";
import { markNotificationsRead } from "../../redux/actions/userActions";
import { IconButton } from '@material-ui/core';

const styles = (theme) => ({
    ...theme.spreadThis,
    profileContainer:{
        position: "relative"
    },
    profileImage: {
        width: 50,
        height: 50,
        marginLeft: "auto",
        marginRight: "auto",
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
        borderRadius: "50%",
    },
    icon: {
        position: "absolute",
        top: "65%",
        right: "0%"
    }
})

class Notifications extends Component {
    state = {
        anchorEl: null
    }
    handleOpen = (event) => {
        this.setState({ anchorEl: event.target})
    };
    handleClose = () => {
        this.setState({ anchorEl: null });
    }
    onMenuOpen = () => {
        let unreadNotificationsIds = this.props.notifications.filter(notif => !notif.read ).map(not => not.notificationId);
        this.props.markNotificationsRead(unreadNotificationsIds);
    }
    render() {
        dayjs.extend(relativeTime);
        const classes = this.props.classes;
        const notifications = this.props.notifications;
        const anchorEl = this.state.anchorEl;
        let typeOfNotification;
        if(notifications && notifications.length > 0) {
            notifications.filter( notific => notific.read === false).length > 0 ? (
                typeOfNotification = (
                    <Badge badgeContent={notifications.filter( notific => notific.read === false).length}
                    color="secondary">
                        <NotificationsIcon color="secondary"/>
                    </Badge>
                )
            ) : ( typeOfNotification = (
            <Fragment>
                <Badge badgeContent="0" color="secondary">
                    <NotificationsIcon/>
                </Badge>
            </Fragment>) )
        } else {
            typeOfNotification = <NotificationsIcon></NotificationsIcon>
        }

        let notificationsMarkup = notifications && notifications.length > 0 ? (
            notifications.map(notific => {
                const type  = notific.type === "like" ? ("Liked") : ("Commented on");
                const time = dayjs(notific.createdAt).fromNow();
                const iconColor = notific.read === true ? "secondary" : "primary" ;
                const textColor = notific.read === true ? "textSecondary" : "textPrimary";
                const invisible = notific.read === true ? true : false ;
                const iconType = notific.type === "like" ? (
                    <ThumbUpAltRoundedIcon  color={iconColor}/>
                ): (
                    <CommentRoundedIcon color={iconColor}/>
                )
                return (
                    <MenuItem key={notific.createdAt} onClick={this.handleClose}>
                        <Grid container spacing={2} component={Link} to={`/users/${notific.recepient}/post/${notific.screamId}`}>
                            <Grid item xs={3}>
                                <div className={classes.profileContainer}>
                                    <div className={classes.profileImage}>
                                        <img src={notific.senderImage} className={classes.img} alt="Profile_Pic"/>
                                    </div>
                                    <div className={classes.icon}>
                                        {iconType}
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography color={textColor} variant="body1">
                                        <b>{notific.sender}</b><span>&nbsp;</span>
                                    <span>{ type } <span>your Post</span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    <Typography variant="body1">
                                        <Box fontSize={12}>
                                        <Badge color="secondary" variant="dot" invisible={invisible}></Badge>
                                        &nbsp;&nbsp;&nbsp;<span>{time}</span>
                                        </Box>
                                    </Typography>
                                </Typography>
                            </Grid>
                        </Grid>
                    </MenuItem>
                )
            })
        ) : (
            <MenuItem onClick={this.handleClose}>
                <p>You dont have any Notifications yet</p>
            </MenuItem>
        )
        return (
            <Fragment>
                <Tooltip title="Notifications">
                    <IconButton aria-owns={anchorEl ? 'long-menu': undefined} aria-haspopup="true" onClick={this.handleOpen}>
                        {typeOfNotification}
                    </IconButton>
                </Tooltip>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose} onEntered={this.onMenuOpen}>
                    {notificationsMarkup}
                </Menu>
            </Fragment>
        )
    }
};

Notifications.propTypes = {
    markNotificationsRead: PropTypes.func.isRequired,
    notifications: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    notifications: state.user.notifications
});

const mapActionsToProps = {
    markNotificationsRead,
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Notifications));
