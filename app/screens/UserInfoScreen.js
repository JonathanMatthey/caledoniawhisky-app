'use strict';

var React = require('react-native');
var {
  Text,
  View,
  Image,
  Navigator,
  TouchableOpacity,
} = React;

var UserStore = require('../stores/UserStore');
var UserStoreSync = require('../mixins/UserStoreSync');
var styles = require('./Styles');
var UserActions = require('../actions/UserActions');

var UserInfoScreen = React.createClass({
  mixins: [UserStoreSync],

  signout(event){
    UserActions.deleteUserSession();
  },

  afterUpdateUserFromStore() {
    var user = UserStore.getState();

    if (!user.get('email')){
      this.props.navigator.replace({id: 'authenticate'});
    }
  },

  render() {
    return (
      <View style={styles.background}>
        <View style={styles.backgroundVideo} />

        <View style={styles.backgroundOverlay} />

        <View style={styles.contentContainer}>
          <Image source={{uri: this.state.user.getIn(['picture', 'data', 'url'])}}
                 style={styles.profilePicture} />
          <Text style={styles.name}>
            {this.state.user.get('name')}
          </Text>
        </View>
        <TouchableOpacity onPress={this.signout}>
          <Text style={[styles.btn,styles.btnSignInText]}>SIGN OUT</Text>
        </TouchableOpacity>
      </View>
    )
  }
});

module.exports = UserInfoScreen;
