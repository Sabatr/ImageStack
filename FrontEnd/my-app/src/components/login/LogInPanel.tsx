import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import * as React from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import UserScreen from '../MainScreen/UserScreen';
// import Panel from './Panel';

interface ILogInState {
        correctLogin: boolean,
        createOpen : boolean,
        forgotPasswordOpen: boolean,
        password: any,
        username: any
}


export default class LogInPanel extends React.Component<{},ILogInState> {
        constructor(props: any) {
                super(props);
                this.state = ({
                        correctLogin: false,
                        createOpen: false,
                        forgotPasswordOpen: false,
                        password: "",
                        username: "",
                })

        }

        public render() {
                return (
                        <div>
                                <div style={{ alignItems: 'center', paddingTop: '15%',paddingBottom: '20px'}}>
                                <TextField 
                                id="standard-search" 
                                label="User Name"
                                onChange={this.handleUserChange}
                                type="search" 
                                />
                                </div>
                                <div style={{paddingBottom: '20px'}}>
                                <TextField
                                id="outlined-password-input"
                                label="Password"
                                type="password"
                                onChange={this.handlePasswordchange}
                                autoComplete="current-password" />
                                </div>
                                <div>
                                <Button onClick={this.handleLogInClick}>Log In </Button>
                                </div>
                                <div>
                                <Button onClick={this.handleOnCreate}>Create Account</Button>
                                </div>
                                <div>
                                <Button onClick={this.handleForgotPassword}>Forgot Password </Button>
                                </div>
                                {this.state.createOpen ? <this.makeCreate/>: null}
                                {this.state.forgotPasswordOpen ? <this.makeForgot/>: null}
                        </div>
                );
        }

        public makeCreate = (props: any) => {
                return (
                        <div>
                        <Dialog
                        open={true}
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

        public makeForgot = () => {
                return (
                        <div>
                                <Dialog
                                        open={true}
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
         * Handles when the username changes
         */
        public handleUserChange = (event: any) => {
                this.setState({
                        username: event.target.value
                })
        }

        /**
         * Handles when the password changes
         */
        public handlePasswordchange = (event : any) => {
                this.setState({
                        password: event.target.value
                })
        }

        /**
         * Listens for when the user tries to log in.
         */
        public handleLogInClick = () => {
                // TODO: Checks API for details then switch to the next page
                // 1. Get the user information from the API using GET. If the user does NOT exist then show a dialog. Else continue
                // 2. Check if the password entered corresponds to the user password.
                // 3. If correct redirect to the next page.
                console.log(this.state.username +" and password is "+ this.state.password);
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

        /**
         * Events for creating the forgot dialog
         */
        public handleForgotPassword = () => {
                this.setState({
                        forgotPasswordOpen: true
                })
        }
        public handleForgotPasswordClose = () => {
                this.setState({
                        forgotPasswordOpen: false
                })
        }
        public handleForgotConfirm = () => {
                this.handleForgotPasswordClose();
                // TODO: Do some confirming stuff and creating stuff
        }


}