'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Navigator,
  View,
  Stylesheet,
} = React;

var LocalStorage = require('./stores/LocalStorage');
var MainScreen = require('./screens/MainScreen');
var LoginScreen = require('./screens/LoginScreen');

var caledoniawhisky = React.createClass({
  getInitialState() {
    return {
      bootstrapped: false
    }
  },

  componentWillMount() {
    LocalStorage.bootstrap(() => this.setState({
      bootstrapped: true
    }));
  },

  renderScene(route, nav) {
    console.log('renderScene');
    console.log(route);
    switch (route.id) {
      case 'authenticate':
        return <LoginScreen navigator={nav} />;
      case 'home':
        return <MainScreen navigator={nav} />;
      default:
        return <View />;
    }
  },

  render() {
    if (this.state.bootstrapped === false) {
      return <View />
    }

    return (
      <Navigator
        initialRoute={{ id: 'authenticate', }}
        renderScene={this.renderScene}
        configureScene={(route) => {
          if (route.sceneConfig) {
            return route.sceneConfig;
          }
          return Navigator.SceneConfigs.FloatFromRight;
        }} />
    );
  }
})

AppRegistry.registerComponent('caledoniawhisky', () => caledoniawhisky);
