import React, { Component, Fragment } from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import axios from "axios";
import Post from "../components/post/Post";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Copyright from "../components/Copyright";
import StaticProfile from "../components/profile/StaticProfile";

import { connect } from "react-redux";
import {getuser} from "../redux/actions/dataActions";
import { CircularProgress } from '@material-ui/core';

const styles = (theme) => ({
    ...theme.spreadThis,
    circularProgress: {
        margin: "auto",
        display: "flex",
        width: "100%",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center"
    },
});

class user extends Component {
    state = {
        profile: null,
        postIdParam: null,
    }
    componentDidMount() {
        const handle = this.props.match.params.handle;
        const postId = this.props.match.params.postId;
        if(postId) this.setState({postIdParam: postId});
        this.props.getuser(handle);
        axios.get(`/user/${handle}`).then(res => {
            this.setState({
                profile: res.data.user
            })
        }).catch(err => {
            console.log(err);
        });
    };
    render() {
        const { screams, loading } = this.props.data;
        const {authenticated, credentials:{handle}} = this.props.userData;
        const userhandle = this.props.match.params.handle;
        const { classes } = this.props;
        const { postIdParam } = this.state;
        const screamsMarkup = loading ? (
            <Fragment>
                <div className={classes.circularProgress}>
                    <CircularProgress color="primary" size={200}></CircularProgress>
                </div>
            </Fragment>
        ) : screams === null ? (
            <Fragment>
                <Grid item>
                    <Grid item sm={8}>
                        {(authenticated && (userhandle === handle)) ? 
                            <p>You Havent Posted Anything yet.</p>
                        :<p>No Posts Uploaded by User</p> }
                    </Grid>
                </Grid>
            </Fragment>
        ) :!postIdParam ? (
            screams.map(scream => <Post key={scream.screamId} scream={scream}/>)
        ): (screams.map(scream => {
            if(scream.screamId !== postIdParam)
            return <Post key={scream.screamId} scream={scream}/>
            else 
                return <Post key={scream.screamId} scream={scream} openDialog/>
        }));
        return (
            <Container>
                <div>
                <Grid container spacing={1}>
                    <Grid item sm={4} xs={12} className="profileGrid">
                        {this.state.profile === null ? (
                            <Fragment>
                                <p>Loading Profile...</p>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <StaticProfile profile={this.state.profile}/>
                            </Fragment>
                        )}
                    </Grid>
                    <Grid item sm={8} xs={12}>
                        {screamsMarkup}
                    </Grid>
                </Grid>
                </div>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Container> 
        )
    }
};

user.propTypes = {
    classes: PropTypes.object.isRequired,
    getuser: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    userData: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    data: state.data,
    userData: state.user
})

export default connect(mapStateToProps, { getuser })(withStyles(styles)(user));