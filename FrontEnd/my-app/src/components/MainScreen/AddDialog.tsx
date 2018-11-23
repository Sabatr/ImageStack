import * as React from 'react';
import { Dialog, DialogContent, Button, DialogTitle, DialogActions, Input, Icon, Tooltip } from '../../../node_modules/@material-ui/core';
import TextField from '@material-ui/core/TextField'
import TakePhoto from './TakePhoto'
import Publish from '@material-ui/icons/Publish'
import Close from '@material-ui/icons/Close'
import Loading from '../Loading'
import Add from '@material-ui/icons/Add'

interface IProps {
    username: any,
    storeInfo: () => void,
}

interface IState {
    add: boolean,
    title: any,
    description: any,
    uploadFileList: any
    imageFile: any,
    typeOfButton: buttonClicked,
    loading: boolean
}

enum buttonClicked {
    none,
    camera,
    upload
}

/**
 * Creates a component for the addition of new photos.
 * 
 * @author Brian Nguyen
 */
class AddDialog extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = ({
            add: false,
            title: "",
            description: "",
            uploadFileList: null,
            imageFile: null,
            typeOfButton: buttonClicked.none,
            loading: false
        })
        this.handleFileUpload = this.handleFileUpload.bind(this);
    }

    /**
     * When the dialog closes, reset parameters.
     */
    public handleRemoveSelected = () => {
        this.setState({
            title: "",
            description: "",
            uploadFileList: null,
            imageFile: null
        })
    }

    /**
     * Handler for creating a new photo
     */
    public handleOnCreate = () => {
        this.setState({
            add: true
        })
    }
    public handleOnCreateClose = () => {
        this.setState({
            add: false
        })
        this.handleRemoveSelected();
    }

    /**
     * Keeps track of the input fields' values.
     */
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
    public handleFileUpload(fileList: any) {
        this.setState({
            uploadFileList: fileList.target.files,
            typeOfButton: buttonClicked.upload
        })
    }

    /**
     * Determines if the loading symbol needs to be rendered.
     */
    public hasLoaded = () => {
        this.setState({
            loading: false
        })
    }
    public isLoading = () => {
        this.setState({
            loading: true
        })
    }

    /**
     * Checks if the input in the text fields and files are legal.
     * The file is appended as form data.
     */
    public handleAdd = () => {
        this.isLoading();
        if (this.state.title === "" || this.state.uploadFileList === undefined) {
            alert("no image selected");
            this.hasLoaded();
            this.handleOnCreateClose();
            return;
        }
        let imageFile;
        (this.state.typeOfButton === buttonClicked.upload) ? imageFile =
            this.state.uploadFileList[0] : imageFile = this.state.imageFile
        // Should also add to the api. Then when it rerenders it will include the api with it.
        const formData = new FormData();
        formData.append("photoTitle", this.state.title);
        formData.append("photoDescription", this.state.description);
        formData.append("userId", this.props.username);
        formData.append("image", imageFile);
        this.addNew(formData);
        this.handleOnCreateClose();
    }

    /**
     * Converts base64 string to file.
     * Credit: https://forums.meteor.com/t/base64-convert-back-to-file/34188
     */
    public convertBase64ToFile = (image: any) => {
        const byteString = atob(image.split(',')[1]);
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const int8array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i += 1) {
            int8array[i] = byteString.charCodeAt(i);
        }
        const newBlob = new Blob([arrayBuffer], {
            type: 'image/jpeg',
        });

        this.setState({
            imageFile: newBlob,
            typeOfButton: buttonClicked.camera
        })
    };

    /**
     * Creates a new photo and stores it in the api using a POST
     * request. 
     */
    public async addNew(formData: FormData) {
        const response = await fetch("https://photostorageapi.azurewebsites.net/api/Photos/Upload/" + this.props.username, {
            body: formData,
            headers: { 'cache-control': 'no-cache' },
            method: 'POST'
        })
        if (response.ok) {
            this.hasLoaded();
            this.props.storeInfo();
            this.forceUpdate();
        } else {
            this.hasLoaded();
            alert(response.statusText);
        }
    }

    /**
     * Creates a dialog for the addition of photos. 
     * If statements are used to rerender the components when necessary.
     */
    public makeAddDialog = () => {
        return (
            <div>
                <Dialog
                    open={this.state.add}
                    aria-labelledby="form-dialog-title"
                    onClose={this.handleOnCreateClose}
                >
                    <DialogTitle 
                    id="form-dialog-title">
                        Add a photo
                    </DialogTitle>
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
                            variant="outlined"
                            multiline={true}
                            rows={4}
                            rowsMax={4}
                            fullWidth={true}
                            onChange={this.handleDescriptionChange}
                        />
                        {this.state.uploadFileList !== null || this.state.imageFile !== null ?
                            <div>
                                <Tooltip title="Remove">
                                    <Button variant="outlined" 
                                    onClick={this.handleRemoveSelected}>
                                        Click to remove image.
                                        <Icon>
                                            <Close style={{color:"red"}}/>
                                        </Icon>
                                    </Button>
                                </Tooltip>
                            </div>
                            :
                            <div style={{display: 'table', textAlign: 'center' ,paddingTop:'20px'}}>
                                <div style={{ display: 'table-cell' , paddingRight: '20px'}} >
                                    <Input 
                                    type="file" 
                                    onChange={this.handleFileUpload} 
                                    id="raised-button-file" 
                                    className="form-control-file" 
                                    style={{ display: 'none' }} 
                                    />
                                    <label 
                                    htmlFor="raised-button-file">
                                        <Button 
                                        variant="raised" 
                                        component="span">
                                            Upload
                                            <Icon>
                                                <Publish/>
                                            </Icon>
                                        </Button>
                                    </label>
                                </div>
                                <div style={{ display: 'table-cell'}}  >
                                    <TakePhoto handleFileUpload={this.convertBase64ToFile} />
                                </div>
                            </div>
                        }
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" color="primary" onClick={this.handleOnCreateClose}>
                            Cancel
                      </Button>
                        <Button variant="outlined" color="primary" onClick={this.handleAdd}>
                            Add
                </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }

    public render() {
        return (
            <div style={{paddingTop:'10px'}} >
                <Button variant="raised" 
                color="primary"
                onClick={this.handleOnCreate}>
                    Add a photo
                    <Icon>
                        <Add/>
                    </Icon>
                </Button>
                <this.makeAddDialog />
                <Loading loaded={this.state.loading} />
            </div>
        )
    }
}

export default AddDialog