import * as React from 'react';
import './App.css';
import LogInPanel from './components/login/LogInPanel';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <p className="App-intro">
          <LogInPanel/>
        </p>
      </div>
    );
  }
}

export default App;
