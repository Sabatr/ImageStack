import * as React from 'react'
import ChatBot from 'react-simple-chatbot';
interface IState {
    showBot: boolean
}

interface IProps {
    logIn: () => void
    setGuest: (name: any, password: any) => void
}
class CustomChatBot extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = ({
            showBot: false
        })
    }
    public render() {
        return (
            <div>
                <this.showChatBot/>
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
                        message: 'Welcome to ImageStack, would you like some help?',
                        trigger: '2',
                    },
                    {
                        id: '2',
                        options: [
                            { value: 1, label: 'Yes', trigger: '3' },
                        ],
                    },
                    {
                        id: '3',
                        message: 'What would you like help with?',
                        trigger: 'ChooseHelp',
                    },
                    {
                        id: 'ChooseHelp',
                        options: [
                            { value: 1, label: 'Log In', trigger: 'LogIn' },
                            { value: 2, label: 'Create an account', trigger: 'CreateAccount' },
                            { value: 3, label: 'Forgot password', trigger: 'ForgotPassword' },
                        ],
                    },
                    {
                        id: 'LogIn',
                        message: 'You must have an existing account to log in. Woud you like to log in to a pubilc account?\n',
                        trigger: 'ChooseLogIn'
                    },
                    {
                        id: 'ChooseLogIn',
                        options: [
                            { value: 1, label: 'Yes', trigger: this.guestLogIn },
                            { value: 2, label: 'No', trigger: 'ChooseHelp' },
                        ],
                    },
                    {
                        id: 'CreateAccount',
                        message: 'To create an account, click the create account button. You must be enter a valid username and'+
                        ' password.',
                        trigger: 'ChooseHelp'
                    },
                    {
                        id: 'ForgotPassword',
                        message: 'DOES NOT WORK. To be implemented in the future.',
                        trigger: 'ChooseHelp'
                    },
                ]}
            />
        )
    }

    public guestLogIn =() => {
        this.props.setGuest("guest","guest");
        this.props.logIn();
    }
}

export default CustomChatBot