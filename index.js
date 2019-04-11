import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import LandingPage from './app/pages/LandingPage';
import TestPage from './app/pages/TestPage';

class App extends Component {
  render() {
    return (
      <LandingPage />
      // <TestPage />
      // <Routes />
    );
  }
}

AppRegistry.registerComponent('influencerAPP', () => App);
