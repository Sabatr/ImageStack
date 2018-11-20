import Button from '@material-ui/core/Button'
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

import * as React from "react";
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
// import LogInPanel from '../login/LogInPanel';

export default class ProfileDropDown extends React.Component<{}> {

        public render() {
                return (
                        <div className="centreText">
                        <Button> 
                            Toggle
                        </Button>
                        <MenuList>
                            <MenuItem>
                                <ListItemText primary="Profile" />
                            </MenuItem>
                            <MenuItem>
                                <ListItemText primary="About" />
                            </MenuItem>
                            <MenuItem onClick={this.logOut}>
                                <ListItemText primary="Log out" />
                            </MenuItem>
                        </MenuList>
                        </div>
                );
        }

        public logOut = () => {
            return (
                // <Router>
                // <div className="centreText">
                //          <Link to="/MainScreen/UserScreen"><Button>Log In </Button></Link>
                //          <h2> you have been logged out </h2>
                //          <Route path="/" component={LogInPanel} />
                // </div>
                // </Router>
                <h2> hi </h2>
            )
        }

}