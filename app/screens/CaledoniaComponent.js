'use strict';

var React = require('react-native');
var {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableHighlight,
} = React;

var styles = require('./Styles');
var UserActions = require('../actions/UserActions');

class CaledoniaComponent extends React.Component {

  signout(event){
    UserActions.deleteUserSession();
  }

  render() {
    return (
      <View style={styles.loginContainer}>
        <Image
          style={styles.loginBGImage}
          source={{uri : "http://image.slidesharecdn.com/amazinglybeautifulscotland-090826121528-phpapp01/95/amazingly-beautiful-scotland-1-728.jpg?cb=1251307036"}}
        >
        </Image>
        <Image
          style={styles.caledoniaLogo}
          source={require('image!caledonia-logo')}
        >
        </Image>
        <Text style={styles.title}>
          HOME SCREEN
        </Text>
        <TouchableHighlight onPress={() => this.signout()}>
          <Text>signout-link</Text>
        </TouchableHighlight>
        <Text style={styles.title}>
          - [ ] MyNotes screen
        </Text>
        <Text style={styles.title}>
          - [ ] Polish ScotchPage
        </Text>
        <Text style={styles.title}>
          - [ ] newest caledonian
        </Text>
        <Text style={styles.title}>
          - [ ] stats
        </Text>
        <Text style={styles.title}>
          - [ ] upcoming events
        </Text>
      </View>
    );
  }
}


module.exports = CaledoniaComponent;
