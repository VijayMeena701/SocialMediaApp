import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dayjs from "dayjs";

// Material UI Stuff
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

// Material UI Icons
import LoyaltyRoundedIcon from '@material-ui/icons/LoyaltyRounded';
import LocationCityRoundedIcon from '@material-ui/icons/LocationCityRounded';
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

class VerticalNewTabs extends Component {    
    state = {
        value: 0
    }
    handleChange = (event ,newValue) => {
        this.setState({value: newValue});
    };
    render(){
        const classes = this.props.classes;
        const { handle,
            bio,
            phone,
            school,
            university,
            currentlyStaysAt,
            relationshipStatus,
            instagramProfile,
            facebookProfile,
            twitterProfile,
            loveInterest,
            familyMembersUserId,
            nickName,
            birthDate,
            website,
            location,
            email
        } = this.props.profile;
        
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
                <Grid container spacing={2}>
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
                    </Grid>
                    <Grid item sm={12} container>
                        <Grid item xs={6} sm={1} className={classes.justifyIcons}>
                            <LocationCityRoundedIcon color="primary"/>
                        </Grid>
                        <Grid item xs={6} sm={11} className={classes.justifyText}>
                            <Typography component={'span'} variant="body1">
                                <Box fontSize={16}>
                                    Lives in &nbsp;<a className={classes.linkTextStyles} href={`https://www.google.com/maps/place/${currentlyStaysAt}`} target= "_blank" rel="noopener noreferrer" ><b>{currentlyStaysAt}</b></a>
                                </Box>
                            </Typography>
                        </Grid>                                
                    </Grid>
                    <Grid item sm={12} container>
                        <Grid item xs={6} sm={1} className={classes.justifyIcons}>
                            <LocationOnIcon color="primary"/>
                        </Grid>
                        <Grid item xs={12} sm={10} className={classes.justifyText}>
                            <Typography component={'span'} variant="body1">
                                <Box fontSize={16}>
                                    From &nbsp;<a className={classes.linkTextStyles} href={`https://www.google.com/maps/place/${location}`} target= "_blank" rel="noopener noreferrer" ><b>{location}</b></a>
                                </Box>
                            </Typography>
                        </Grid>
            
                    </Grid>
                    <Grid item sm={12} container>
                        <Grid item xs={6} sm={1} className={classes.justifyIcons}>
                            <FavoriteRoundedIcon color="primary"/>
                        </Grid>
                        <Grid item xs={12} sm={10} className={classes.justifyText}>
                            <Typography component={'span'} variant="body1">
                                <Box fontSize={16}>
                                    <b>{relationshipStatus}</b>
                                </Box>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item sm={12} container>
                        <Grid item xs={6} sm={1} className={classes.justifyIcons}>
                            <PhoneRoundedIcon color="primary"/>
                        </Grid>
                        <Grid item xs={12} sm={10} className={classes.justifyText}>
                            <Typography component={'span'} variant="body1">
                                <Box fontSize={16}>
                                    <b>{phone}</b>
                                </Box>
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </TabPanel >
            <TabPanel value={this.state.value} index={1} className={classes.tabpanelClass}>
                <Grid container spacing={2}>
                    <Grid item sm={12} container>
                        <Grid item xs={6} sm={1} className={classes.justifyIcons}>
                            <SchoolRoundedIcon color="primary"/>
                        </Grid>
                        <Grid item xs={12} sm={10} className={classes.justifyText}>
                            <Typography component={'span'} variant="body1">
                                <Box fontSize={16}>
                                    University:&nbsp;<b>{university}</b>
                                </Box>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item sm={12} container>
                        <Grid item xs={6} sm={1} className={classes.justifyIcons}>
                            <SchoolRoundedIcon color="primary"/>
                        </Grid>
                        <Grid item xs={12} sm={10} className={classes.justifyText}>
                            <Typography component={'span'} variant="body1">
                                <Box fontSize={16}>
                                    School&nbsp;<a className={classes.linkTextStyles} href={`https://www.google.com/maps/place/${school}`} target= "_blank" rel="noopener noreferrer" ><b>{school}</b></a>
                                </Box>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item sm={12} container>
                        <Grid item xs={6} sm={1} className={classes.justifyIcons}>
                            <LanguageRoundedIcon color="primary"/>
                        </Grid>
                        <Grid item xs={12} sm={10} className={classes.justifyText}>
                            <Typography component={'span'} variant="body1">
                                <Box fontSize={16}>
                                    Website &nbsp;<a className={classes.linkTextStyles} href={website} target= "_blank" rel="noopener noreferrer" ><b>{website}</b></a>
                                </Box>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item sm={12} container>
                        <Grid item xs={6} sm={1} className={classes.justifyIcons}>
                            <EmailRoundedIcon color="primary"/>
                        </Grid>
                        <Grid item xs={12} sm={10} className={classes.justifyText}>
                            <Typography component={'span'} variant="body1">
                                <Box fontSize={16}>
                                    Email: <b>{email}</b>
                                </Box>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item sm={12} container>
                        <Grid item xs={6} sm={1} className={classes.justifyIcons}>
                            <PhoneRoundedIcon color="primary"/>
                        </Grid>
                        <Grid item xs={12} sm={10} className={classes.justifyText}>
                            <Typography component={'span'} variant="body1">
                                <Box fontSize={16}>
                                    <b>{phone}</b>
                                </Box>
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </TabPanel>
            <TabPanel value={this.state.value} index={2} className={classes.tabpanelClass}>
                <Grid container spacing={2}>
                    <Grid item sm={12} container>
                        <Grid item xs={6} sm={1} className={classes.justifyIcons}>
                            <FingerprintRoundedIcon color="primary"/>
                        </Grid>
                        <Grid item xs={12} sm={10} className={classes.justifyText}>
                            <Typography component={'span'} variant="body1">
                                <Box fontSize={16}>
                                    Bio:&nbsp;<b>{bio}</b>
                                </Box>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item sm={12} container>
                        <Grid item xs={6} sm={1} className={classes.justifyIcons}>
                            <EmailRoundedIcon color="primary"/>
                        </Grid>
                        <Grid item xs={12} sm={10} className={classes.justifyText}>
                            <Typography component={'span'} variant="body1">
                                <Box fontSize={16}>
                                    Email: <b>{email}</b>
                                </Box>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item sm={12} container>
                        <Grid item xs={6} sm={1} className={classes.justifyIcons}>
                            <TwitterIcon color="primary"/>
                        </Grid>
                        <Grid item xs={12} sm={10} className={classes.justifyText}>
                            <Typography component={'span'} variant="body1">
                                <Box fontSize={16}>
                                    Twitter &nbsp;<a className={classes.linkTextStyles} href={`https://www.twitter.com/${twitterProfile}`} target= "_blank" rel="noopener noreferrer" ><b>{twitterProfile}</b></a>
                                </Box>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item sm={12} container>
                        <Grid item xs={6} sm={1} className={classes.justifyIcons}>
                            <FacebookIcon color="primary"/>
                        </Grid>
                        <Grid item xs={12} sm={10} className={classes.justifyText}>
                            <Typography component={'span'} variant="body1">
                                <Box fontSize={16}>
                                Facebook &nbsp;<a className={classes.linkTextStyles} href={`https://www.facebook.com/${facebookProfile}`} target= "_blank" rel="noopener noreferrer" ><b>{facebookProfile}</b></a>
                                </Box>
                            </Typography>
                        </Grid>                            
                    </Grid>
                    <Grid item sm={12} container>
                        <Grid item xs={6} sm={1} className={classes.justifyIcons}>
                            <InstagramIcon color="primary"/>
                        </Grid>
                        <Grid item xs={12} sm={10} className={classes.justifyText}>
                            <Typography component={'span'} variant="body1">
                                <Box fontSize={16}>
                                Instagram &nbsp;@<a className={classes.linkTextStyles} href={`https://www.instagram.com/${instagramProfile}`} target= "_blank" rel="noopener noreferrer" ><b>{instagramProfile}</b></a>
                                </Box>
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </TabPanel>
            <TabPanel value={this.state.value} index={3} className={classes.tabpanelClass}>
                <Grid container spacing={2}>
                    <Grid item sm={12} container>
                        <Grid item xs={6} sm={1} className={classes.justifyIcons}>
                            <FingerprintRoundedIcon color="primary"/>
                        </Grid>
                        <Grid item xs={12} sm={10} className={classes.justifyText}>
                            <Typography component={'span'} variant="body1">
                                <Box fontSize={16}>
                                    Bio:&nbsp;<b>{bio}</b>
                                </Box>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item sm={12} container>
                        <Grid item xs={6} sm={1} className={classes.justifyIcons}>
                            <PeopleIcon color="primary"/>
                        </Grid>
                        <Grid item xs={12} sm={10} className={classes.justifyText}>
                            <Typography component={'span'} variant="body1">
                                <Box fontSize={16}>
                                    Love Interest: <b>{loveInterest}</b>
                                </Box>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item sm={12} container>
                        <Grid item xs={6} sm={1} className={classes.justifyIcons}>
                            <CakeIcon color="primary"/>
                        </Grid>
                        <Grid item xs={12} sm={10} className={classes.justifyText}>
                            <Typography component={'span'} variant="body1">
                                <Box fontSize={16}>
                                    Birth Date &nbsp;<b>{dayjs(birthDate).format('D MMM YYYY')}</b>
                                </Box>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item sm={12} container>
                        <Grid item xs={6} sm={1} className={classes.justifyIcons}>
                            <LeakAddRoundedIcon color="primary"/>
                        </Grid>
                        <Grid item xs={12} sm={10} className={classes.justifyText}>
                            <Typography component={'span'} variant="body1">
                                <Box fontSize={16}>
                                Nick Name &nbsp;<b>{nickName}</b>
                                </Box>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item sm={12} container>
                        <Grid item xs={6} sm={1} className={classes.justifyIcons}>
                            <PeopleIcon color="primary"/>
                        </Grid>
                        <Grid item xs={12} sm={10} className={classes.justifyText}>
                            <Typography component={'span'} variant="body1">
                                <Box fontSize={16}>
                                Family Members &nbsp;@<a className={classes.linkTextStyles} href={`https://www.instagram.com/${familyMembersUserId}`} target= "_blank" rel="noopener noreferrer" ><b>{familyMembersUserId}</b></a>
                                </Box>
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </TabPanel>
        </div>
        );
    }
};

VerticalNewTabs.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    UI: state.UI,
    user: state.user,
});
export default connect(mapStateToProps)(withStyles(styles)(VerticalNewTabs));