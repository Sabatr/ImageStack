import * as React from 'react';
import './App.css';
// import LogInPanel from './components/login/LogInPanel';
 import UserScreen from './components/MainScreen/UserScreen';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <p className="App-intro">
          <UserScreen/>
        </p>
      </div>
    );
  }
}

export default App;
