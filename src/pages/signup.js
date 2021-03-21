import React, { Component } from 'react'
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import withStyles from "@material-ui/core/styles/withStyles";
import CircularProgess from "@material-ui/core/CircularProgress"
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';

const styles = {
        paper: {
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        },
        avatar: {
          margin: 1,
          backgroundColor: "secondary",
        },
        form: {
          width: '100%', // Fix IE 11 issue.
          marginTop: 1,
        },
        submit: {
          margin: "3 0 2",
        },
        customError: {
            color: 'red',
            fontSize: '0.8rem',
            margin: "5px auto 5px auto",
            textAlign: "center"
        },progress: {
            position: 'absolute',
            color: 'black'
        }
};
export class signup extends Component {
    constructor(){
        super();
        this.state={
            email: "",
            password: "",
            confirmPassword:'',
            handle: '',
            errors: {}
        }
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.UI.errors) {
            this.setState({
                errors: nextProps.UI.errors
            })
        }
    };
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading:true
        });
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        }
        this.props.signupUser(newUserData, this.props.history)
    }
    
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    render() {
        const { classes, UI:{ loading } } = this.props;
        const { errors } = this.state;
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                    <PersonAddOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                    Sign Up
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        type="email"
                        autoComplete="email"
                        autoFocus
                        value = {this.state.email}
                        onChange= {this.handleChange}
                        helperText ={errors.email}
                        error = { errors.email ? true : false }
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={this.state.password}
                        onChange = { this.handleChange }
                        helperText ={errors.password}
                        error = { errors.password ? true : false }
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="ConfirmPassword"
                        type="password"
                        id="confirmPassword"
                        autoComplete="current-password"
                        value={this.state.confirmPassword}
                        onChange = { this.handleChange }
                        helperText ={errors.confirmPassword}
                        error = { errors.confirmPassword ? true : false }
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="handle"
                        label="Handle"
                        type="text"
                        id="handle"
                        value={this.state.handle}
                        onChange = { this.handleChange }
                        helperText ={errors.handle}
                        error = { errors.handle ? true : false }
                    />
                    {errors.general && (
                        <Typography variant="body2" color="secondary" className={classes.customError}>
                            {errors.general}
                        </Typography>
                    )}
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled = { loading }
                    >
                        Sign Up { loading && (
                            <CircularProgess size={20} className={classes.progress} />
                        )}
                    </Button>
                    <Grid container>
                        <Grid item xs>
                        <Link href="#" variant="body2">
                            Forgot password?
                        </Link>
                        </Grid>
                        <Grid item>
                        <Link href="/login" variant="body2">
                            {"Already have have an account? Sign In"}
                        </Link>
                        </Grid>
                    </Grid>
                    </form>
                </div>
                {/* <Box mt={8}>
                    <Copyright />
                </Box> */}
            </Container>
        )
    }
}

signup.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

export default connect(mapStateToProps, { signupUser })(withStyles(styles)(signup));
