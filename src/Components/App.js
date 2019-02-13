import React, { Component } from 'react';
import Router from 'Components/Router';
import GlobalStyles from 'Styles/GlobalStyles';
import { UIProvider } from 'Context/UI';

class App extends Component {
  render() {
    return (
      <UIProvider>
        <Router />
        <GlobalStyles />
      </UIProvider>
    );
  }
}

export default App;
