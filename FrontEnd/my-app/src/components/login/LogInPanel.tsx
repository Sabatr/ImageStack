import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import * as React from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import UserScreen from '../MainScreen/UserScreen';
// import Panel from './Panel';

interface ILogInState {
        correctLogin: boolean,
        createOpen : boolean,
        password: any,
        username: any
}


export default class LogInPanel extends React.Component<{},ILogInState> {
        constructor(props: any) {
                super(props);
                this.state = ({
                        correctLogin: false,
                        createOpen: false,
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
                                <Button onClick={this.handleLogInClick}>Forgot Password </Button>
                                </div>
                                {this.state.createOpen ? <this.makeCreate/>: null}
                        </div>
                );
        }

        public handleUserChange = (event: any) => {
                this.setState({
                        username: event.target.value
                })
        }

        public handlePasswordchange = (event : any) => {
                this.setState({
                        password: event.target.value
                })
        }

        public handleLogInClick = () => {
                // TODO: Checks API for details then switch to the next page.
                console.log(this.state.username +" and password is "+ this.state.password);
        }

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

        public makeCreate = (props: any) => {
                return (
                        <div>
                        <Dialog
                        open={true}
                        aria-labelledby="form-dialog-title"
                        onExited={this.handleOnCreateClose}
                      >
                        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            To subscribe to this website, please enter your email address here. We will send
                            updates occasionally.
                          </DialogContentText>
                          <TextField
                            autoFocus={true}
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
                          <Button color="primary" onClick={this.handleOnCreateClose}>
                            Create
                          </Button>
                        </DialogActions>
                      </Dialog>
                      </div>
                );
        }

}