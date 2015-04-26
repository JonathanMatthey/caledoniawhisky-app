'use strict';


var React = require('react-native');
var {
  AppRegistry,
  Navigator,
  View,
  Stylesheet,
  Text,
} = React;

var LocalStorage = require('./stores/LocalStorage');
var UserStore = require('./stores/UserStore');
var UserInfoScreen = require('./screens/UserInfoScreen');
var MainScreen = require('./screens/MainScreen');
var LoginScreen = require('./screens/LoginScreen');

var caledoniawhisky = React.createClass({
  getInitialState() {
    return {bootstrapped: false}
  },

  componentWillMount() {
    console.log('indexiojs - 26 ');
    LocalStorage.bootstrap(() => this.setState({bootstrapped: true}));
  },

  renderScene(route, nav) {
    switch (route.id) {
      case 'authenticate':
        return <LoginScreen navigator={nav} />;
      case 'user-info':
        return <MainScreen navigator={nav} />;
      default:
        return <View />;
    }
  },

  render() {
    console.log('indexiojs -43 ');
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

console.log('indexiojs - AA ');

// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  */
// 'use strict';

// var React = require('react-native');
// var {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   View,
// } = React;

// var SampleApp = React.createClass({
//   render: function() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>
//           Welcome to React Native!
//         </Text>
//         <Text style={styles.instructions}>
//           To get started, edit index.ios.js
//         </Text>
//         <Text style={styles.instructions}>
//           Press Cmd+R to reload,{'\n'}
//           Cmd+Control+Z for dev menu
//         </Text>
//       </View>
//     );
//   }
// });

// var styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });

// AppRegistry.registerComponent('SampleApp', () => SampleApp);
