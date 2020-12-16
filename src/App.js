import React from 'react';
import Application from './components/Application';
import 'typeface-roboto';
import UserProvider from './providers/UserProvider';

class App extends React.Component {
  render() {
    return (
      <UserProvider>
        <Application />
      </UserProvider>);
  }
}

export default App;
