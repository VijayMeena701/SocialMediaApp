import React, { Component, Fragment } from 'react';
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import dayjs from "dayjs";
import Paper from "@material-ui/core/Paper";
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/Button";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import EditDetails from "./EditDetails";



//Material UI Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/userActions"
import PowerSettingsNewRoundedIcon from '@material-ui/icons/PowerSettingsNewRounded';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';


const styles = (theme) => ({
    paper: {
        padding: 20
    },
    profile: {
        '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative',
            '& button': {
                position: 'absolute',
                top: '85%',
                left: '75%'
            },
            '& .logoutbutton': {
                position: 'absolute',
                top: '85%',
                left: '5%'
            }
        },
        '& .profile-image': {
            width: 200,
            height: 200,
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%'
        },
        '& .profile-details': {
            textAlign: 'center',
            '& span, svg': {
                verticalAlign: 'middle'
            },
            '& a': {
                color: theme.palette.primary.main
            }
        },
        '& hr' : {
            border: 'none',
            margin: '0 0 10px 0'
        },
        '& svg.button' : {
            '&:hover' : {
                cursor : 'pointer'
            }
        }
    },
    buttons: {
        textAlign: 'center',
        '& a': {
            margin: '20px 10px'
        }
    },
    circularProgressBar:{
        display: "flex",
        width: "100%",
        height: "100vh",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center"
    }
});


class StaticProfile extends Component {
    handleLogOut = () => {
        this.props.logoutUser();
    }
    render(){
    const { classes, profile: { handle, location, website, bio, createdAt, imageUrl }, user:{authenticated, credentials}} = this.props;
    return (
        <Fragment>
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img src={imageUrl} alt="profile" className="profile-image" />
                        { (authenticated && credentials.handle=== handle) && (<div>
                            <input type="file" id="imageFile" onChange={this.handleImageChange} hidden="hidden"/>
                            <Tooltip title="Change Profile Picture" placement="top">
                                <IconButton onClick={this.handleEditImage} className="button">
                                    <AddAPhotoIcon color="primary"></AddAPhotoIcon>
                                </IconButton>
                            </Tooltip>
                            </div>)
                        }
                        { (authenticated && credentials.handle=== handle) && (<Tooltip title="Logout" placement="top">
                            <IconButton onClick={this.handleLogOut} className="logoutbutton">
                                <PowerSettingsNewRoundedIcon color="primary"></PowerSettingsNewRoundedIcon>
                            </IconButton>
                        </Tooltip>)}
                    </div>
                    <hr></hr>
                    <div className="profile-details">
                        <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5" >@{handle}</MuiLink>
                        <hr/>
                        { bio && <Typography variant="body2">{bio}</Typography>}
                        <hr />
                        {location && (
                            <Fragment>
                                <LocationOn color="primary"/> <span>{location}</span>
                            <hr/>
                            </Fragment>
                        )}
                        {website && (
                            <Fragment>
                                <LinkIcon color="primary"/> <span><a href={website} target= "_blank" rel="noopener noreferrer">
                                {''}{website}</a></span>
                                <hr />
                            </Fragment>
                        )}
                        <CalendarToday color="primary"/> {''} <span>Joined: <span>{dayjs(createdAt).format('D MMM YYYY')}</span></span>
                    </div>
                                <Tooltip title="Advanced Profile Details" placement="top">
                                    <IconButton className="advancedProfileDetails" component={Link} to={`/users/${handle}/about`}>
                                        <AccountCircleRoundedIcon color="primary"></AccountCircleRoundedIcon>
                                    </IconButton>
                                </Tooltip>
                        {(authenticated && credentials.handle=== handle) && <EditDetails/>}
                </div>
            </Paper>
        </Fragment>
    )
}}

StaticProfile.propTypes = {
    classes: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionsToProps = {
    logoutUser
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(StaticProfile));