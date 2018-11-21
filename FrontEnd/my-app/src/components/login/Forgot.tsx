import * as React from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';

interface IForgot {
    forgot: boolean
}

class Forgot extends React.Component<{},IForgot> {
    constructor(props: any) {
        super(props);
        this.state =({
            forgot: false
        })
    }
    public render() {
        return (
            <div>
                <Button onClick={this.handleForgotPassword}>Forgot Password </Button>
                <this.makeForgot/>
            </div>
        );
    }

    public makeForgot = () => {
        return (
                <div>
                    <Dialog
                        open={this.state.forgot}
                        aria-labelledby="form-dialog-title"
                        onClose={this.handleForgotPasswordClose}
                    > 
                    <DialogTitle id="form-dialog-title">Forgot Password</DialogTitle>
                    <DialogContent>
                    <TextField
                    margin="dense"
                    id="name"
                    label="Email Address"
                    type="email"
                    fullWidth={true}
                    />
                    </DialogContent>
                    <DialogActions>
                            <Button  color="primary" onClick={this.handleForgotPasswordClose}>
                                    Cancel
                            </Button>
                            <Button color="primary" onClick={this.handleForgotConfirm}>
                                    Confirm
                            </Button>
                            </DialogActions>
                    </Dialog>
                </div>
        );
    }
    
    /**
     * Events for creating the forgot dialog
     */
    public handleForgotPassword = () => {
        this.setState({
            forgot: true
    })
    }
    public handleForgotPasswordClose = () => {
            this.setState({
                forgot: false
            })
    }
    public handleForgotConfirm = () => {
            this.handleForgotPasswordClose();
            // TODO: Do some confirming stuff and creating stuff
    }
}

export default Forgot