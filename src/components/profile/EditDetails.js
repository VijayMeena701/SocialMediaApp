import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

//ReduX Stuff Importing
import { connect } from "react-redux";
import { editUserDetails } from "../../redux/actions/userActions";

//Material Ui Stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { IconButton, Tooltip } from "@material-ui/core";

//Icons Importing
import EditIcon from "@material-ui/icons/Edit";

const styles = (theme) => ({
	...theme.spreadThis,
	button: {
		left: "75%",
	},
});

class EditDetails extends Component {
	state = {
		bio: "",
		phone: "",
		school: "",
		university: "",
		currentlyStaysAt: "",
		relationshipStatus: "",
		instagramProfile: "",
		facebookProfile: "",
		twitterProfile: "",
		loveInterest: "",
		languages: "",
		familyMembersUserId: "",
		nickName: "",
		birthDate: "",
		website: "",
		location: "",
		open: false,
	};
	mapUserDetailsToState = (credentials) => {
		this.setState({
			bio: credentials.bio ? credentials.bio : "",
			phone: "",
			school: "",
			university: "",
			currentlyStaysAt: "",
			relationshipStatus: "",
			instagramProfile: "",
			facebookProfile: "",
			twitterProfile: "",
			loveInterest: "",
			languages: "",
			familyMembersUserId: "",
			nickName: "",
			birthDate: "",
			website: credentials.website ? credentials.website : "",
			location: credentials.location ? credentials.location : "",
		});
	};
	handleClickOpen = () => {
		this.setState({ open: true });
		this.mapUserDetailsToState(this.props.credentials);
	};

	handleClose = () => {
		this.setState({ open: false });
	};
	componentDidMount() {
		const { credentials } = this.props;
		this.mapUserDetailsToState(credentials);
	}
	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};
	handleSubmit = () => {
		const userDetails = {
			bio: this.state.bio,
			phone: this.state.phone,
			school: this.state.school,
			university: this.state.university,
			currentlyStaysAt: this.state.currentlyStaysAt,
			relationshipStatus: this.state.relationshipStatus,
			instagramProfile: this.state.instagramProfile,
			facebookProfile: this.state.facebookProfile,
			twitterProfile: this.state.twitterProfile,
			loveInterest: this.state.loveInterest,
			languages: this.state.languages,
			familyMembersUserId: this.state.familyMembersUserId,
			nickName: this.state.nickName,
			birthDate: this.state.birthDate,
			website: this.state.website,
			location: this.state.location,
		};
		this.props.editUserDetails(userDetails);
		this.handleClose();
	};

	render() {
		const { classes } = this.props;
		return (
			<Fragment>
				<Tooltip title="Edit Details" placement="top">
					<IconButton onClick={this.handleClickOpen} className={classes.button}>
						<EditIcon color="primary"></EditIcon>
					</IconButton>
				</Tooltip>
				<Dialog open={this.state.open} onClose={this.handleClose}>
					<DialogTitle id="form-dialog-title">Update Profile</DialogTitle>
					<DialogContent>
						<DialogContentText>
							Help people discover your account by using the name you're known
							by: either your full name, nickname, or business name.
						</DialogContentText>
						<form>
							<TextField
								name="bio"
								type="text"
								label="Bio"
								multiline
								rows="3"
								placeholder="Your Bio"
								className={classes.textField}
								value={this.state.bio}
								onChange={this.handleChange}
								fullWidth
							/>
							<TextField
								name="website"
								type="text"
								label="Website"
								placeholder="Your Website"
								className={classes.textField}
								value={this.state.website}
								onChange={this.handleChange}
								fullWidth
							/>
							<TextField
								name="location"
								type="text"
								label="Location"
								placeholder="Location"
								className={classes.textField}
								value={this.state.location}
								onChange={this.handleChange}
								fullWidth
							/>
						</form>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleClose} color="primary">
							Cancel
						</Button>
						<Button onClick={this.handleSubmit} color="primary">
							Save
						</Button>
					</DialogActions>
				</Dialog>
			</Fragment>
		);
	}
}

EditDetails.propTypes = {
	editUserDetails: PropTypes.func.isRequired,
	classes: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
	credentials: state.user.credentials,
});

export default connect(mapStateToProps, { editUserDetails })(
	withStyles(styles)(EditDetails)
);
