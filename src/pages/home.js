import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Post from "../components/post/Post";
import Container from '@material-ui/core/Container';
import Profile from '../components/profile/Profile';
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

import { connect } from "react-redux";
import { getPosts } from "../redux/actions/dataActions";
import CircularProgess from "@material-ui/core/CircularProgress";
import Copyright from "../components/Copyright";
import Box from "@material-ui/core/Box";

const styles = (theme) => ({
    ...theme.spreadThis,
    profileGrid: {
        position: "absolute",
        overflow: "hidden"
    },
    circularProgess: {
        position: "relative",
        display: "flex",
        width: "100%",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center"
    }
})

class home extends Component {
    componentDidMount(){
        this.props.getPosts();
    }
    render() {
        const { screams, loading } = this.props.data;
        const { classes } = this.props;
        let recentScreamsMarkUp = !loading ? (
        screams.map((scream) => <Post key={scream.screamId} scream={scream}/>)
        ): (
            <div className={classes.circularProgess}>
                <CircularProgess size={200} thickness={2}/>
            </div>
        )
        return (
            <Container>
                <div>
                <Grid container spacing={1}>
                    <Grid item sm={4} xs={12} className="profileGrid">
                        <Profile/>
                    </Grid>
                    <Grid item sm={8} xs={12}>
                        {recentScreamsMarkUp}
                    </Grid>
                </Grid>
                </div>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Container>    
        )
    }
}
home.propTypes = {
    getPosts: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    data: state.data,
})

export default connect(mapStateToProps, { getPosts })(withStyles(styles)(home));