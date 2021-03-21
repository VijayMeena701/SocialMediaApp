import React, { Component, Fragment } from 'react';
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../utils/MyButton";
//importing material-ui Stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import LinearProgress from "@material-ui/core/LinearProgress";
import AddIcon from "@material-ui/icons/Add";
import CancelIcon from '@material-ui/icons/Cancel';

//Redux Stuff
import { connect } from 'react-redux';
import { addPost, clearErrors } from "../../redux/actions/dataActions";

const styles = (theme) =>  ({
    ...theme.spreadThis,
    submitButton: {
        position: "relative",
        float: "right",
        marginTop: 10
    },
    closeButton: {
        position: "absolute",
        right: "2%",
        top: "5%"
    }
})

class AddPost extends Component {
    state = {
        open: false,
        body: '',
        errors: {}
    };
    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({ errors: nextProps.UI.errors});
        }
        if(!nextProps.UI.errors && !nextProps.UI.loading){
            this.setState({body: '', open: false, errors: {}});
        }
    };
    handleOpen = () => {
        this.setState({ open: true })
    };
    handleClose = () => {
        this.props.clearErrors();
        this.setState({ open: false })
    };
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    };
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.addPost({ body: this.state.body });
    }
    render() {
        const { errors } = this.state;
        const { classes, UI: { loading }} = this.props;
        return (
            <Fragment>
                <MyButton tip="Add Post" onClick={this.handleOpen}>
                    <AddIcon color="secondary"></AddIcon>
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                     <MyButton tip="Cancel" onClick={this.handleClose} tipClassName={classes.closeButton}>
                         <CancelIcon color="primary"></CancelIcon>
                     </MyButton>
                     <DialogTitle>Add a new Post</DialogTitle>
                     <DialogContent>
                         <form onSubmit={this.handleSubmit}>
                            <TextField name="body" type="text" label="Post!!!" multiline rows="3" fullWidth placeholder="...Post!!!" error={errors.body ? true: false} helperText={errors.body} className={classes.TextField} onChange={this.handleChange} />
                            <Button variant="contained" type="submit" color="primary" disabled={loading} className={classes.submitButton}> Post</Button>
                            {loading && (
                                    <LinearProgress color="primary" variant="indeterminate" ></LinearProgress>
                            )}
                         </form>
                     </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

AddPost.propTypes = {
    addPost: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    UI: state.UI
});

export default connect( mapStateToProps, { addPost, clearErrors })(withStyles(styles)(AddPost));
