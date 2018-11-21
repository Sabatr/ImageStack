import * as React from "react";
// import ProfileDropDown from './ProfileDropDown';
// import PhotoScreen from './PhotoScreen';
// import LogInPanel from '../login/LogInPanel';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import withRoot from './WithRoot';
import { Theme } from '../../../node_modules/@material-ui/core';
import LogInPanel from '../login/LogInPanel';
// import LogInPanel from '../login/LogInPanel';

const styles = (theme: Theme) =>
  createStyles({
    root: {
           alignItems: 'left'
      },
  })
  
class UserScreen extends React.Component<WithStyles<typeof styles>> {

        public render() {
                return (
                        <div className="centreText" style={{textAlign: 'center'}}>
                                <LogInPanel/>
                        </div>
                );
        }
}

export default withRoot(withStyles(styles)(UserScreen));