import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import VerticalTabs from "../components/tabs/VerticalTabs";
import axios from "axios";

//Material Ui Stuff
import Grid from "@material-ui/core/Grid";
import Copyright from '../components/Copyright';
import VerticalNewTabs from '../components/tabs/VerticalNewTabs';
import BackGroundContainer from '../components/tabs/BackGroundContainer';
import './about.css';


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
    },
    gridStyleforbgImage: {
        backgroundImage: "linear-gradient(to bottom, #648da1, #cfd2d4, rgb(245,245,245))",
    }
})

class About extends Component {
    state = {
        profile: null
    };
    componentDidMount() {
        const handle = this.props.match.params.handle;
        axios.get(`/user/${handle}`).then(res => {
            this.setState({
                profile: res.data.user
            })
        }).catch(err => {
            console.log(err);
        });
    };
    render() {
        const { classes } = this.props;
        const { loading, authenticated } = this.props.user;
        const visitinguserHandle = this.props.match.params.handle;
        const profile = this.state.profile;
        const { credentials: {handle}} = this.props.user;
       
        let aboutMarkup = !loading ? ( !authenticated ? (
            <Fragment>
                <p></p>
            </Fragment>
        ) : ( visitinguserHandle === handle ? (
            <Fragment>
                <VerticalTabs></VerticalTabs>
            </Fragment>
        ): (
            <Fragment>
                {this.state.profile === null ? (
                        <Fragment>
                            <p>Loading profile</p>
                        </Fragment>
                    ) : (
                        <VerticalNewTabs profile={profile}></VerticalNewTabs>
                    )
                }
            </Fragment>
        )
        )) : (
            <Fragment>
                <p>Loading Profile</p>
            </Fragment>
        )
        return (
            <Fragment>
                <section className={classes.section1}>
                    <Grid container spacing={2} className={classes.gridStyleforbgImage}>
                        <Grid item sm={1}/>
                        <Grid item sm={10}>
                            {this.state.profile === null ? (
                                <Fragment>
                                    <div className="fullpage-wrapper">
                                    <div className="reactor-container">
                                        <div className="reactor-container-inner circle abs-center"></div>
                                        <div className="tunnel circle abs-center"></div>
                                        <div className="core-wrapper circle abs-center"></div>
                                        <div className="core-outer circle abs-center"></div>
                                        <div className="core-inner circle abs-center"></div>
                                        <div className="coil-container">
                                        <div className="coil coil-1"></div>
                                        <div className="coil coil-2"></div>
                                        <div className="coil coil-3"></div>
                                        <div className="coil coil-4"></div>
                                        <div className="coil coil-5"></div>
                                        <div className="coil coil-6"></div>
                                        <div className="coil coil-7"></div>
                                        <div className="coil coil-8"></div>
                                        </div>
                                    </div>
                                    </div>
                                </Fragment>
                            ) : (
                                <BackGroundContainer profile={profile}></BackGroundContainer>
                            )}
                        </Grid>
                        <Grid item sm={1}/>
                    </Grid>
                </section>
                <section>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <Grid container spacing={2}>
                        <Grid item sm={1}/>
                        <Grid item sm={10}>
                           {aboutMarkup}
                        </Grid>
                    </Grid>
                </section>
                <section>
                    <br></br>
                    <br></br>
                    <Copyright/>
                </section>
            </Fragment>
        )
    }
}
About.propTypes ={
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

export default connect(mapStateToProps)(withStyles(styles)(About));
