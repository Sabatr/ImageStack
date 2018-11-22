import * as React from 'react'
// import { Dialog, DialogContent, Button, DialogTitle, DialogActions, TextField } from '../../../node_modules/@material-ui/core';
import Button from '@material-ui/core/Button'


interface IState {
    open: boolean
}
class TakePhoto extends React.Component<{}, IState> {
    constructor(props: any) {
        super(props);
        this.state = ({
            open: false
        })
    }
    public render() {
        return (
            <div>
                <Button>Take photo</Button>
            </div>

        );
    }


}

export default TakePhoto