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
var HomeComponent = require('./HomeComponent');
var BrowseComponent = require('./BrowseComponent');
var ProfileComponent = require('./ProfileComponent');
var SettingsComponent = require('./SettingsComponent');
var ScotchListComponent = require('./ScotchListComponent');
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

  setTextColor: function(clr){
    return { color: clr }
  },

  LeftButton: function(route, navigator, index, navState) {
    if(route.id === "MENU"){
      return (
        <TouchableOpacity
          onPress={() => {
            navigator.pop();
          }}>
          <View style={styles.navBarLeftButton}>
            <Text style={[styles.navBarText, styles.menuNavBarButtonText]}>
              X
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
            <Text style={[styles.navBarText, styles.navBarTextDefault]}>
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
          <Text style={[styles.navBarText, styles.navBarTextDefault]}>
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
          {route.title}
        </Text>
      );
    }
  }
};

var MainScreen = React.createClass({

  renderScene: function(route, nav) {
    switch (route.id) {
      case 'MENU':
        return <MenuComponent navigator={nav} />;
      case 'HOME':
        return <HomeComponent navigator={nav} />;
      case 'BROWSE':
        return <BrowseComponent navigator={nav} />;
      case 'SCOTCHLIST':
        return <ScotchListComponent navigator={nav} />;
      case 'PROFILE':
        return <ProfileComponent navigator={nav} />;
      case 'SETTINGS':
        return <SettingsComponent navigator={nav} />;
      default:
        return <HomeComponent navigator={nav} />;
    }
  },

  render: function() {
    return (
      <Navigator
        debugOverlay={false}
        style={styles.appContainer}
        initialRoute={{title: '', id: 'HOME'}}
        renderScene={this.renderScene}
        configureScene={(route) => {
          if (route.sceneConfig) {
            return route.sceneConfig;
          }
          return Navigator.SceneConfigs.FloatFromRight;
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
  navBarTextDefault:{
    color: "#C18951",
  },
  navBarTitleText: {
    color: cssVar('fbui-bluegray-60'),
    fontWeight: '500',
    marginVertical: 9,
  },
  menuNavBarTitleText: {
    marginVertical: 9,
    fontSize: 22,
    color:"white",
    fontFamily: "Avenir Next",
    letterSpacing: 1.2,
    fontWeight: "bold",
  },
  navBarLeftButton: {
    paddingLeft: 10,
  },
  navBarRightButton: {
    paddingRight: 10,
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
