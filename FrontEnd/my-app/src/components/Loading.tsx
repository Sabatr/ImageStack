import * as React from 'react'
import { Dialog, CircularProgress, DialogContent } from '../../node_modules/@material-ui/core';

interface IProps {
    loaded: any
}

class Loading extends React.Component<IProps,{}> {
    public render() {
        return (
            <Dialog open={this.props.loaded}>
                <DialogContent>
                    <CircularProgress />
                </DialogContent>
            </Dialog>
        )
    }
}

export default Loading