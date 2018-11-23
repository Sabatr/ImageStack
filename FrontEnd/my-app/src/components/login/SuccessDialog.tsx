import * as React from 'react';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { Theme, Dialog, Typography, DialogTitle } from '../../../node_modules/@material-ui/core';
import withRoot from '../MainScreen/WithRoot';
// import { withStyles, Theme } from '@material-ui/core/styles';

interface IState {
    open: boolean
}

interface IProps extends WithStyles<typeof styles> {
    isOpen: any
    setSuccessful: (isSuccessful:boolean) => void
}
const styles = (theme: Theme) =>
    createStyles({
        root: {
            textAlign: 'center',
            paddingTop: theme.spacing.unit * 20,
        },
    });

class SuccessDialog extends React.Component<IProps,IState> {
    constructor(props: any) {
        super(props);
    }
    public render() {
        return (
            <Dialog open={this.props.isOpen} onClose={()=>this.props.setSuccessful(false)}>
            <DialogTitle><Typography variant="h2">Success!</Typography></DialogTitle>
            </Dialog>
        );
    }

}

export default withRoot(withStyles(styles)(SuccessDialog));