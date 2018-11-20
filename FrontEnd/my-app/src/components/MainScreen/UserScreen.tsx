import * as React from "react";
import ProfileDropDown from './ProfileDropDown';

export default class UserScreen extends React.Component<{}> {

        public render() {
                return (
                        <div className="centreText">
                                <h2>test </h2>
                                <ProfileDropDown/>
                        </div>
                );
        }
}