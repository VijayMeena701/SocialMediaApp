import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import MyButton from "../../utils/MyButton";
import { Link } from "react-router-dom";
import { logoutUser } from '../../redux/actions/userActions';
import Notifications from "./Notifications";

//importing material-ui Stuff
import Appbar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
//Icons Importing
import HomeIcon from "@material-ui/icons/Home";
import PowerSettingsNewRoundedIcon from '@material-ui/icons/PowerSettingsNewRounded';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import AddPost from '../post/AddPost';


class Navbar extends Component {
    handleLogOut = () => {
        this.props.logoutUser();
    }
    reloadPage = () => {
        const userhandle = this.props.user.credentials.handle;
        const path = {
            pa: `/users/${userhandle}`
        };
        window.location.assign(path.pa);
    }
    render() {
        const { authenticated } = this.props;
        const { credentials:{handle} } = this.props.user;
        return (
            <Appbar position='sticky'>
                <Toolbar className="nav-container">
                    { authenticated ? (
                        <Fragment>
                            <div>
                            <Link to="/">
                                <MyButton tip="Home" >
                                    <HomeIcon color="secondary"></HomeIcon>
                                </MyButton>
                            </Link>
                            <Link to={`/users/${handle}`}>
                                <MyButton tip="My Profile" onClick={this.reloadPage}>
                                    <PersonRoundedIcon color="secondary"></PersonRoundedIcon>
                                </MyButton>
                            </Link>
                            </div>
                            <div>
                                <Notifications/>
                                <AddPost/>
                                <MyButton tip="Logout" btnClassName="logoutbutton" onClick={this.handleLogOut}>
                                    <PowerSettingsNewRoundedIcon color="secondary"></PowerSettingsNewRoundedIcon>
                                </MyButton>
                            </div>
                        </Fragment>
                    ) :(
                        <Fragment>
                            <Button color='inherit' component = {Link} to= '/' >Home</Button>
                            <div>
                                <Button color='inherit' component = {Link} to= '/login' >SignIn</Button>
                                <Button color='inherit' component = {Link} to= '/signup' >Signup</Button>
                            </div>
                        </Fragment>
                    )}
                </Toolbar>
            </Appbar>
        )
    }
}

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    logoutUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    authenticated: state.user.authenticated,
    user: state.user
});

const mapActionsToProps = { logoutUser };

export default connect(mapStateToProps, mapActionsToProps)(Navbar);
