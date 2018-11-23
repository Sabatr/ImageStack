import * as React from 'react';
import './App.css';
// import LogInPanel from './components/login/LogInPanel';
import UserScreen from './components/MainScreen/UserScreen';
import Logo from './images/ImageStack1.png'

class App extends React.Component {
  public render() {
    return (
      <>
        <div style={{ backgroundColor: "#673ab7", textAlign:"center"}}>
          <img src={Logo} height="250px" width="500px" />
        </div>
        <div style={{paddingTop:"40px"}}>
          <UserScreen />
        </div>
      </>
    );
  }
}

export default App;
