import * as React from 'react'
import ChatBot from 'react-simple-chatbot';
interface IState {
    showBot: boolean
}

interface IProps {
    username: any
}
class PhotoChatBot extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = ({
            showBot: false
        })
    }
    public render() {
        return (
            <div>
                <this.showChatBot />
            </div>

        );
    }

    public showChatBot = () => {
        return (
            <ChatBot
                floating={true}
                headerTitle="ImageStack Support"
                hideSubmitButton={true}
                steps={[
                    {
                        id: '1',
                        message: 'Hi ' +this.props.username+', what would you like help with?',
                        trigger: '2',
                    },
                    {
                        id: '2',
                        options: [
                            { value: 1, label: 'Photos', trigger: '3' },
                            { value: 2, label: 'Profile', trigger: '4' },
                        ],
                    },
                    {
                        id: '3',
                        message: 'What about would you like to know about Photos?',
                        trigger: '5',
                    },
                    {
                        id: '5',
                        options: [
                            { value: 1, label: 'Adding a photo', trigger: '6' },
                            { value: 2, label: 'Editing a photo', trigger: '7' },
                        ],
                    },
                    {
                        id: '6',
                        message: 'What would you like to know about adding a photo?',
                        trigger: 'addingOptions',
                    },
                    {
                        id: 'addingOptions',
                        options: [
                            { value: 1, label: 'General', trigger: 'General' },
                            { value: 2, label: 'Upload', trigger: 'Upload' },
                            { value: 2, label: 'Camera', trigger: 'Camera' },
                        ],
                    },
                    {
                        id: 'General',
                        message: 'To add a new photo, simply select the add a photo button. Make sure you have a title.'+
                         'Descriptios are optional. Please select one of the photo options before uploading!',
                        trigger: '1',
                    },
                    {
                        id: 'Upload',
                        message: 'Files only take in image files. For example, .png and .jpeg. Please do not try to upload other types.',
                        trigger: '1',
                    },
                    {
                        id: 'Camera',
                        message: 'Simply press Take Screenshot to take a photo from the webcam. This will automatically be added.',
                        trigger: '1',
                    },
                    {
                        id: '7',
                        message: 'You can simply press any of the buttons to perform actions. Hover over them to determine what they are.'+
                        '\nTo edit: Select edit and confirm after you make any changes.\nTo delete: press delete and confirm.',
                        trigger: '1',
                    },
                    {
                        id: '4',
                        message: 'What would you like to know about profiles?',
                        trigger: 'profileOptions'
                    },
                    {
                        id: 'profileOptions',
                        options: [
                            { value: 1, label: 'Edit profile information', trigger: '8' },
                            { value: 2, label: 'Delete Account', trigger: '9' },
                        ],
                    },

                    {
                        id: '8',
                        message: 'Currently, you can only change your password. To do so, press the button in the middle and press profile.'+
                        '\nA changed password should be there.',
                        trigger: '1'
                    },
                    {
                        id: '9',
                        message: 'WARNING: Deleting your account will delete all photos correlated to that account. Be warned!',
                        trigger: '1'
                    },
                ]}
            />
        )
    }
}

export default PhotoChatBot