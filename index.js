import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import LandingPage from './app/pages/LandingPage';

class App extends Component {
  render() {
    return (
      <LandingPage />
      // <Routes />
    );
  }
}

AppRegistry.registerComponent('influencerAPP', () => App);
