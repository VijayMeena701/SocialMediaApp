import React, { Component, Fragment } from 'react';
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

//Material Ui Stuff
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import SendIcon from '@material-ui/icons/Send';

//Redux Stuff
import { connect } from "react-redux";
import { submitComment } from "../../redux/actions/dataActions";

const styles = (theme) => ({
    ...theme.spreadThis,
})

class CommentForm extends Component {
    state = {
        body: "",
        errors: {}
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({errors: nextProps.UI.errors });
        }
        if(!nextProps.UI.errors && !nextProps.UI.loading){
            this.setState({ body: ""});
        }
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value })
    };
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.submitComment(this.props.screamId, {body: this.state.body})
    }

    render() {
        const { classes, authenticated } = this.props;
        const errors = this.state.errors;

        const commentFormMarkup = authenticated ? (
            <Fragment>
                <Grid item sm ={12} style={{textAlign: 'center'}} >
                    <form onSubmit={this.handleSubmit}>
                        <Grid container >
                            <Grid item sm={10}>
                            <TextField name="body" type="text" label="Comment on Post" error={errors.comment ? true: false} helperText={errors.comment} value={this.state.body} onChange={this.handleChange} fullWidth className={classes.textField}/>
                            </Grid>
                            <Grid item sm={2}>
                                <Button type="submit" variant="text" color="primary">
                                    <SendIcon color="secondary"/>
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Fragment>
        ) : null;
        return commentFormMarkup;
    }
}

CommentForm.propTypes = {
    submitComment: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired,
    authenticated: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
    UI: state.UI,
    authenticated: state.user.authenticated
})
const mapActionsToProps = {
    submitComment
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(CommentForm))
