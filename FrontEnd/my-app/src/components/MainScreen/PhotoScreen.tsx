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
import { Theme, Dialog, DialogContent, Button, Paper, DialogTitle, DialogContentText, IconButton, DialogActions } from '../../../node_modules/@material-ui/core';
// import { withStyles, Theme } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import tileData from './tileData';
import Fullscreen from '@material-ui/icons/Fullscreen'
import grey from '@material-ui/core/colors/grey'
import Delete from '@material-ui/icons/Delete'
import Edit from '@material-ui/icons/Edit'
import Share from '@material-ui/icons/Share'
const styles = (theme: Theme) =>
  createStyles({
    root: {
        height: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      },
      gridList: {
        width: '100%',
        height: '100%',
        '&:hover': {
        },
      },
      dialogContent: {
        height: '100%',
        flexWrap: 'wrap',
        width: '100%'
      },
      icon: {
        color: grey[100]
      }
  });


interface IState {
  open: boolean,
  photoClick: boolean,
  data: any,
  add: boolean,
  selectedPhoto: any,
  confirmation: boolean,
};

interface IProps extends WithStyles<typeof styles> {
  username: any
}

class Index extends React.Component<IProps, IState > {
    constructor(props: any) {
        super(props);
        this.state = ({
            data: [],
            open: false,
            photoClick: false,
            add: false,
            selectedPhoto: "",
            confirmation: false
        })
        // this.handlePhotoClick = this.handlePhotoClick.bind(this);
        this.storeInfo = this.storeInfo.bind(this);
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

  public handleAdd = () => {
      // Should also add to the api. Then when it rerenders it will include the api with it.
      this.state.data.push({
          img: "https://i.redd.it/11xik28odlz11.jpg",
          title: "TestingADd",
          date: '21/11/2018',
          description: "me",
          id: 14
      })
      this.forceUpdate();
  }

  public render() {
    console.log(this.props.username)
    return (
      <div className={this.props.classes.root} style={{textAlign: 'center'}}>
      <Button onClick={this.handleAdd}>Add</Button>
      <GridList cellHeight={350} cols={5} className={this.props.classes.gridList}>
        {this.state.data.map((tile: any) => (
          <GridListTile key={tile.id}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              subtitle={<span>Made on: {tile.date}</span>}
              actionIcon={
                <IconButton onClick={this.handlePhotoClick.bind(this,tile)}>
                    <Fullscreen className={this.props.classes.icon}/>
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
      <this.displayContent/>
    </div>
    );
  }

  public storeInfo() {
      const list:any = []
      tileData.map(tile => list.push(tile));
      this.setState({
          data: list
      })
  }

  public componentDidMount() {
    this.storeInfo();
}

  public displayContent = () => {
      return (
        <Paper>
        <Dialog open={this.state.photoClick} 
        onClose={this.handlePhotoClose} 
        scroll='body'
        fullWidth={true} 
        aria-labelledby="scroll-dialog-title">
        <DialogTitle id="form-dialog-title">{this.state.selectedPhoto.title}</DialogTitle>
            <DialogContent className={this.state.selectedPhoto.title} >
                <DialogContentText>{this.state.selectedPhoto.description} </DialogContentText>
                <img src={this.state.selectedPhoto.img} height='100%' width='100%'/>
                <IconButton><Edit/> </IconButton>
                <IconButton onClick={this.handleDeleteClick}>
                  <Delete/>
                </IconButton>
                <this.confirmDelete/>
                <IconButton><Share/></IconButton>
            </DialogContent>
        </Dialog>
        </Paper>
      );
  }

  public handleDeleteClick = () => {
    this.setState({
      confirmation: true
    });
  }

  public handleDeleteClose = () => {
    this.setState({
      confirmation: false
    })
  }

  public handleDeleteConfirm = () => {
    this.deletePhoto();
    this.handleDeleteClose();
    this.handlePhotoClose();
  }
  public confirmDelete = () => {
    return (
      <Dialog open={this.state.confirmation} 
      onClose={this.handleDeleteClose}>
        <DialogContent>
          <DialogContentText>
            Do you wish to delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <DialogActions>
          <Button onClick={this.handleDeleteConfirm} color="primary">
            Yes
          </Button>
          <Button onClick={this.handleDeleteClose} color="primary">
            No
          </Button>
        </DialogActions>
        </DialogActions>
      </Dialog>
    );
  }

  public deletePhoto() {
    // DOES SOME STUFF TO DELETE FROM API TOO.
    const list:any = this.state.data
    const position:any = this.state.data.indexOf(this.state.selectedPhoto);
    list.splice(position,1);
    this.setState({
      data: list
    })
  }

  public handlePhotoClick = (tile: any) => {
      this.setState({
          photoClick: true,
          selectedPhoto: this.state.data[this.state.data.indexOf(tile)]
      })

  }

  public handlePhotoClose = () => {
      this.setState({
          photoClick: false
      })
  }
}

export default withRoot(withStyles(styles)(Index));

