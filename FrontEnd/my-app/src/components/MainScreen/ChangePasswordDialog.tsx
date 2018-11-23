import * as React from 'react';
import { Dialog, DialogContent, TextField, DialogActions, Button, DialogTitle } from '../../../node_modules/@material-ui/core';
import SuccessDialog from '../login/SuccessDialog';

interface IProps {
    username: any,
    open: any
    onClose: (value: any) => void
}

interface IState {
    oldPassword: any,
    newPassword: any,
    open: boolean
}
class ChangePasswordDialog extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = ({
            oldPassword: "",
            newPassword: "",
            open: false
        })
    }

    public handleNewPasswordChange = (event: any) => {
        this.setState({
            newPassword: event.target.value
        })
    }

    public handleOldPasswordChange = (event: any) => {
        this.setState({
            oldPassword: event.target.value
        })
    }

    public handleDialogClose = (state: any) => {
        this.props.onClose(state);
    }

    public confirmPassword = () => {
        this.changePassword();
    }

    public async changePassword() {
        // When logged in, we can alwyas garuantee that the username exists.
        const userDetails = await fetch("https://photostorageapi.azurewebsites.net/api/Users/" + this.props.username,
            {
                method: 'GET'
            })
        const userInfo = await userDetails.json();
        if (userInfo.password !== this.state.oldPassword) {
            alert("Password does not match with old password!");
            return;
        }

        const editingPassword = await fetch("https://photostorageapi.azurewebsites.net/api/Users/" + this.props.username,
            {
                body: JSON.stringify({
                    "userName": userInfo.userName,
                    "password": this.state.newPassword,
                    "email": userInfo.email,
                    "photos": userInfo.photos
                }),
                headers: { 'cache-control': 'no-cache', 'Content-Type': 'application/json' },
                method: 'PUT'
            })

        if (editingPassword.ok) {
            this.setSuccessful(true);
        } else {
            alert("Something went wrong!");
            console.log(editingPassword.statusText)
        }
    }

    public setSuccessful = (state: any) => {
        this.setState({
            open: state
        })
        this.handleDialogClose(state);
    }

    public render() {
        return (
            <Dialog open={this.props.open} onClose={()=>this.handleDialogClose(false)} >
                <DialogTitle>Change Password</DialogTitle>
                <DialogContent>
                    <TextField
                        type="password"
                        fullWidth={true}
                        onChange={this.handleOldPasswordChange}
                        label="Current Password" />
                    <TextField type="password" fullWidth={true} onChange={this.handleNewPasswordChange} label="New Password" />
                    <DialogActions>
                        <Button onClick={()=>this.handleDialogClose(false)}>Cancel</Button>
                        <Button onClick={this.confirmPassword}>Confirm</Button>
                    </DialogActions>
                </DialogContent>
                <SuccessDialog
                    isOpen={this.state.open}
                    message="Successfully changed password!"
                    setSuccessful={this.setSuccessful} />
            </Dialog>
        );
    }
}

export default ChangePasswordDialog