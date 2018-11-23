import * as React from 'react';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { Theme} from '../../../node_modules/@material-ui/core';
import withRoot from '../MainScreen/WithRoot';
// import { withStyles, Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      paddingTop: theme.spacing.unit * 20,
    },
  });

class SuccessDialog extends React.Component< WithStyles<typeof styles>> {
    public render() {
        return (
            <h1>test</h1>
        );
    }

}

export default withRoot(withStyles(styles)(SuccessDialog));