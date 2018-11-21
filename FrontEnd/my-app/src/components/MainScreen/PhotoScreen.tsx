 import * as React from 'react';
// import Button from '@material-ui/core/Button';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import Typography from '@material-ui/core/Typography';
// import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import withRoot from './WithRoot';
import { Theme, Dialog, DialogContent } from '../../../node_modules/@material-ui/core';
// import { withStyles, Theme } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import tileData from './tileData';
const styles = (theme: Theme) =>
  createStyles({
    root: {
        height: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        backgroundColor: theme.palette.background.paper,
      },
      gridList: {
        width: '100%',
        height: '100%',
        '&:hover': {
        },
      },
  });


interface IState {
  open: boolean,
  photoClick: boolean,
  data: any
};

class Index extends React.Component<WithStyles<typeof styles>, IState> {
    constructor(props: any) {
        super(props);
        this.state = ({
            data: [],
            open: false,
            photoClick: false,
        })
        // this.handlePhotoClick = this.handlePhotoClick.bind(this);
    }

  public handleClose = () => {
    this.setState({
      open: false,
    });
  };

  public handleClick = () => {
    this.setState({
      open: true,
    });
  };

  public render() {
    return (
      <div className={this.props.classes.root}>
      <GridList cellHeight={350} cols={5} className={this.props.classes.gridList}>
        {tileData.map(tile => (
          <GridListTile key={tile.img} onClick={this.handlePhotoClick}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              subtitle={<span>by: {tile.author}</span>}
            />
          </GridListTile>
        ))}
      </GridList>
      <this.displayContent/>
    </div>
    );
  }

  public displayContent = () => {
      return (
        <Dialog open={this.state.photoClick} onClose={this.handlePhotoClose}>
            <DialogContent>
                {this.state.data}
            </DialogContent>
        </Dialog>
      );
  }

  public handlePhotoClick = () => {
      console.log("hi");
      this.setState({
          photoClick: true,
      })
  }

  public handlePhotoClose = () => {
      this.setState({
          photoClick: false
      })
  }
}

export default withRoot(withStyles(styles)(Index));

