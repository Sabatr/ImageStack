import * as React from 'react'
import ChatBot from 'react-simple-chatbot';
interface IState {
    showBot: boolean
}
class CustomChatBot extends React.Component<{}, IState> {
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
                        message: 'To log in..',
                        trigger: 'ChooseHelp'
                    },
                    {
                        id: 'CreateAccount',
                        message: 'To create an account',
                        trigger: 'ChooseHelp'
                    },
                    {
                        id: 'ForgotPassword',
                        message: 'To retrieve your password..',
                        trigger: 'ChooseHelp'
                    },
                ]}
            />
        )
    }
}

export default CustomChatBot