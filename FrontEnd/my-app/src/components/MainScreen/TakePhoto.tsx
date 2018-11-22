import * as React from 'react'
// import { Dialog, DialogContent, Button, DialogTitle, DialogActions, TextField } from '../../../node_modules/@material-ui/core';
import Button from '@material-ui/core/Button'
import createStyles from '@material-ui/core/styles/createStyles';
import * as Webcam from "react-webcam";
import withRoot from './WithRoot';
import { Theme, DialogContent, Dialog, WithStyles, withStyles } from '../../../node_modules/@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    dialogContent: {
      height: '100%',
      flexWrap: 'wrap',
      width: '100%'
    },
  });

interface IState{
    open: boolean,
    refCamera: any
}

interface IProps extends WithStyles<typeof styles> {
    handleFileUpload: (fileList: any) => void
}
class TakePhoto extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = ({
            open: false,
            refCamera: React.createRef(),
        })
        this.takeScreenShot = this.takeScreenShot.bind(this);
    }
    public render() {
        return (
            <div>
                <Button onClick={this.handleCameraOpen}>Take photo</Button>
                <this.makeCameraDialog/>
            </div>

        );
    }

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
                    <Button onClick={this.takeScreenShot}>Get screenshot</Button>
                </DialogContent>
            </Dialog>
        )

    }

    public takeScreenShot = () => {
        this.props.handleFileUpload(this.state.refCamera.current.getScreenshot());
    }
}

export default withRoot(withStyles(styles)(TakePhoto));