'use strict';

var React = require('react-native');
var {
  PixelRatio,
  Navigator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Image,
} = React;

var cssVar = require('cssVar');
var UserActions = require('../actions/UserActions');
var BrowseComponent = require('./BrowseComponent');
var MenuComponent = require('./MenuComponent');

class RegionButton extends React.Component {
  render() {
    return (
      <TouchableHighlight
        style={styles.regionButton}
        underlayColor="#B5B5B5"
        onPress={this.props.onPress}>
        <View style={styles.regionButtonView}>
          <Image
            style={styles.regionButtonBG}
            source={{uri : "http://image.slidesharecdn.com/amazinglybeautifulscotland-090826121528-phpapp01/95/amazingly-beautiful-scotland-1-728.jpg?cb=1251307036"}}
          />
          <Text style={styles.regionButtonText}>{this.props.text}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

var NavigationBarRouteMapper = {

  LeftButton: function(route, navigator, index, navState) {
    if(route.id === "MENU"){
      return (
        <TouchableOpacity
          onPress={() => {
            navigator.pop();
          }}>
          <View style={styles.navBarLeftButton}>
            <Text style={[styles.navBarText, styles.menuNavBarButtonText]}>
              Close
            </Text>
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={() => {
            navigator.push({ id: 'MENU' });
          }}>
          <View style={styles.navBarLeftButton}>
            <Text style={[styles.navBarText, styles.navBarButtonText]}>
              Menu
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
  },

  RightButton: function(route, navigator, index, navState) {
    if(route.id === "MENU")
      return;

    return (
      <TouchableOpacity
        onPress={() => navigator.push({
          title: 'BROWSE',
        })}>
        <View style={styles.navBarRightButton}>
          <Text style={[styles.navBarText, styles.navBarButtonText]}>
            Share
          </Text>
        </View>
      </TouchableOpacity>
    );
  },

  Title: function(route, navigator, index, navState) {
    if(route.id === "MENU"){
      return (
        <Text style={[styles.navBarText, styles.menuNavBarTitleText]}>
          MALTED
        </Text>
      );
    } else {
      return (
        <Text style={[styles.navBarText, styles.navBarTitleText]}>
          {route.id}
        </Text>
      );
    }
  }
};

function newRandomRoute() {
  return {
    title: '#' + Math.ceil(Math.random() * 1000),
  };
}

var MainScreen = React.createClass({

  renderScene: function(route, nav) {
    switch (route.id) {
      case 'MENU':
        return <MenuComponent navigator={nav} />;
      case 'BROWSE':
        return <BrowseComponent navigator={nav} />;
      case 'PROFILE':
        return <BrowseComponent navigator={nav} />;
      default:
        return <BrowseComponent navigator={nav} />;
    }
  },

  render: function() {

    return (
      <Navigator
        debugOverlay={false}
        style={styles.appContainer}
        initialRoute={{title: 'BROWSE'}}
        renderScene={this.renderScene}
        configureScene={(route) => {
          if (route.sceneConfig) {
            return route.sceneConfig;
          }
          return Navigator.SceneConfigs.FloatFromBottom;
        }}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={NavigationBarRouteMapper}
            style={styles.navBar}
          />
        }
      />
    );
  },

});

var styles = StyleSheet.create({
  navBar: {
    backgroundColor: 'transparent',
  },
  navBarText: {
    fontSize: 16,
    marginVertical: 10,
  },
  navBarTitleText: {
    color: cssVar('fbui-bluegray-60'),
    fontWeight: '500',
    marginVertical: 9,
  },
  menuNavBarTitleText: {
    color: "white",
    fontWeight: '500',
    marginVertical: 9,
  },
  navBarLeftButton: {
    paddingLeft: 10,
  },
  navBarRightButton: {
    paddingRight: 10,
  },
  navBarButtonText: {
    color: cssVar('fbui-accent-blue'),
  },
  menuNavBarButtonText: {
    color: "white",
  },
  scene: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#ffffff',
  },
});

module.exports = MainScreen;
