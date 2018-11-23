import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import * as React from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import withRoot from '../MainScreen/WithRoot';
import purple from '@material-ui/core/colors/purple'
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import PhotoScreen from '../MainScreen/PhotoScreen'
import { Drawer, List, ListItem } from '../../../node_modules/@material-ui/core';
import { Theme } from '../../../node_modules/@material-ui/core';
import Create from './Create';
import Forgot from './Forgot';
import Loading from '../Loading';
import CustomChatBot from '../MainScreen/CustomChatBot';

interface ILogInState {
        correctLogin: boolean,
        createOpen: boolean,
        forgotPasswordOpen: boolean,
        open: boolean,
        profileOpen: boolean,
        password: any,
        username: any,
        loading: boolean,
        anyErrors : boolean
}

const styles = (theme: Theme) =>
        createStyles({
                root: {
                        color: theme.palette.background.paper
                },
                cssRoot: {
                        color: theme.palette.getContrastText(purple[500]),
                        backgroundColor: purple[500],
                        '&:hover': {
                                backgroundColor: purple[700],
                        },
                }
        });


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
                        anyErrors: false
                })

                this.handleLogInClick = this.handleLogInClick.bind(this);

        }

        public render() {
                return (
                        <div onClick={()=> {this.setState({anyErrors: false})}}>   
                                {this.state.correctLogin ? <this.makePhotoScreen /> : <this.makeLogIn />}
                                <Loading loaded={this.state.loading}/>
                        </div>
                );
        }

        public makeLogIn = () => {
                return (
                        <div>
                                <CustomChatBot/>
                                <div style={{ alignItems: 'center', paddingTop: '15%', paddingBottom: '20px' }}
                                        className={this.props.classes.root}>
                                        <TextField
                                                id="standard-search"
                                                label="User Name"
                                                onChange={this.handleUserChange}
                                                error={this.state.anyErrors}
                                                type="search"
                                        />
                                </div>
                                <div style={{ paddingBottom: '20px' }}>
                                        <TextField
                                                id="outlined-password-input"
                                                label="Password"
                                                type="password"
                                                onChange={this.handlePasswordchange}
                                                error={this.state.anyErrors}
                                                autoComplete="current-password" />
                                </div>
                                <div>
                                        <Button className={this.props.classes.cssRoot} onClick={this.handleLogInClick}>Log In </Button>
                                </div>
                                <Create />
                                <Forgot />
                        </div>
                )
        }

        public makePhotoScreen = () => {
                return (
                        <div>
                                <div className={this.props.classes.root}>
                                        <h2 style={{ color: 'black' }}>Your Photos </h2>
                                        <this.makeSideBar />
                                </div>
                                <div>
                                        <PhotoScreen username={this.state.username} />
                                </div>
                        </div>
                );
        }

        public makeSideBar = () => {
                return (
                        <div>
                                <Button onClick={this.handleMenuOpen}>Click me</Button>
                                <Drawer anchor="right" open={this.state.open} onClose={this.handleMenuClose}>
                                        <MenuItem onClick={this.handleProfileClick}>
                                                <ListItemText primary="Profile" />
                                        </MenuItem>
                                        <MenuItem>
                                                <ListItemText primary="About" />
                                        </MenuItem>
                                        <MenuItem onClick={this.handleLogOut}>
                                                <ListItemText primary="Log out" />
                                        </MenuItem>
                                </Drawer>
                                <this.createProfileMenu />
                        </div>
                );
        }
        public createProfileMenu = () => {
                return (
                        <Dialog
                                open={this.state.profileOpen}
                                onClose={this.handleProfileExit}>
                                <DialogTitle id="form-dialog-title">Profile Information</DialogTitle>
                                <DialogContent>
                                        <div style={{ alignSelf: "left", alignItems: "left" }}>
                                                <List component="nav">
                                                        <ListItem button={true}>
                                                                <ListItemText primary="Profile" />
                                                        </ListItem>
                                                        <ListItem button={true} onClick={this.handleDeleteButton}>
                                                                <ListItemText primary="Delete Account" />
                                                        </ListItem>
                                                </List>
                                        </div>
                                        <div>
                                                <h2> placeholder text </h2>
                                        </div>
                                </DialogContent>
                        </Dialog>
                );
        }

        public handleDeleteButton = () => {
                this.deleteAccount(this.state.username);
                this.handleProfileExit();
                this.handleLogOut();
        }

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

        public handleLogOut = () => {
                // RESETS USER INFORMATION
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
         * Listens for when the user tries to log in.
         */
        public handleLogInClick = () => {
                this.getUserName(this.state.username);
        }

        /**
         * Calls for the user
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

        public setError = () => {
                this.setState({
                        anyErrors: true
                })
        }

        public hasLoaded = () => {
                this.setState({
                        loading: false
                })
        }

        public isLoading = () => {
                this.setState({
                        loading:true
                })
        }

        public handleLogInClose = () => {
                this.setState({
                        correctLogin: false
                })
        }
}

export default withRoot(withStyles(styles)(LogInPanel));