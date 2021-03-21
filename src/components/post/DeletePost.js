import React, { Component, Fragment } from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import MyButton from "../../utils/MyButton";

//Material UI stuff

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogContent from '@material-ui/core/DialogContent';

//Icons
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
//Redux
import { connect } from "react-redux";
import { deletePost } from "../../redux/actions/dataActions";

const styles = {
    deleteButton: {
        position: "absolute",
        right: "5%"
    }
}

class DeletePost extends Component {
    state = {
        open: false
    };
    handleOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.setState({ open: false });
    };
    deletePost = () => {
        this.props.deletePost(this.props.screamId);
        this.setState({ open: false });
    };
    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <MyButton tip="Delete" onClick={this.handleOpen} btnClassName={classes.deleteButton}>
                    <DeleteForeverIcon></DeleteForeverIcon>
                </MyButton>
                <Dialog open={ this.state.open } onClose={ this.handleClose } fullWidth maxWidth="sm">
                    <DialogTitle>Delete Post?</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are You Sure to Delete the Post? All comments and likes related to the post will be lost.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" size="small" onClick={this.handleClose} color="primary" endIcon={<CloseIcon />}>
                            Cancel
                        </Button>
                        <Button variant="contained" size="small" onClick={this.deletePost} color="secondary" startIcon={<DeleteIcon />}>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

DeletePost.propTypes = {
    deletePost: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired
}



export default connect(null, { deletePost })(withStyles(styles)(DeletePost));
