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

/**
 * This creates a component and handles the events accordingly
 * 
 * @author Brian Nguyen
 */
class Forgot extends React.Component<{},IForgot> {
    constructor(props: any) {
        super(props);
        this.state =({
            forgot: false
        })
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
    }

    /**
     * Makes the component for the forget component.
     */
    public makeForgot = () => {
        return (
                <>
                    <Dialog
                        open={this.state.forgot}
                        aria-labelledby="form-dialog-title"
                        onClose={this.handleForgotPasswordClose}
                    > 
                    <DialogTitle 
                    id="form-dialog-title">
                    Forgot Password
                    </DialogTitle>
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
                            <Button 
                            variant="outlined" 
                            color="primary" 
                            onClick={this.handleForgotPasswordClose}>
                                Cancel
                            </Button>
                            <Button 
                            variant="outlined" 
                            color="primary" 
                            onClick={this.handleForgotConfirm}>
                                    Confirm
                            </Button>
                            </DialogActions>
                    </Dialog>
                </>
        );
    }

    public render() {
        return (
            <>
                <Button 
                variant="outlined" 
                style={{width: '200px'}} 
                onClick={this.handleForgotPassword}>
                Forgot Password </Button>
                <this.makeForgot/>
            </>
        );
    }

}

export default Forgot