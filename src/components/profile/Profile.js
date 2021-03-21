import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from "react-router-dom";
import dayjs from 'dayjs';
import EditDetails from './EditDetails';
import Fade from '@material-ui/core/Fade';

//Material UI Stuff
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MuiLink from '@material-ui/core/Link';
import Tooltip from '@material-ui/core/Tooltip';

//Redux Stuff
import { connect } from 'react-redux';
import { logoutUser, uploadImage } from '../../redux/actions/userActions';

//Import Material_UI Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import { CircularProgress, IconButton, Paper } from '@material-ui/core';
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
    },
    advancedProfileDetails:{
        button: {
            left: "20%"
        }
    },
    socialLinks: {
        display: 'flex',
        justifyContent: 'space-around'
    },
    seperateClass: {
        border: '1px #9f9f9f solid',
        width: '100%'
    },
    facebookcolor:{
        color: '#4267B2'
    },
    twittercolor: {
        color: '#1DA1F2'
    },
    instagramcolor: {
        background: 'linear-gradient(to bottom, #405DE6, #5851DB, #833AB4, #C13584, #E1306C, #FD1D1D, #F56040, #F77737, #FCAF45, #FFDC80)',
    }
});

class Profile extends Component {

    handleImageChange = (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append("image", image, image.name);
        this.props.uploadImage(formData);
    };DeletePost
    handleEditImage = () => {
        const fileInput = document.getElementById('imageFile');
        fileInput.click();
    };
    handleLogOut = () => {
        this.props.logoutUser();
    }
    render() {
        const { classes, user:{ credentials: {
                                        handle,
                                        createdAt,
                                        imageUrl,
                                        bio,
                                        website,
                                        location,
                                        facebookProfile,
                                        instagramProfile,
                                        twitterProfile
                                    },
                                    loading,
                                    authenticated
                                } } = this.props;
        let profileMarkup = !loading ? (authenticated ? (
            <Fragment>
                <Fade in={!loading} timeout={1000}>
                    <Paper className={classes.paper}>
                        <div className={classes.profile}>
                            <div className="image-wrapper">
                                <img src={imageUrl} alt="profile" className="profile-image" />
                                <input type="file" id="imageFile" onChange={this.handleImageChange} hidden="hidden"/>
                                <Tooltip title="Change Profile Picture" placement="top">
                                <IconButton onClick={this.handleEditImage} className="button">
                                    <AddAPhotoIcon color="primary"></AddAPhotoIcon>
                                </IconButton>
                                </Tooltip>
                                <Tooltip title="Logout" placement="top">
                                <IconButton onClick={this.handleLogOut} className="logoutbutton">
                                    <PowerSettingsNewRoundedIcon color="primary"></PowerSettingsNewRoundedIcon>
                                </IconButton>
                            </Tooltip>
                            </div>
                            <hr></hr>
                            <div className="profile-details">
                                <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5" >@{handle}</MuiLink>
                                <hr/>
                { bio && <Typography variant={"body2"}>{bio}</Typography>}
                <hr></hr>
                {location && (
                    <Fragment>
                        <LocationOn color="primary"/> <span>{location}</span>
                    <hr></hr>
                    </Fragment>
                )}
                {website && (
                    <Fragment>
                        <LinkIcon color="primary"/> <span><a href={website} target= "_blank" rel="noopener noreferrer">
                {''}{website}</a></span>
                <hr></hr>
                    </Fragment>
                )}
                <CalendarToday color="primary"/> {''} <span>Joined: <span>{dayjs(createdAt).format('D MMM YYYY')}</span></span>
                            </div>
                            <br/>
                            <div className={classes.socialLinks}>
                                {facebookProfile &&
                                <Tooltip title="Facebook" placement="top">
                                    <a className={classes.linkTextStyles} href={`https://www.facebook.com/${facebookProfile}`} target= "_blank" rel="noopener noreferrer" ><FacebookIcon className={classes.facebookcolor} fontSize="large"></FacebookIcon></a>
                                </Tooltip>
                                }
                                {twitterProfile &&
                                <Tooltip title="Facebook" placement="top">
                                    <a className={classes.linkTextStyles} href={`https://www.twitter.com/${twitterProfile}`} target= "_blank" rel="noopener noreferrer" ><TwitterIcon fontSize="large" className={classes.twittercolor}></TwitterIcon></a>
                                </Tooltip>
                                }
                                {instagramProfile &&
                                <Tooltip title="Facebook" placement="top">
                                    <a className={classes.linkTextStyles} href={`https://www.instagram.com/${instagramProfile}`} target= "_blank" rel="noopener noreferrer" ><InstagramIcon fontSize="large" className={classes.instagramcolor}></InstagramIcon></a>
                                </Tooltip>
                                }
                            </div>
                            <br></br>
                            <div className={classes.seperateClass}/>
                            <div className="">
                                <Tooltip title="Advanced Profile Details" placement="top">
                                    <IconButton className={classes.advancedProfileDetails} component={Link} to={`/users/${handle}/about`}>
                                        <AccountCircleRoundedIcon color="primary"></AccountCircleRoundedIcon>
                                    </IconButton>
                                </Tooltip>
                            <EditDetails/>
                            </div>
                        </div>
                    </Paper>
                </Fade>
            </Fragment>
        ) : (
            <Paper className={classes.paper}>
                <Typography variant="body2" align="center"> Login To See Your Profile </Typography>
                <div className={classes.buttons}>
                    <Button variant="contained" color="primary" component={Link} to="/login" >Login</Button>
                    <Button variant="contained" color="secondary" component={Link} to="/signup" >Signup</Button>
                </div>
            </Paper>
        ) ) : (
            <Fragment>
                <div className={classes.circularProgressBar}>
                <Fade in={loading} timeout={100}>
                    <CircularProgress size={100}></CircularProgress>
                </Fade>
                </div>
            </Fragment>
        )
        return profileMarkup;
    }
}

Profile.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionsToProps = { logoutUser, uploadImage };

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile));