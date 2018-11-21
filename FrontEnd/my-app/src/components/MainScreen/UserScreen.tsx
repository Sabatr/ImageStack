import * as React from "react";
// import ProfileDropDown from './ProfileDropDown';
// import PhotoScreen from './PhotoScreen';
// import LogInPanel from '../login/LogInPanel';
import PhotoScreen from './PhotoScreen';
import ProfileDropDown from './ProfileDropDown';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import withRoot from './WithRoot';
import { Theme } from '../../../node_modules/@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    root: {
           alignItems: 'left'
      },
  })
  
class UserScreen extends React.Component<WithStyles<typeof styles>> {

        public render() {
                return (
                        <div className="centreText">
                                <div className={this.props.classes.root}>
                                        <h2> This is a title </h2>
                                        <ProfileDropDown/>
                                 </div>
                                 <div>
                                        <PhotoScreen />
                                </div>
                        </div>
                );
        }
}

export default withRoot(withStyles(styles)(UserScreen));