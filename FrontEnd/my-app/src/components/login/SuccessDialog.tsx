import * as React from 'react';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { Theme, Dialog, Typography, DialogTitle, DialogContent } from '../../../node_modules/@material-ui/core';
import withRoot from '../MainScreen/WithRoot';

interface IState {
    open: boolean
}

interface IProps extends WithStyles<typeof styles> {
    message: any,
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

/**
 * Creates a dialog which shows the user a success.
 * 
 * @author Brian Nguyen
 */
class SuccessDialog extends React.Component<IProps,IState> {
    constructor(props: any) {
        super(props);
    }
    public render() {
        return (
            <Dialog 
            open={this.props.isOpen} 
            onClose={()=>this.props.setSuccessful(false)}>
                <DialogTitle>
                    <Typography variant="h2">
                        Success!
                    </Typography>
                </DialogTitle>
                <DialogContent>{this.props.message}</DialogContent>
            </Dialog>
        );
    }

}

export default withRoot(withStyles(styles)(SuccessDialog));