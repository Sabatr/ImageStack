import Button from '@material-ui/core/Button'
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
// import { Theme } from '@material-ui/core/styles/createMuiTheme';
// import createStyles from '@material-ui/core/styles/createStyles';
// import { WithStyles } from '@material-ui/core/styles/withStyles';
// import DialogActions from '@material-ui/core/DialogActions';

import * as React from "react";
import { Drawer, List, ListItem } from '../../../node_modules/@material-ui/core';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import LogInPanel from '../login/LogInPanel';

interface IDrawState {
    open: boolean,
    profileOpen : boolean
}

// const styles = (theme: Theme) =>
//   createStyles({
//     root: {
//       textAlign: 'center',
//       paddingTop: theme.spacing.unit * 20,
//     },
//   });

export default class ProfileDropDown extends React.Component<{},IDrawState> {
        constructor(props: any) {
            super(props);
            this.state = ({
                open: false,
                profileOpen: false
            })
            this.handleMenuClose = this.handleMenuClose.bind(this);
        }
        public render() {
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
                        <this.createProfileMenu/>
                        </div>
                );
        }

        public createProfileMenu = () => {
            return (
                <Dialog 
                open={this.state.profileOpen} 
                onClose={this.handleProfileExit}
                >
                        <DialogTitle id="form-dialog-title">Profile Information</DialogTitle>
                        <DialogContent>
                            <div style={{alignSelf:"left", alignItems: "left"}}>
                            <List component="nav">
                                <ListItem button={true}>
                                    <ListItemText primary="Profile"/>
                                </ListItem>
                                <ListItem button={true}>
                                    <ListItemText primary="PLACEHOLDER"/>
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
            this.handleMenuClose();
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

}