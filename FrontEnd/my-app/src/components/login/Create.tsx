import * as React from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Loading from '../Loading';
import SuccessDialog from './SuccessDialog';

interface ICreate {
  createOpen: boolean,
  success: boolean,
  username: any,
  password: any,
  confirmpassword: any,
  email: any,
  loading: boolean
}

class Create extends React.Component<{}, ICreate> {
  constructor(props: any) {
    super(props);
    this.state = ({
      createOpen: false,
      username: "",
      password: "",
      confirmpassword: "",
      email: "",
      loading: false,
      success: false
    })
  }
  public render() {
    return (
      <>
        <Button variant="outlined" style={{width: '200px'}} onClick={this.handleOnCreate}>Create Account</Button>
        <this.makeCreate />
        <Loading loaded={this.state.loading} />
        <SuccessDialog message="Account created successfully!" isOpen={this.state.success} setSuccessful={this.setSuccess}/>
      </>
    );
  }

  public handleUserNameChange = (event: any) => {
    this.setState({
      username: event.target.value
    })
  }
  public handlePasswordChange = (event: any) => {
    this.setState({
      password: event.target.value
    })
  }
  public handleConfirmPasswordChange = (event: any) => {
    this.setState({
      confirmpassword: event.target.value
    })
  }
  public handleEmailChange = (event: any) => {
    this.setState({
      email: event.target.value
    })
  }

  public makeCreate = () => {
    return (
      <div>
        <Dialog
          open={this.state.createOpen}
          aria-labelledby="form-dialog-title"
          onClose={this.handleOnCreateClose}
        >
          <DialogTitle id="form-dialog-title">Create Account</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus={true}
              margin="dense"
              id="name"
              label="User Name"
              fullWidth={true}
              onChange={this.handleUserNameChange}
            />
            <TextField
              id="outlined-password-input"
              margin="dense"
              label="Password"
              type="password"
              fullWidth={true}
              onChange={this.handlePasswordChange}

            />
            <TextField
              id="outlined-password-input"
              margin="dense"
              label="Confirm Password"
              type="password"
              fullWidth={true}
              onChange={this.handleConfirmPasswordChange}
            />
            <TextField
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth={true}
              onChange={this.handleEmailChange}
            />

          </DialogContent>
          <DialogActions>
            <Button variant="outlined" color="primary" onClick={this.handleOnCreateClose}>
              Cancel
                  </Button>
            <Button variant="outlined" color="primary" onClick={this.handleCreateConfirm}>
              Create
                  </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  /**
   * Creating the dialog for creating account
   */
  public handleOnCreate = () => {
    this.setState({
      createOpen: true
    })
  }
  public handleOnCreateClose = () => {
    this.setState({
      createOpen: false,
      username: "",
      password: "",
      confirmpassword: "",
      email: "",
    })
  }
  public handleCreateConfirm = () => {
    this.isLoading();
    const formData = new FormData();
    if (this.state.password !== this.state.confirmpassword) {
      this.hasLoaded();
      alert("Passwords do not match");
      return;
    }
    formData.append("userName", this.state.username);
    formData.append("password", this.state.password);
    formData.append("email", this.state.email);
    formData.append("photos", "");
    this.addToAPI(formData);
    this.handleOnCreateClose();
  }

  public async addToAPI(formData: FormData) {
    const response = await fetch("https://photostorageapi.azurewebsites.net/api/Users", {
      body: formData,
      headers: { 'cache-control': 'no-cache' },
      method: 'POST'
    })
    if (!response.ok) {
      alert(response.statusText);
    } else {
      this.setState({
        success: true
      })
    }
    this.hasLoaded();
  }

  public isLoading = () => {
    this.setState({
      loading: true
    })
  }

  public hasLoaded = () => {
    this.setState({
      loading: false
    })
  }

  public setSuccess = (isSuccessful: boolean) => {
    this.setState({
      success: isSuccessful
    })
  }
}

export default Create