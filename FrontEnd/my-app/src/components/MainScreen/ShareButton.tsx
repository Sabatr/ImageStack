import * as React from 'react'
import Share from '@material-ui/icons/Share'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { Theme, WithStyles, withStyles, Tooltip } from '../../../node_modules/@material-ui/core';
import createStyles from '@material-ui/core/styles/createStyles';
import withRoot from './WithRoot';
import {
    FacebookShareButton,
    GooglePlusShareButton,
    TwitterShareButton,
    FacebookIcon,
    TwitterIcon,
    GooglePlusIcon,
    RedditShareButton,
    RedditIcon,
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

/**
 * This renders the share component. 
 * This uses the react-share library: https://github.com/nygardk/react-share
 * 
 * @author Brian Nguyen
 */
class ShareButton extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = ({
            share: false,
            anchor: this.state
        })
    }

    /**
     * Handles the events of pressing the button
     */
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

    /**
     * Creates the pop up menu when the button is clicked.
     */
    public createShareMenu = () => {
        return (
            <Menu
                id="simple-menu"
                className={this.props.classes.horizontal}
                anchorEl={document.getElementById("anchor")}
                open={this.state.share}
                onClose={this.handleShareclose}
            >
                <Tooltip title="Facebook" placement="right-start">
                    <MenuItem onClick={this.handleShareclose}>
                        <FacebookShareButton
                            url={this.props.photo.photoUrl}
                            quote={this.props.photo.photoTitle + "\n" + 
                            this.props.photo.photoDescription}>
                            <FacebookIcon
                                size={32}
                                round={true} 
                            />
                        </FacebookShareButton>
                    </MenuItem>
                </Tooltip>
                <Tooltip title="Twitter" placement="right-start">
                    <MenuItem onClick={this.handleShareclose}>
                        <TwitterShareButton
                            url={this.props.photo.photoUrl}
                            title={this.props.photo.photoTitle + "\n" + 
                            this.props.photo.photoDescription}>
                            <TwitterIcon
                                size={32}
                                round={true} 
                            />
                        </TwitterShareButton>
                    </MenuItem>
                </Tooltip>
                <Tooltip title="Google Plus" placement="right-start">
                    <MenuItem onClick={this.handleShareclose}>
                        <GooglePlusShareButton
                            url={this.props.photo.photoUrl}>
                            <GooglePlusIcon
                                size={32}
                                round={true} 
                            />
                        </GooglePlusShareButton>
                    </MenuItem>
                </Tooltip>
                <Tooltip title="Reddit" placement="right-start">
                    <MenuItem onClick={this.handleShareclose}>
                        <RedditShareButton 
                        url={this.props.photo.photoUrl}
                        title={this.props.photo.photoTitle}
                        >
                            <RedditIcon 
                            size={32}
                            round={true} 
                            />
                        </RedditShareButton>
                    </MenuItem>
                </Tooltip>
            </Menu >
        );
    }

    public render() {
        return (
            <>
                <Tooltip 
                title="Share">
                    <IconButton 
                    id="anchor" 
                    onClick={this.handleShareOpen}>
                        <Share />
                    </IconButton>
                </Tooltip>
                <this.createShareMenu />
            </>
        );
    }
}

export default withRoot(withStyles(styles)(ShareButton));