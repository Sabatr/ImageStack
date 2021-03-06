import * as React from 'react'
// import { Dialog, DialogContent, Button, DialogTitle, DialogActions, TextField } from '../../../node_modules/@material-ui/core';
import Button from '@material-ui/core/Button'
import createStyles from '@material-ui/core/styles/createStyles';
import * as Webcam from "react-webcam";
import withRoot from './WithRoot';
import { Theme, DialogContent, Dialog, WithStyles, withStyles, Icon } from '../../../node_modules/@material-ui/core';
import AddAPhoto from '@material-ui/icons/AddAPhoto';

const styles = (theme: Theme) =>
    createStyles({
        dialogContent: {
            height: '100%',
            flexWrap: 'wrap',
            width: '100%'
        },
    });

interface IState {
    open: boolean,
    refCamera: any
}

interface IProps extends WithStyles<typeof styles> {
    handleFileUpload: (fileList: any) => void
}

/**
 * This classs renders the web cam component. This uses react-webcam.
 * 
 * @author Brian Nguyen
 */
class TakePhoto extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = ({
            open: false,
            refCamera: React.createRef(),
        })
        this.takeScreenShot = this.takeScreenShot.bind(this);
    }

    /**
     * Handles the camera button
     */
    public handleCameraOpen = () => {
        this.setState({
            open: true
        })
    }
    public handleCameraClose = () => {
        this.setState({
            open: false
        })
    }

    /**
     * Takes a picture from the camera and stores in the parent file component
     */
    public takeScreenShot = () => {
        this.props.handleFileUpload(this.state.refCamera.current.getScreenshot());
    }

    /**
     * Create the screen where the camera shows to take a picture.
     */
    public makeCameraDialog = () => {
        return (
            <Dialog open={this.state.open} onClose={this.handleCameraClose}>
                <DialogContent className={this.props.classes.dialogContent}>
                    <Webcam
                    audio={false}
                    screenshotFormat="image/jpeg"
                    ref={this.state.refCamera}
                    width={550}
                    />
                    <Button 
                    variant="outlined" 
                    color="primary" 
                    onClick={this.takeScreenShot}>
                        Get screenshot
                    </Button>
                </DialogContent>
            </Dialog>
        )

    }

    public render() {
        return (
            <div>
                <Button 
                variant="raised"
                onClick={this.handleCameraOpen}>
                    Camera
                    <Icon>
                        <AddAPhoto />
                    </Icon>
                </Button>
                <this.makeCameraDialog />
            </div>
        );
    }
}

export default withRoot(withStyles(styles)(TakePhoto));