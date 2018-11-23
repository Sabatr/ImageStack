import * as React from 'react'
import { Dialog, CircularProgress, DialogContent, WithStyles, Theme, createStyles, withStyles } from '../../node_modules/@material-ui/core';
import withRoot from './MainScreen/WithRoot';

interface IProps extends WithStyles<typeof styles> {
    loaded: any
}

const styles = (theme: Theme) =>
    createStyles({
        root: {
            backgroundColor: "transparent"
        },
        paper: {
            backgroundColor: "transparent",
            boxShadow: "none",
            overflow: "hidden"
        },

    })

/**
 * Creates a loading screen. It's pretty much a dialog with a
 * transparent background.
 * 
 * @author Brian Nguyen
 */    
class Loading extends React.Component<IProps, {}> {
    public render() {
        return (
            <Dialog open={this.props.loaded}
            scroll="paper"
                PaperProps={{
                    classes: {
                        root: this.props.classes.paper
                    }
                }}
            >
                <DialogContent>
                    <CircularProgress color="secondary" size={100} thickness={4} />
                </DialogContent>
            </Dialog>
        )
    }
}

export default withRoot(withStyles(styles)(Loading));