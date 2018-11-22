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
import { Theme, Dialog, DialogContent, Button, Paper, DialogTitle, DialogContentText, IconButton, DialogActions, Input } from '../../../node_modules/@material-ui/core';
// import { withStyles, Theme } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Fullscreen from '@material-ui/icons/Fullscreen'
import grey from '@material-ui/core/colors/grey'
import Delete from '@material-ui/icons/Delete'
import Edit from '@material-ui/icons/Edit'
import Share from '@material-ui/icons/Share'
import TextField from '@material-ui/core/TextField';
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
    this.handleFileUpload = this.handleFileUpload.bind(this);
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

  public makeAddDialog = () => {
    return (
      <div>
        <Dialog
          open={this.state.add}
          aria-labelledby="form-dialog-title"
          onClose={this.handleOnCreateClose}
        >
          <DialogTitle id="form-dialog-title">Add a photo</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus={true}
              margin="dense"
              id="name"
              label="Title"
              fullWidth={true}
              onChange={this.handleTitleChange}
            />
            <TextField
              id="outlined-password-input"
              margin="dense"
              label="Description"
              rows={4}
              rowsMax={4}
              fullWidth={true}
              onChange={this.handleDescriptionChange}

            />
            <Input type="file" onChange={this.handleFileUpload} className="form-control-file" />
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.handleOnCreateClose}>
              Cancel
                  </Button>
            <Button color="primary" onClick={this.handleAdd}>
              Add
                  </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }

  public handleTitleChange = (event: any) => {
    this.setState({
      title: event.target.value
    })
  }

  public handleDescriptionChange = (event: any) => [
    this.setState({
      description: event.target.value
    })
  ]

  public handleOnCreate = () => {
    this.setState({
      add: true
    })
  }
  public handleOnCreateClose = () => {
    this.setState({
      add: false
    })
  }

  public handleAdd = () => {
    const imageFile = this.state.uploadFileList[0]
    // Should also add to the api. Then when it rerenders it will include the api with it.
    const formData = new FormData();
    formData.append("photoTitle", this.state.title);
    formData.append("photoDescription", this.state.description);
    formData.append("userId",this.props.username);
    formData.append("image",imageFile);
    this.addNew(formData);
    this.handleOnCreateClose();
  }

  public async addNew(formData: FormData) {
    const response = await fetch("https://photostorageapi.azurewebsites.net/api/Photos/Upload/" + this.props.username, {
      body: formData,
      headers: { 'cache-control': 'no-cache' },
      method: 'POST'
    })
    if (response.ok) {
      alert("Success!");
      this.forceUpdate();
    } else {
      alert(response.statusText);
    }
  }

  public handleFileUpload(fileList: any) {
    this.setState({
      uploadFileList: fileList.target.files
    })
  }

  public render() {
    return (
      <div className={this.props.classes.root} style={{ textAlign: 'center' }}>
        <Button onClick={this.handleOnCreate}>Add</Button>
        <GridList cellHeight={350} cols={5} className={this.props.classes.gridList}>
          {this.state.data.map((photo: any) => (
            <GridListTile key={photo.photoId}>
              <img src={photo.photoUrl} alt={photo.photoTitle} />
              <GridListTileBar
                title={photo.phototitle}
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
        <this.makeAddDialog />
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

  public deletePhoto() {
    // DOES SOME STUFF TO DELETE FROM API TOO.
    const list: any = this.state.data
    const position: any = this.state.data.indexOf(this.state.selectedPhoto);
    list.splice(position, 1);
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

