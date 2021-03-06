import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import * as React from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import withRoot from '../MainScreen/WithRoot';
import deepPurple from '@material-ui/core/colors/deepPurple'
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import PhotoScreen from '../MainScreen/PhotoScreen'
import { Drawer, List, ListItem, IconButton, Tooltip, DialogContentText, DialogActions } from '../../../node_modules/@material-ui/core';
import { Theme } from '../../../node_modules/@material-ui/core';
import Create from './Create';
import Forgot from './Forgot';
import Loading from '../Loading';
import CustomChatBot from '../MainScreen/CustomChatBot';
import PhotoChatBot from '../MainScreen/PhotoChatBot';
import ChangePasswordDialog from '../MainScreen/ChangePasswordDialog';
import AccountBox from '@material-ui/icons/AccountBox'

interface ILogInState {
        correctLogin: boolean,
        createOpen: boolean,
        forgotPasswordOpen: boolean,
        open: boolean,
        profileOpen: boolean,
        password: any,
        username: any,
        loading: boolean,
        anyErrors: boolean,
        editPassword: boolean,
        confirmation: boolean
}

const styles = (theme: Theme) =>
        createStyles({
                root: {
                },
                cssRoot: {
                        fontWeight: "bold",
                        color: theme.palette.getContrastText(deepPurple[500]),
                        backgroundColor: deepPurple[500],
                        '&:hover': {
                                backgroundColor: deepPurple[700],
                        },
                        height: '50px',
                        width: '200px',
                        fontSize: '25px',
                        textAlign: 'center',
                },
                profileDiv: {
                        textAlign: 'center',
                        display: 'in-line'
                },
                profile: {
                        maxWidth: '100px',
                        maxHeight: '100px',
                        minWidth: '100px',
                        minHeight: '100px',
                        backgroundColor: "#673ab7",
                        '&:hover': {
                                backgroundColor: deepPurple[700]
                        }
                }
        });

/**
 * This class handles the creation of the different screens.
 * Noted that the method used for this is not very
 * good.
 * 
 * @author Brian Nguyen
 */
class LogInPanel extends React.Component<WithStyles<typeof styles>, ILogInState> {
        constructor(props: any) {
                super(props);
                this.state = ({
                        correctLogin: false,
                        createOpen: false,
                        forgotPasswordOpen: false,
                        open: false,
                        profileOpen: false,
                        password: "",
                        username: "",
                        loading: false,
                        anyErrors: false,
                        editPassword: false,
                        confirmation: false
                })

                this.handleLogInClick = this.handleLogInClick.bind(this);

        }
        /**
         * Listens to the textfield changes from the log in.
         */
        public setLogIn = () => {
                this.setState({
                        correctLogin: true
                })
        }
        public handleChangePassword = (value: any) => {
                this.setState({
                        editPassword: value
                })
        }

        /**
         * Sets the user name and password to guest information.
         */
        public setUserNameAndPass = (guestUser: any, guestPass: any) => {
                this.setState({
                        username: guestUser,
                        password: guestPass
                })
        }

        /**
         * Handles the delete button
         */
        public handleDelete = (state: boolean) =>{
                this.setState({
                        confirmation: state
                })
        }
        public handleDeleteButton = () => {
                this.deleteAccount(this.state.username);
                this.handleProfileExit();
                this.handleLogOut();
        }
        /**
         * Handles logging out
         */
        public handleLogOut = () => {
                this.setState({
                        username: "",
                        password: ""
                })
                this.handleMenuClose();
                this.handleLogInClose();
        }
        public handleProfileClick = () => {
                this.setState({
                        profileOpen: true
                })
                this.handleMenuClose();
        }

        /**
         * Allows the screen to switch to the log in screen.
         */
        public handleProfileExit = () => {
                this.setState({
                        profileOpen: false
                })
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
        public handlePasswordchange = (event: any) => {
                this.setState({
                        password: event.target.value
                })
        }

        /**
         * Handles if there is an error
         */
        public setError = () => {
                this.setState({
                        anyErrors: true
                })
        }

        /**
         * Handles the menu opening
         */
        public handleMenuOpen = () => {
                this.setState({
                        open: true
                })
        }

        public handleMenuClose = () => {
                this.setState({
                        open: false
                })
        }
        
        /**
         * Listens for when the user tries to log in.
         */
        public handleLogInClick = () => {
                this.getUserName(this.state.username);
        }
        public handleLogInClose = () => {
                this.setState({
                        correctLogin: false
                })
        }

        /**
         * Checks if the api is still being called
         */
        public hasLoaded = () => {
                this.setState({
                        loading: false
                })
        }

        public isLoading = () => {
                this.setState({
                        loading: true
                })
        }

        /**
         * Calls a DELETE request to delete information from the api.
         */
        public async deleteAccount(userId: string) {
                const response = await fetch("https://photostorageapi.azurewebsites.net/api/Users/" + userId, {
                        method: 'DELETE'
                })
                if (!response.ok) {
                        alert(response.statusText);
                } else {
                        this.forceUpdate();
                }
        }

        /**
         * Uses a GET request to retrieve information from the api.
         * @param userId 
         */
        public async getUserName(userId: string) {
                this.isLoading();
                const userDetails = await fetch("https://photostorageapi.azurewebsites.net/api/Users/" + this.state.username,
                        {
                                method: 'GET'
                        })
                if (!userDetails.ok || this.state.username === "") {
                        this.hasLoaded();
                        this.setError();
                } else {
                        const userData = await userDetails.json();
                        if (userData.password !== this.state.password) {
                                this.setError();
                        } else {
                                this.setState({
                                        anyErrors: false,
                                        correctLogin: true
                                })
                        }
                        this.hasLoaded();
                }
        }

        /**
         * Creates the main log in screen.
         */
        public makeLogIn = () => {
                return (
                        <>
                                <CustomChatBot 
                                logIn={this.setLogIn} 
                                setGuest={this.setUserNameAndPass} 
                                />
                                <div 
                                style={{ alignItems: 'center', paddingBottom: '20px' }}
                                className={this.props.classes.root}
                                >
                                        <TextField
                                                style={{ width: "500px", fontSize: "50px" }}
                                                id="standard-search"
                                                label="User Name"
                                                autoFocus={true}
                                                onChange={this.handleUserChange}
                                                error={this.state.anyErrors}
                                                type="search"
                                        />
                                </div>
                                <div style={{ paddingBottom: '20px' }}>
                                        <TextField
                                                style={{ width: "500px", fontSize: "50px" }}
                                                id="outlined-password-input"
                                                label="Password"
                                                type="password"
                                                onChange={this.handlePasswordchange}
                                                error={this.state.anyErrors}
                                                autoComplete="current-password" 
                                        />
                                </div>
                                <div style={{ paddingBottom: '20px' }}>
                                        <Button 
                                        variant="raised" 
                                        className={this.props.classes.cssRoot} 
                                        onClick={this.handleLogInClick}>
                                        Log In 
                                        </Button>
                                </div>
                                <Create />
                                <Forgot />
                        </>
                )
        }

        /**
         * Renders components from other files
         */
        public makePhotoScreen = () => {
                return (
                        <div>
                                <div className={this.props.classes.root}>
                                        <this.makeSideBar />
                                </div>
                                <PhotoChatBot username={this.state.username} />
                                <div>
                                        <PhotoScreen username={this.state.username} />
                                </div>
                        </div>
                );
        }

        /**
         * Creates the pop up drawer when clicking the profile button.
         */
        public makeSideBar = () => {
                return (
                        <div className={this.props.classes.profileDiv}>
                                <Tooltip title="Profile">
                                        <IconButton
                                                className={this.props.classes.profile}
                                                onClick={this.handleMenuOpen}
                                                >
                                                <AccountBox style={{
                                                        maxWidth:'75px',
                                                        maxHeight: '75px',
                                                        minWidth: '75px',
                                                        minHeight: '75px',
                                                        color: 'white'
                                                        }} 
                                                />
                                        </IconButton>
                                </Tooltip>
                                <Drawer 
                                anchor="right" 
                                open={this.state.open} 
                                onClose={this.handleMenuClose} 
                                style={{width:"100px"}}
                                >
                                        <MenuItem 
                                        onClick={this.handleProfileClick} 
                                        style={{width:"200px",fontSize: "30px"}}
                                        >
                                                <ListItemText 
                                                primary="Profile" 
                                                style={{fontSize: "30px"}}
                                                />
                                        </MenuItem>
                                        <MenuItem 
                                        onClick={this.handleLogOut} 
                                        style={{width:"200px",fontSize: "30px"}}
                                        >
                                                <ListItemText 
                                                primary="Log out" 
                                                style={{fontSize: "30px"}}
                                                />
                                        </MenuItem>
                                </Drawer>
                                <this.createProfileMenu />
                        </div>
                );
        }

        /**
         * Creates the component for when the user clicks on the profile 
         * option from the drawer.
         */
        public createProfileMenu = () => {
                return (
                        <Dialog
                                open={this.state.profileOpen}
                                onClose={this.handleProfileExit}>
                                <DialogTitle 
                                id="form-dialog-title">
                                        {this.state.username}'s profile
                                </DialogTitle>
                                <DialogContent>
                                        <div style={{ alignSelf: "left", alignItems: "left" }}>
                                                <List component="nav">
                                                        <ListItem 
                                                                button={true}
                                                                onClick={() => this.handleChangePassword(true)}
                                                                style={{ textAlign: 'left' }}>
                                                                <ListItemText primary="Change password" />
                                                        </ListItem>
                                                        <ListItem 
                                                                button={true}
                                                                onClick={()=>{this.handleDelete(true)}}
                                                                style={{ textAlign: 'left' }}>
                                                                <ListItemText primary="Delete Account" />
                                                        </ListItem>
                                                </List>
                                        </div>
                                        <ChangePasswordDialog
                                                username={this.state.username}
                                                open={this.state.editPassword}
                                                onClose={this.handleChangePassword} />
                                </DialogContent>
                                <this.confirmDelete/>
                        </Dialog>
                );
        }

        /**
         * Creates the pop up dialog to confirm deleting an account
         */
        public confirmDelete = () => {
                return (
                <Dialog 
                open={this.state.confirmation}
                onClose={() => {this.handleDelete(false)}}>
                        <DialogContent>
                                <DialogContentText>
                                        Do you wish to delete {this.state.username}?
                                </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                                <DialogActions>
                                        <Button 
                                        variant="outlined" 
                                        onClick={this.handleDeleteButton} 
                                        color="primary"
                                        >
                                                Yes
                                        </Button>
                                        <Button 
                                        variant="outlined" 
                                        onClick={()=>{this.handleDelete(false)}} 
                                        color="primary"
                                        >
                                                No
                                        </Button>
                                </DialogActions>
                        </DialogActions>
                </Dialog>
                );
        
        }
        public render() {
                return (
                        <div onClick={() => { this.setState({ anyErrors: false }) }}>
                                {this.state.correctLogin ? <this.makePhotoScreen /> : <this.makeLogIn />}
                                <Loading loaded={this.state.loading} />
                        </div>
                );
        }
}

export default withRoot(withStyles(styles)(LogInPanel));