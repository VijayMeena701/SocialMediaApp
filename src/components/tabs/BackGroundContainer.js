import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import CameraAltRoundedIcon from '@material-ui/icons/CameraAltRounded';
import withStyles from "@material-ui/core/styles/withStyles";
import { uploadImage } from "../../redux/actions/userActions";

const styles = (theme) => ({
    ...theme.spreadThis,
    section1: {
        width: "100%",
        height: "400px"
    },
    backgroundImgContainer: {
        width: "100%",
        height: "100%"
    },
    backgroundImg:{
        position: "relative",
        display: "block",
        width: "100%",
        height: "100%",
        borderRadius: "0 0 10px 10px"
    },
    userImageContainer: {
        position: "absolute",
        display: "block",
        bottom: "30%",
        left: "50%",
        transform: `translate(${-50}%, ${50}%)`,
        width: "100%",
    },
    userImage: {
        display: "block",
        width: "180px",
        height: "180px",
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: "50%",
        border: "5px solid #fff"
    },
    changeProfilePic : {
        display: "block",
        position: "absolute",
        top: "50%",
        left:"50%",
    },
    cameraButton: {
        display: "block",
        left: "50px",
        top: "40px",
        backgroundColor: "lightsteelblue"
    }
})

class BackGroundContainer extends Component {
    handleImageChange = (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append("image", image, image.name);
        this.props.uploadImage(formData);
    };
    handleEditImage = () => {
        const fileInput = document.getElementById('imageFile');
        fileInput.click();
    };
    render() {
        const {classes, profile: {imageUrl, handle} } = this.props;
        const authenticated = this.props.visitinguser.authenticated;
        const visitinguserHandle = this.props.visitinguser.credentials.handle;
        return (
            <div className={classes.section1}>
                <div className={classes.backgroundImgContainer}>
                    <img className={classes.backgroundImg} src="https://source.unsplash.com/random/1366x768" alt="Profile-Background"></img>
                </div>
                <div className={classes.userImageContainer}>
                    <img className={classes.userImage} src={imageUrl} alt="ProfileImg"></img>
                    { authenticated ? visitinguserHandle === handle ? (
                        <div className={classes.changeProfilePic}>
                            <input type="file" id="imageFile" onChange={this.handleImageChange} hidden="hidden"/>
                            <Tooltip title="Change Profile Picture" placement="top">
                                <IconButton onClick={this.handleEditImage} className={classes.cameraButton}>
                                    <CameraAltRoundedIcon color="primary"></CameraAltRoundedIcon>
                                </IconButton>
                            </Tooltip>
                        </div>
                    ): null :
                        null
                    }
                </div>
            </div>
        )
    }
}

BackGroundContainer.propTypes = {
    classes: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    visitinguser: PropTypes.object.isRequired,
    uploadImage: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    visitinguser: state.user
});

const mapActionsToProps = {
    uploadImage
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(BackGroundContainer));
