import React, { Component, Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import withStyles from "@material-ui/core/styles/withStyles";
import LinkButton from "@material-ui/core/Link";

const styles = (theme) => ({
    ...theme.spreasThis
})

const time = new Date().getFullYear();

class Copyright extends Component {
    render() {
      return(
          <Fragment>
              <Typography variant="body2" color="secondary" align="center">
                {'Copyright © '}
                <LinkButton href="/" color="inherit" >
                Social Media
                </LinkButton>{' '}
                {time}
                {'.'}
            </Typography>
          </Fragment>
      )
    }
};
export default withStyles(styles)(Copyright);

