import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dayjs from "dayjs";

// Material UI Stuff
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import withStyles from '@material-ui/core/styles/withStyles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

// Material UI Icons
import LoyaltyRoundedIcon from '@material-ui/icons/LoyaltyRounded';
import LocationCityRoundedIcon from '@material-ui/icons/LocationCityRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import PhoneRoundedIcon from '@material-ui/icons/PhoneRounded';
import SchoolRoundedIcon from '@material-ui/icons/SchoolRounded';
import LanguageRoundedIcon from '@material-ui/icons/LanguageRounded';
import EmailRoundedIcon from '@material-ui/icons/EmailRounded';
import FingerprintRoundedIcon from '@material-ui/icons/FingerprintRounded';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import PeopleIcon from '@material-ui/icons/People';
import CakeIcon from '@material-ui/icons/Cake';
import LeakAddRoundedIcon from '@material-ui/icons/LeakAddRounded';

// Redux Stuff
import { connect } from 'react-redux';
import { editUserDetails } from "../../redux/actions/userActions";

const styles = (theme) => ({
    ...theme.spreadThis,
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        borderRadius: "0px 0px 10px 10px",
        boxShadow: "-3px -5px 10px #888888"
    },
    tabs: {
        display: "flex",
        justifyContent: "left",
        alignItems: "center",
        width: "350px",
        maxWidth: "350px",
        borderRight: `1px solid ${theme.palette.divider}`
    },
    userHandleContainer: {
        display: "1",
        justifyContent: "center",
        alignItems: "center"
    },
    dataContainer:{
        display: "flex",

    },
    tabpanelClass: {
        maxWidth: "calc(100% - 200px)",
        minWidth: "calc(100% - 200px)"
    },
    justifyIcons:{
        justifyContent: "start"
    },
    justifyText:{
        justifyContent: "start"
    },
    justifyEdit:{
        justifyContent: "end"
    },
    linkTextStyles:{
        color: theme.palette.text.secondary
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 200,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    tabSize: {
        width: "100%"
    }

});

function TabPanel(props){
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
        {value === index && (
            <Box p={3}>
                {children}
            </Box>
        )}
        </div>
    );
}
  
TabPanel.propTypes = {
    children: PropTypes.any.isRequired,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

class VerticalTabs extends Component {
    constructor(){
        super();
        this.state = {
            value: 0,
            bio:'',
            phone: '',
            school:'',
            university:'',
            currentlyStaysAt:'',
            relationshipStatus:'',
            instagramProfile:'',
            facebookProfile:'',
            twitterProfile:'',
            loveInterest:'',
            languages:'',
            familyMembersUserId:'',
            nickName:'',
            birthDate:'',
            website:'',
            location:'',
            open: false,
            open1: false,
            open2: false,
            open3: false,
            open4: false
        }
    };
    mapUserDetailsToState = (credentials) => {
        this.setState({
            bio: credentials.bio ? credentials.bio : '',
            phone: credentials.phone ? credentials.phone : '',
            school: credentials.school ? credentials.school : '',
            university: credentials.university ? credentials.university : '',
            currentlyStaysAt: credentials.currentlyStaysAt ? credentials.currentlyStaysAt : '',
            relationshipStatus: credentials.relationshipStatus ? credentials.relationshipStatus : '',
            instagramProfile: credentials.instagramProfile ? credentials.instagramProfile : '',
            facebookProfile: credentials.facebookProfile ? credentials.facebookProfile : '',
            twitterProfile: credentials.twitterProfile ? credentials.twitterProfile : '',
            loveInterest: credentials.loveInterest ? credentials.loveInterest : '',
            languages: credentials.languages ? credentials.languages : '',
            familyMembersUserId: credentials.familyMembersUserId ? credentials.familyMembersUserId : '',
            nickName: credentials.nickName ? credentials.nickName : '',
            birthDate: credentials.birthDate ? credentials.birthDate : '',
            website: credentials.website ? credentials.website : '',
            location: credentials.location ? credentials.location : '',
        });
    };
    componentDidMount(){
        const credentials = this.props.user.credentials;
        this.mapUserDetailsToState(credentials);
    };
    handleChange = (event ,newValue) => {
        this.setState({value: newValue});
    };
    handleChangesForState = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    handleSubmit = () => {
        const userDetails = {
            bio: this.state.bio,
            phone: this.state.phone,
            school:this.state.school,
            university: this.state.university,
            currentlyStaysAt:this.state.currentlyStaysAt,
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
    handleClickOpen = () => {
        this.setState({ open : true });
        this.mapUserDetailsToState(this.props.credentials);
    };
    handleClickOpen1 = () => {
        this.setState({ open1 : true });
        this.mapUserDetailsToState(this.props.credentials);
    };
    handleClickOpen2 = () => {
        this.setState({ open2 : true });
        this.mapUserDetailsToState(this.props.credentials);
    };
    handleClickOpen3 = () => {
        this.setState({ open3 : true });
        this.mapUserDetailsToState(this.props.credentials);
    };
    handleClickOpen4 = () => {
        this.setState({ open4 : true });
        this.mapUserDetailsToState(this.props.credentials);
    };
    handleClose = () => {
        this.setState({ 
            open  : false,
            open1 : false,
            open2 : false,
            open3 : false,
            open4: false
         });
    };
    
    render(){
        const classes = this.props.classes;
        const { handle } = this.props.user.credentials
        let a11yProps = (index) => ({
            id: `vertical-tab-${index}`,
            'aria-controls': `vertical-tabpanel-${index}`,
        });

        return(
                <div className={classes.root} >
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={this.state.value}
                        onChange={this.handleChange}
                        aria-label="Vertical tabs example"
                        className={classes.tabs}
                    >
                        <Tab className={classes.tabSize} label="Overview" {...a11yProps(0)} />
                        <Tab className={classes.tabSize} label="Work and Contact Info" {...a11yProps(1)} />
                        <Tab className={classes.tabSize} label="Social Info" {...a11yProps(2)} />
                        <Tab className={classes.tabSize} label="Details about you" {...a11yProps(3)} />
                    </Tabs>
                    <TabPanel value={this.state.value} index={0} className={classes.tabpanelClass}>
                        <Grid container spacing={1}>
                            <Grid item sm={12} container>
                                <Grid item xs={6} sm={1} className={classes.justifyIcons}>
                                    <LoyaltyRoundedIcon color="primary"/>
                                </Grid>
                                <Grid item xs={12} sm={10} className={classes.justifyText}>
                                    <Typography component={'span'} variant="body1">
                                        <Box fontSize={16}>
                                            UserHandle:&nbsp;<b>{handle}</b>
                                        </Box>
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} sm={1} className={classes.justifyEdit}>
                                    <span>
                                        <IconButton disabled>
                                            <EditRoundedIcon color="disabled"/>
                                        </IconButton>
                                    </span>
                                </Grid>
                            </Grid>
                            <Grid item sm={12} container>
                                <Grid item xs={6} sm={1} className={classes.justifyIcons}>
                                    <LocationCityRoundedIcon color="primary"/>
                                </Grid>
                                <Grid item xs={12} sm={10} className={classes.justifyText}>
                                    <Typography component={'span'} variant="body1">
                                        <Box fontSize={16}>
                                            Lives in &nbsp;<a className={classes.linkTextStyles} href={`https://www.google.com/maps/place/${this.state.currentlyStaysAt}`} target= "_blank" rel="noopener noreferrer" ><b>{this.state.currentlyStaysAt}</b></a>
                                        </Box>
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} sm={1} className={classes.justifyEdit}>
                                    <Tooltip title="Edit" placement="top">
                                        <IconButton onClick={this.handleClickOpen} >
                                            <EditRoundedIcon color="secondary"/>
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <Dialog open={this.state.open} onClose={this.handleClose}>
                                        <DialogContent>
                                            <form style={{display: this.state.displayStyle}}>
                                                <TextField name="currentlyStaysAt" type="text" label="" placeholder="Current Place of Stay" className={classes.textField} value={this.state.currentlyStaysAt} onChange={this.handleChangesForState} />
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
                                </Grid>
                            </Grid>
                            <Grid item sm={12} container>
                                <Grid item xs={6} sm={1} className={classes.justifyIcons}>
                                    <LocationOnIcon color="primary"/>
                                </Grid>
                                <Grid item xs={12} sm={10} className={classes.justifyText}>
                                    <Typography component={'span'} variant="body1">
                                        <Box fontSize={16}>
                                            From &nbsp;<a className={classes.linkTextStyles} href={`https://www.google.com/maps/place/${this.state.location}`} target= "_blank" rel="noopener noreferrer" ><b>{this.state.location}</b></a>
                                        </Box>
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} sm={1} className={classes.justifyEdit}>
                                    <Tooltip title="Edit" placement="top">
                                        <IconButton onClick={this.handleClickOpen1}>
                                            <EditRoundedIcon color="secondary"/>
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <Dialog open={this.state.open1} onClose={this.handleClose}>
                                        <DialogContent>
                                            <form style={{display: this.state.displayStyle}}>
                                                <TextField name="location" type="text" label="" placeholder="Current Place of Stay" className={classes.textField} value={this.state.location} onChange={this.handleChangesForState} />
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
                                </Grid>
                            </Grid>
                            <Grid item sm={12} container>
                                <Grid item xs={6} sm={1} className={classes.justifyIcons}>
                                    <FavoriteRoundedIcon color="primary"/>
                                </Grid>
                                <Grid item xs={12} sm={10} className={classes.justifyText}>
                                    <Typography component={'span'} variant="body1">
                                        <Box fontSize={16}>
                                            <b>{this.state.relationshipStatus}</b>
                                        </Box>
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} sm={1} className={classes.justifyEdit}>
                                    <Tooltip title="Edit" placement="top">
                                        <IconButton onClick={this.handleClickOpen2}>
                                            <EditRoundedIcon color="secondary"/>
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <Dialog open={this.state.open2} onClose={this.handleClose}>
                                        <DialogContent>                                          
                                            <FormControl className={classes.formControl}>
                                                <InputLabel id="demo-simple-select-label">Relationship Status</InputLabel>
                                                <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                name="relationshipStatus"
                                                value={this.state.relationshipStatus}
                                                onChange={this.handleChangesForState}
                                                >
                                                <MenuItem value='Single'>Single</MenuItem>
                                                <MenuItem value='In a Relationship'>In a Relationship</MenuItem>
                                                <MenuItem value='Engaged'>Engaged</MenuItem>
                                                <MenuItem value='Married'>Married</MenuItem>
                                                <MenuItem value='In civil partnership'>In civil partnership</MenuItem>
                                                <MenuItem value='In Domestic partnership'>In Domestic partnership</MenuItem>
                                                <MenuItem value='In an open relationship'>In an open relationship</MenuItem>
                                                <MenuItem value="It's Complicated">It's Complicated</MenuItem>
                                                <MenuItem value='Seperated'>Seperated</MenuItem>
                                                <MenuItem value='Divorced'>Divorced</MenuItem>
                                                <MenuItem value='Widowed'>Widowed</MenuItem>
                                                </Select>
                                            </FormControl>
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
                                </Grid>
                            </Grid>
                            <Grid item sm={12} container>
                                <Grid item xs={6} sm={1} className={classes.justifyIcons}>
                                    <PhoneRoundedIcon color="primary"/>
                                </Grid>
                                <Grid item xs={12} sm={10} className={classes.justifyText}>
                                    <Typography component={'span'} variant="body1">
                                        <Box fontSize={16}>
                                            <b>{this.state.phone}</b>
                                        </Box>
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} sm={1} className={classes.justifyEdit}>
                                    <Tooltip title="Edit" placement="top">
                                        <IconButton onClick={this.handleClickOpen3}>
                                            <EditRoundedIcon color="secondary"/>
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <Dialog open={this.state.open3} onClose={this.handleClose}>
                                        <DialogContent>
                                            <form style={{display: this.state.displayStyle}}>
                                                <TextField name="phone" type="tel" autoComplete="off" required placeholder={this.state.phone} className={classes.textField} value={this.state.phone} onChange={this.handleChangesForState} />
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
                                </Grid>
                            </Grid>
                        </Grid>
                    </TabPanel>
                    <TabPanel value={this.state.value} index={1} className={classes.tabpanelClass}>
                        <Grid container spacing={1}>
                            <Grid item sm={12} container>
                                <Grid item xs={6} sm={1} className={classes.justifyIcons}>
                                    <SchoolRoundedIcon color="primary"/>
                                </Grid>
                                <Grid item xs={12} sm={10} className={classes.justifyText}>
                                    <Typography component={'span'} variant="body1">
                                        <Box fontSize={16}>
                                            University:&nbsp;<b>{this.state.university}</b>
                                        </Box>
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} sm={1} className={classes.justifyEdit}>
                                    <span>
                                    <Tooltip title="Edit" placement="top">
                                        <IconButton onClick={this.handleClickOpen4} >
                                            <EditRoundedIcon color="secondary"/>
                                        </IconButton>
                                    </Tooltip>
                                    </span>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <Dialog open={this.state.open4} onClose={this.handleClose}>
                                        <DialogContent>
                                            <form style={{display: this.state.displayStyle}}>
                                                <TextField name="university" type="text" label="" placeholder="University" className={classes.textField} value={this.state.university} onChange={this.handleChangesForState} />
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
                                </Grid>
                            </Grid>
                            <Grid item sm={12} container>
                                <Grid item xs={6} sm={1} className={classes.justifyIcons}>
                                    <SchoolRoundedIcon color="primary"/>
                                </Grid>
                                <Grid item xs={12} sm={10} className={classes.justifyText}>
                                    <Typography component={'span'} variant="body1">
                                        <Box fontSize={16}>
                                            School&nbsp;<a className={classes.linkTextStyles} href={`https://www.google.com/maps/place/${this.state.school}`} target= "_blank" rel="noopener noreferrer" ><b>{this.state.school}</b></a>
                                        </Box>
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} sm={1} className={classes.justifyEdit}>
                                    <Tooltip title="Edit" placement="top">
                                        <IconButton onClick={this.handleClickOpen} >
                                            <EditRoundedIcon color="secondary"/>
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <Dialog open={this.state.open} onClose={this.handleClose}>
                                        <DialogContent>
                                            <form style={{display: this.state.displayStyle}}>
                                                <TextField name="school" type="text" label="" placeholder="School" className={classes.textField} value={this.state.school} onChange={this.handleChangesForState} />
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
                                </Grid>
                            </Grid>
                            <Grid item sm={12} container>
                                <Grid item xs={6} sm={1} className={classes.justifyIcons}>
                                    <LanguageRoundedIcon color="primary"/>
                                </Grid>
                                <Grid item xs={12} sm={10} className={classes.justifyText}>
                                    <Typography component={'span'} variant="body1">
                                        <Box fontSize={16}>
                                            Website &nbsp;<a className={classes.linkTextStyles} href={this.state.website} target= "_blank" rel="noopener noreferrer" ><b>{this.state.website}</b></a>
                                        </Box>
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} sm={1} className={classes.justifyEdit}>
                                    <Tooltip title="Edit" placement="top">
                                        <IconButton onClick={this.handleClickOpen1}>
                                            <EditRoundedIcon color="secondary"/>
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <Dialog open={this.state.open1} onClose={this.handleClose}>
                                        <DialogContent>
                                            <form style={{display: this.state.displayStyle}}>
                                                <TextField name="website" type="text" label="" placeholder="My Website" className={classes.textField} value={this.state.website} onChange={this.handleChangesForState} />
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
                                </Grid>
                            </Grid>
                            <Grid item sm={12} container>
                                <Grid item xs={6} sm={1} className={classes.justifyIcons}>
                                    <EmailRoundedIcon color="primary"/>
                                </Grid>
                                <Grid item xs={12} sm={10} className={classes.justifyText}>
                                    <Typography component={'span'} variant="body1">
                                        <Box fontSize={16}>
                                            Email: <b>{this.props.credentials.email}</b>
                                        </Box>
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} sm={1} className={classes.justifyEdit}>
                                    
                                        <IconButton disabled>
                                            <EditRoundedIcon color="disabled"/>
                                        </IconButton>
                                    
                                </Grid>
                            </Grid>
                            <Grid item sm={12} container>
                                <Grid item xs={6} sm={1} className={classes.justifyIcons}>
                                    <PhoneRoundedIcon color="primary"/>
                                </Grid>
                                <Grid item xs={12} sm={10} className={classes.justifyText}>
                                    <Typography component={'span'} variant="body1">
                                        <Box fontSize={16}>
                                            <b>{this.state.phone}</b>
                                        </Box>
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} sm={1} className={classes.justifyEdit}>
                                    <Tooltip title="Edit" placement="top">
                                        <IconButton onClick={this.handleClickOpen3}>
                                            <EditRoundedIcon color="secondary"/>
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <Dialog open={this.state.open3} onClose={this.handleClose}>
                                        <DialogContent>
                                            <form style={{display: this.state.displayStyle}}>
                                                <TextField name="phone" type="tel" autoComplete="off" required placeholder={this.state.phone} className={classes.textField} value={this.state.phone} onChange={this.handleChangesForState} />
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
                                </Grid>
                            </Grid>
                        </Grid>
                    </TabPanel>
                    <TabPanel value={this.state.value} index={2} className={classes.tabpanelClass}>
                        <Grid container spacing={1}>
                            <Grid item sm={12} container>
                                <Grid item xs={6} sm={1} className={classes.justifyIcons}>
                                    <FingerprintRoundedIcon color="primary"/>
                                </Grid>
                                <Grid item xs={12} sm={10} className={classes.justifyText}>
                                    <Typography component={'span'} variant="body1">
                                        <Box fontSize={16}>
                                            Bio:&nbsp;<b>{this.props.user.credentials.bio}</b>
                                        </Box>
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} sm={1} className={classes.justifyEdit}>
                                    <span>
                                        <IconButton disabled>
                                            <EditRoundedIcon color="disabled"/>
                                        </IconButton>
                                    </span>
                                </Grid>
                            </Grid>
                            <Grid item sm={12} container>
                                <Grid item xs={6} sm={1} className={classes.justifyIcons}>
                                    <EmailRoundedIcon color="primary"/>
                                </Grid>
                                <Grid item xs={12} sm={10} className={classes.justifyText}>
                                    <Typography component={'span'} variant="body1">
                                        <Box fontSize={16}>
                                            Email: <b>{this.props.credentials.email}</b>
                                        </Box>
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} sm={1} className={classes.justifyEdit}>
                                    <IconButton disabled>
                                        <EditRoundedIcon color="disabled"/>
                                    </IconButton>
                                </Grid>
                            </Grid>
                            <Grid item sm={12} container>
                                <Grid item xs={6} sm={1} className={classes.justifyIcons}>
                                    <TwitterIcon color="primary"/>
                                </Grid>
                                <Grid item xs={12} sm={10} className={classes.justifyText}>
                                    <Typography component={'span'} variant="body1">
                                        <Box fontSize={16}>
                                            Twitter &nbsp;<a className={classes.linkTextStyles} href={`https://www.twitter.com/${this.state.twitterProfile}`} target= "_blank" rel="noopener noreferrer" ><b>{this.state.twitterProfile}</b></a>
                                        </Box>
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} sm={1} className={classes.justifyEdit}>
                                    <Tooltip title="Edit" placement="top">
                                        <IconButton onClick={this.handleClickOpen}>
                                            <EditRoundedIcon color="secondary"/>
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <Dialog open={this.state.open} onClose={this.handleClose}>
                                        <DialogContent>
                                            <form style={{display: this.state.displayStyle}}>
                                                <TextField name="twitterProfile" type="text" label="" placeholder="Twitter Profile Link" className={classes.textField} value={this.state.twitterProfile} onChange={this.handleChangesForState} />
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
                                </Grid>
                            </Grid>
                            <Grid item sm={12} container>
                                <Grid item xs={6} sm={1} className={classes.justifyIcons}>
                                    <FacebookIcon color="primary"/>
                                </Grid>
                                <Grid item xs={12} sm={10} className={classes.justifyText}>
                                    <Typography component={'span'} variant="body1">
                                        <Box fontSize={16}>
                                        Facebook &nbsp;<a className={classes.linkTextStyles} href={`https://www.facebook.com/${this.state.facebookProfile}`} target= "_blank" rel="noopener noreferrer" ><b>{this.state.facebookProfile}</b></a>
                                        </Box>
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} sm={1} className={classes.justifyEdit}>
                                    <Tooltip title="Edit" placement="top">
                                        <IconButton onClick={this.handleClickOpen2}>
                                            <EditRoundedIcon color="secondary"/>
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <Dialog open={this.state.open2} onClose={this.handleClose}>
                                        <DialogContent>
                                            <form style={{display: this.state.displayStyle}}>
                                                <TextField name="facebookProfile" type="text" label="" placeholder="Facebook Profile Link" className={classes.textField} value={this.state.facebookProfile} onChange={this.handleChangesForState} />
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
                                </Grid>                             
                            </Grid>
                            <Grid item sm={12} container>
                                <Grid item xs={6} sm={1} className={classes.justifyIcons}>
                                    <InstagramIcon color="primary"/>
                                </Grid>
                                <Grid item xs={12} sm={10} className={classes.justifyText}>
                                    <Typography component={'span'} variant="body1">
                                        <Box fontSize={16}>
                                        Instagram &nbsp;@<a className={classes.linkTextStyles} href={`https://www.instagram.com/${this.state.instagramProfile}`} target= "_blank" rel="noopener noreferrer" ><b>{this.state.instagramProfile}</b></a>
                                        </Box>
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} sm={1} className={classes.justifyEdit}>
                                    <Tooltip title="Edit" placement="top">
                                        <IconButton onClick={this.handleClickOpen3}>
                                            <EditRoundedIcon color="secondary"/>
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <Dialog open={this.state.open3} onClose={this.handleClose}>
                                        <DialogContent>
                                            <form style={{display: this.state.displayStyle}}>
                                                <TextField name="instagramProfile" type="text" label="" placeholder="Instagram Profile Link" className={classes.textField} value={this.state.instagramProfile} onChange={this.handleChangesForState} />
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
                                </Grid>
                            </Grid>
                        </Grid>
                    </TabPanel>
                    <TabPanel value={this.state.value} index={3} className={classes.tabpanelClass}>
                        <Grid container spacing={1}>
                            <Grid item sm={12} container>
                                <Grid item xs={6} sm={1} className={classes.justifyIcons}>
                                    <FingerprintRoundedIcon color="primary"/>
                                </Grid>
                                <Grid item xs={12} sm={10} className={classes.justifyText}>
                                    <Typography component={'span'} variant="body1">
                                        <Box fontSize={16}>
                                            Bio:&nbsp;<b>{this.props.user.credentials.bio}</b>
                                        </Box>
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} sm={1} className={classes.justifyEdit}>
                                    <span>
                                        <IconButton disabled>
                                            <EditRoundedIcon color="disabled"/>
                                        </IconButton>
                                    </span>
                                </Grid>
                            </Grid>
                            <Grid item sm={12} container>
                                <Grid item xs={6} sm={1} className={classes.justifyIcons}>
                                    <PeopleIcon color="primary"/>
                                </Grid>
                                <Grid item xs={12} sm={10} className={classes.justifyText}>
                                    <Typography component={'span'} variant="body1">
                                        <Box fontSize={16}>
                                            Love Interest: <b>{this.state.loveInterest}</b>
                                        </Box>
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} sm={1} className={classes.justifyEdit}>
                                    <Tooltip title="Edit" >
                                        <IconButton onClick={this.handleClickOpen}>
                                            <EditRoundedIcon color="secondary"/>
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <Dialog open={this.state.open} onClose={this.handleClose}>
                                        <DialogContent>                                          
                                            <FormControl className={classes.formControl}>
                                                <InputLabel id="demo-simple-select-label">Relationship Status</InputLabel>
                                                <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                name="loveInterest"
                                                value={this.state.loveInterest}
                                                onChange={this.handleChangesForState}
                                                >
                                                <MenuItem value='Man'>Man</MenuItem>
                                                <MenuItem value='Woman'>Woman</MenuItem>
                                                </Select>
                                            </FormControl>
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
                                </Grid>
                            </Grid>
                            <Grid item sm={12} container>
                                <Grid item xs={6} sm={1} className={classes.justifyIcons}>
                                    <CakeIcon color="primary"/>
                                </Grid>
                                <Grid item xs={12} sm={10} className={classes.justifyText}>
                                    <Typography component={'span'} variant="body1">
                                        <Box fontSize={16}>
                                            Birth Date &nbsp;<b>{dayjs(this.state.birthDate).format('D MMM YYYY')}</b>
                                        </Box>
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} sm={1} className={classes.justifyEdit}>
                                    <Tooltip title="Edit" placement="top">
                                        <IconButton onClick={this.handleClickOpen1}>
                                            <EditRoundedIcon color="secondary"/>
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <Dialog open={this.state.open1} onClose={this.handleClose}>
                                        <DialogContent>
                                            <form style={{display: this.state.displayStyle}}>
                                                <TextField name="birthDate" type="date" label="" placeholder=" Your Birth Date" className={classes.textField} value={this.state.birthDate} onChange={this.handleChangesForState} />
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
                                </Grid>
                            </Grid>
                            <Grid item sm={12} container>
                                <Grid item xs={6} sm={1} className={classes.justifyIcons}>
                                    <LeakAddRoundedIcon color="primary"/>
                                </Grid>
                                <Grid item xs={12} sm={10} className={classes.justifyText}>
                                    <Typography component={'span'} variant="body1">
                                        <Box fontSize={16}>
                                        Nick Name &nbsp;<b>{this.state.nickName}</b>
                                        </Box>
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} sm={1} className={classes.justifyEdit}>
                                    <Tooltip title="Edit" placement="top">
                                        <IconButton onClick={this.handleClickOpen2}>
                                            <EditRoundedIcon color="secondary"/>
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <Dialog open={this.state.open2} onClose={this.handleClose}>
                                        <DialogContent>
                                            <form style={{display: this.state.displayStyle}}>
                                                <TextField name="nickName" type="text" label="" placeholder=" Your Nick Name" className={classes.textField} value={this.state.nickName} onChange={this.handleChangesForState} />
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
                                </Grid>
                            </Grid>
                            <Grid item sm={12} container>
                                <Grid item xs={6} sm={1} className={classes.justifyIcons}>
                                    <PeopleIcon color="primary"/>
                                </Grid>
                                <Grid item xs={12} sm={10} className={classes.justifyText}>
                                    <Typography component={'span'} variant="body1">
                                        <Box fontSize={16}>
                                        Family Members &nbsp;@<a className={classes.linkTextStyles} href={`https://www.instagram.com/${this.state.familyMembersUserId}`} target= "_blank" rel="noopener noreferrer" ><b>{this.state.familyMembersUserId}</b></a>
                                        </Box>
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} sm={1} className={classes.justifyEdit}>
                                    <Tooltip title="Edit" placement="top">
                                        <IconButton onClick={this.handleClickOpen3}>
                                            <EditRoundedIcon color="secondary"/>
                                        </IconButton>
                                    </Tooltip>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <Dialog open={this.state.open3} onClose={this.handleClose}>
                                        <DialogContent>
                                            <form style={{display: this.state.displayStyle}}>
                                                <TextField name="familyMembersUserId" type="text" autoComplete="off" placeholder="User Id of Family Members" className={classes.textField} value={this.state.familyMembersUserId} onChange={this.handleChangesForState} />
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
                                </Grid>
                            </Grid>
                        </Grid>
                    </TabPanel>
                </div>
        );
    }
};

VerticalTabs.propTypes = {
    classes: PropTypes.object.isRequired,
    credentials: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    editUserDetails: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    UI: state.UI,
    user: state.user,
    credentials: state.user.credentials,
});

const mapActionsToProps = {
    editUserDetails
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(VerticalTabs));