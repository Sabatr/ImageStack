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
import AddDialog from './AddDialog';
import InputBase from '@material-ui/core/InputBase'
import Check from '@material-ui/icons/Check'
import Close from '@material-ui/icons/Close'
import ShareButton from './ShareButton';
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
    },
    margin: {
      margin: theme.spacing.unit,
    },
    dialogTitle: {
      margin: theme.spacing.unit,
      fontSize: 20,
      paddingLeft: 15,
      paddingTop: 15
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
  uploadFileList: any,
  editing: boolean
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
      uploadFileList: null,
      editing: false
    })
    this.storeInfo = this.storeInfo.bind(this);

  }

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

  /**
   * Displays the popup when the user selects fullscreen
   */
  public displayContent = () => {
    return (
      <Paper>
        <Dialog open={this.state.photoClick}
          onClose={this.handlePhotoClose}
          scroll='body'
          fullWidth={true}
          aria-labelledby="scroll-dialog-title">
          {!this.state.editing ?
            <DialogTitle id="form-dialog-title">
              {this.state.selectedPhoto.photoTitle}
            </DialogTitle>
            :
            <InputBase className={this.props.classes.dialogTitle}
              defaultValue={this.state.selectedPhoto.photoTitle}
              onChange={this.handleTitleChange} 
              autoFocus={true}/>
          }
          <DialogContent className={this.state.selectedPhoto.photoTitle} >
            {!this.state.editing ?
              <DialogContentText>{this.state.selectedPhoto.photoDescription} </DialogContentText>
              :
              <InputBase
                multiline={true}
                fullWidth={true}
                defaultValue={this.state.selectedPhoto.photoDescription}
                onChange={this.handleDescriptionChange}
              />
            }

            <img src={this.state.selectedPhoto.photoUrl} height='100%' width='100%' />
            {!this.state.editing ?
              <div style={{display: 'inline-block'}}>
                <IconButton onClick={this.enableEdit}><Edit /> </IconButton>
                <IconButton onClick={this.handleDeleteClick}>
                  <Delete />
                </IconButton>
                <ShareButton photo={this.state.selectedPhoto}/>
              </div>
              :
              <div>
                <IconButton onClick={this.confirmEdit}><Check /></IconButton>
                <IconButton onClick={this.disableEdit}><Close /></IconButton>
              </div>
            }
            <this.confirmDelete />
          </DialogContent>
        </Dialog>
      </Paper>
    );
  }

  /**
   * Creates the dialog for deletion
   */
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

  public async deletePhoto() {
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
  
  /**
   * This section is for editing the photos
   * NOTE: Cannot edit the image. Just the title and the description.
   */
  public enableEdit = () => {
    this.setState({
      editing: true,
      title: this.state.selectedPhoto.photoTitle,
      description: this.state.selectedPhoto.photoDescription
    })
  }

  public disableEdit = () => {
    this.setState({
      editing: false
    })
  }

  public confirmEdit = () => {
    this.disableEdit();
    this.editInDataBase();
    this.handlePhotoClose();
  }

  public async editInDataBase() {
    if (this.state.title === "") {
      alert("Please enter a title");
      return;
    }

    const response = await fetch("https://photostorageapi.azurewebsites.net//api/Photos/" + this.state.selectedPhoto.photoId, 
    {
      body: JSON.stringify({
        "photoId": this.state.selectedPhoto.photoId,
        "photoTitle": this.state.title,
        "photoDescription": this.state.description,
        "photoUrl": this.state.selectedPhoto.photoUrl,
        "dateMade": this.state.selectedPhoto.dateMade,
        "userRefId": this.state.selectedPhoto.userRefId
      }),
      headers: {'cache-control': 'no-cache','Content-Type': 'application/json'},
      method: 'PUT'
    })
    
    if (!response.ok) {
      alert(response.statusText)
    } else {
      this.storeInfo();
      this.forceUpdate();
    }
  }

  public handleTitleChange = (event: any) => {
    this.setState({
      title: event.target.value
    })
  }

  public handleDescriptionChange = (event: any) => {
    this.setState({
      description: event.target.value
    })
  }
  public handlePhotoClose = () => {
    this.disableEdit();
    this.setState({
      photoClick: false
    })
  }
}

export default withRoot(withStyles(styles)(Index));

