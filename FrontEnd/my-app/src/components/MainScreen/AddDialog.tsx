import * as React from 'react';
import { Dialog, DialogContent, Button, DialogTitle, DialogActions, Input, IconButton } from '../../../node_modules/@material-ui/core';
import TextField from '@material-ui/core/TextField'
import TakePhoto from './TakePhoto'
import FileCopy from '@material-ui/icons/FileCopy'
import ExitToApp from '@material-ui/icons/ExitToApp'
import Loading from '../Loading';


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

    public render() {
        return (
            <div>
                <Button onClick={this.handleOnCreate}>Add</Button>
                <this.makeAddDialog />
                <Loading loaded={this.state.loading} />
            </div>
        )
    }
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
                        {this.state.uploadFileList !== null || this.state.imageFile !== null ?
                            <div>
                                <IconButton onClick={this.handleRemoveSelected}><ExitToApp /></IconButton>
                                <h1>placeholdeer</h1>
                            </div>
                            :
                            <div>
                                <Input type="file" onChange={this.handleFileUpload} id="raised-button-file" className="form-control-file" style={{ display: 'none' }} />
                                <label htmlFor="raised-button-file">
                                    <IconButton component="span"><FileCopy /></IconButton>
                                </label>
                                <TakePhoto handleFileUpload={this.convertBase64ToFile} />
                            </div>
                        }
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

    public handleRemoveSelected = () => {
        this.setState({
            uploadFileList: null,
            imageFile: null
        })
    }
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

    public handleAdd = () => {
        this.isLoading();
        if (this.state.title === "" || this.state.uploadFileList === undefined) {
            alert("no image selected");
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
}

export default AddDialog