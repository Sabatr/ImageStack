import * as React from 'react';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import withRoot from './WithRoot';
import { Theme, Dialog, DialogContent, Button, Paper, DialogTitle, DialogContentText, IconButton, DialogActions } from '../../../node_modules/@material-ui/core';
// import { withStyles, Theme } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Fullscreen from '@material-ui/icons/Fullscreen'
import grey from '@material-ui/core/colors/grey'
import Delete from '@material-ui/icons/Delete'
import Edit from '@material-ui/icons/Edit'
import Share from '@material-ui/icons/Share'
import AddDialog from './AddDialog';
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
      color: grey[100],
      '&:hover': {
        color: grey[0],
      }
    }
  });


interface IState {
  open: boolean,
  photoClick: boolean,
  data: any,
  add: boolean,
  selectedPhoto: any,
  confirmation: boolean,
  description: any,
  title: any,
  uploadFileList: any
};

interface IProps extends WithStyles<typeof styles> {
  username: any
}

class Index extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = ({
      data: [],
      open: false,
      photoClick: false,
      add: false,
      selectedPhoto: "",
      confirmation: false,
      description: "",
      title: "",
      uploadFileList: null
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

  public render() {
    return (
      <div className={this.props.classes.root} style={{ textAlign: 'center' }}>
        <AddDialog username={this.props.username} storeInfo={this.storeInfo} />
        <GridList cellHeight={350} cols={5} className={this.props.classes.gridList}>
          {this.state.data.map((photo: any) => (
            <GridListTile key={photo.photoId}>
              <img src={photo.photoUrl} alt={photo.photoTitle} />
              <GridListTileBar
                title={photo.photoTitle}
                subtitle={<span>Made on: {photo.dateMade}</span>}
                actionIcon={
                  <IconButton onClick={this.handlePhotoClick.bind(this, photo)} className={this.props.classes.icon}>
                    <Fullscreen className={this.props.classes.icon} />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
        <this.displayContent />
      </div>
    );
  }

  public async storeInfo() {
    const photoList = await fetch("https://photostorageapi.azurewebsites.net/api/Photos/" + this.props.username);
    const photoData = await photoList.json();
    this.setState({
      data: photoData
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
          <DialogTitle id="form-dialog-title">{this.state.selectedPhoto.photoTitle}</DialogTitle>
          <DialogContent className={this.state.selectedPhoto.photoTitle} >
            <DialogContentText>{this.state.selectedPhoto.photoDescription} </DialogContentText>
            <img src={this.state.selectedPhoto.photoUrl} height='100%' width='100%' />
            <IconButton><Edit /> </IconButton>
            <IconButton onClick={this.handleDeleteClick}>
              <Delete />
            </IconButton>
            <this.confirmDelete />
            <IconButton><Share /></IconButton>
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

  public async deletePhoto() {
    // DOES SOME STUFF TO DELETE FROM API TOO
    console.log(this.state.selectedPhoto.id);
    const response = await fetch("https://photostorageapi.azurewebsites.net//api/Photos/" + this.state.selectedPhoto.photoId, {
      method: 'DELETE'
    })
    if (response.ok) {
      this.storeInfo();
      this.forceUpdate();
    } else {
      alert(response.statusText)
    }
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

