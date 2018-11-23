import * as React from 'react'
import Share from '@material-ui/icons/Share'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { Theme, WithStyles, withStyles } from '../../../node_modules/@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';
import withRoot from './WithRoot';
import {
    FacebookShareButton,
    GooglePlusShareButton,
    TwitterShareButton,
  
    FacebookIcon,
    TwitterIcon,
    GooglePlusIcon,
  } from 'react-share';

interface IState {
    share: boolean,
    anchor: any
}

const styles = (theme: Theme) =>
    createStyles({
        horizontal: {
            display: 'inline-block'
        },
    });

interface IProps extends WithStyles<typeof styles> {
    photo: any
}
class ShareButton extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = ({
            share: false,
            anchor: this.state
        })
    }
    public render() {
        return (
            <>
                <IconButton id="anchor" onClick={this.handleShareOpen}><Share /></IconButton>
                <this.createShareMenu />
            </>
        );
    }

    public handleShareOpen = (event: any) => {
        this.setState({
            share: true,
        })
    }

    public handleShareclose = () => {
        this.setState({
            share: false
        })
    }

    public createShareMenu = () => {
        return (
            <Menu
                id="simple-menu"
                className={this.props.classes.horizontal}
                anchorEl={document.getElementById("anchor")}
                open={this.state.share}
                onClose={this.handleShareclose}
            >
                <MenuItem onClick={this.handleShareclose}>
                    <FacebookShareButton
                        url={this.props.photo.photoUrl}
                        quote={this.props.photo.photoTitle +"\n"+this.props.photo.photoDescription}>
                        <FacebookIcon
                            size={32}
                            round={true} />
                    </FacebookShareButton>
                </MenuItem>
                <MenuItem onClick={this.handleShareclose}>
                    <TwitterShareButton
                        url={this.props.photo.photoUrl}
                        title={this.props.photo.photoTitle +"\n"+this.props.photo.photoDescription}>
                        <TwitterIcon
                            size={32}
                            round={true}  />
                    </TwitterShareButton>
                </MenuItem>
                <MenuItem onClick={this.handleShareclose}>
                    <GooglePlusShareButton
                        url={this.props.photo.photoUrl}>
                        <GooglePlusIcon
                            size={32}
                            round={true} />
                    </GooglePlusShareButton></MenuItem>
            </Menu>
        );
    }
}

export default withRoot(withStyles(styles)(ShareButton));