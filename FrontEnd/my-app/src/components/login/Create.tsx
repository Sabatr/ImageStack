import * as React from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';

interface ICreate {
    createOpen: boolean
}

class Create extends React.Component<{},ICreate> {
    constructor(props: any) {
        super(props);
        this.state = ({
            createOpen: false
        })
    }
    public render() {
        return (
            <div>
            <Button onClick={this.handleOnCreate}>Create Account</Button>
            <this.makeCreate/>
            </div>
        );
    }

    public makeCreate = () => {
        return (
                <div>
                <Dialog
                open={this.state.createOpen}
                aria-labelledby="form-dialog-title"
                onClose={this.handleOnCreateClose}
              >
                <DialogTitle id="form-dialog-title">Create Account</DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus={true}
                    margin="dense"
                    id="name"
                    label="User Name"
                    fullWidth={true}
                  />
                  <TextField
                    id="outlined-password-input"
                    margin="dense"
                    label="Password"
                    type="password"
                    fullWidth={true}
                  />
                  <TextField
                    id="outlined-password-input"
                    margin="dense"
                    label="Confirm Password"
                    type="password"
                    fullWidth={true}
                  />
                  <TextField
                    margin="dense"
                    id="name"
                    label="Email Address"
                    type="email"
                    fullWidth={true}
                  />
                  
                </DialogContent>
                <DialogActions>
                  <Button  color="primary" onClick={this.handleOnCreateClose}>
                    Cancel
                  </Button>
                  <Button color="primary" onClick={this.handleCreateConfirm}>
                    Create
                  </Button>
                </DialogActions>
              </Dialog>
              </div>
        );
    }

    /**
     * Creating the dialog for creating account
     */
    public handleOnCreate = () => {
        this.setState({
                createOpen: true
        })
    }
    public handleOnCreateClose = () => {
            this.setState({
                    createOpen: false
            })
    }
    public handleCreateConfirm = () => {
            this.handleOnCreateClose();
            // TODO: Do some confirming stuff and creating stuff
    }
}

export default Create