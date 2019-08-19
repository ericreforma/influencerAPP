import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import Routes from './app/routes';

class App extends Component {
  render() {
    return (
      <Routes />
    );
  }
}

AppRegistry.registerComponent('influencerAPP', () => App);
