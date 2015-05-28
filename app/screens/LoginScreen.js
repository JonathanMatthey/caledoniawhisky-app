'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Navigator,
  AlertIOS,
  TextInput,
  Button,
  TouchableHighlight,
} = React;

var UserActions = require('../actions/UserActions');
var UserStore = require('../stores/UserStore');
var UserActions = require('../actions/UserActions');
var styles = require('./Styles');
var UserStoreSync = require('../mixins/UserStoreSync');
var DeviceHeight = require('Dimensions').get('window').height;

var LoginScreen = React.createClass({
  mixins: [UserStoreSync],

  getInitialState() {
    return {
      modalIsOpen: false,
      username: '',
      password: ''
    }
  },

  openModal() {
    this.setState({modalIsOpen: true});
  },

  closeModal() {
    this.setState({modalIsOpen: false});
  },

  fblogin() {
    UserActions.newFacebookSession();
  },

  login(event){
    if(this.state.username.length){
      UserActions.createUserSession(this.state.username,this.state.password);
    } else {
      UserActions.createUserSession("bob@bob.com","bob");
    }
  },

  afterUpdateUserFromStore() {
    var user = UserStore.getState();
    if (user.get('email')) {
      this.props.navigator.replace({id: 'home'});
    }
  },

  showModalTransition(transition) {
    transition('opacity', {duration: 200, begin: 0, end: 1});
    transition('height', {duration: 200, begin: DeviceHeight * 2, end: DeviceHeight});
  },

  hideModalTransition(transition) {
    transition('height', {duration: 200, begin: DeviceHeight, end: DeviceHeight * 2, reset: true});
    transition('opacity', {duration: 200, begin: 1, end: 0});
  },

  render() {
    return (
      <View style={styles.loginContainer}>
        <Image
          style={styles.loginBGImage}
          source={{uri : "http://image.slidesharecdn.com/amazinglybeautifulscotland-090826121528-phpapp01/95/amazingly-beautiful-scotland-1-728.jpg?cb=1251307036"}}
        >
        </Image>
          <Text style={styles.title}>
            LOGIN
          </Text>
          <Image
            style={styles.caledoniaLogo}
            source={require('image!caledonia-logo')}
          >
          </Image>
          <TextInput
            placeholder="Username"
            placeholderTextColor="#ffffff"
            style={[styles.inputField,styles.inputUsername]}
            autoCapitalize="none"
            onChangeText={(text) => this.setState({ "username": text })}
          />
          <TextInput
            placeholder="••••••••••••"
            placeholderTextColor="#ffffff"
            style={[styles.inputField,styles.inputPassword]}
            autoCapitalize="none"
            onChangeText={(text) => this.setState({ "password": text })}
          />
          <Text
            style={styles.signinError}
          >{this.state.errorMessage}
          </Text>
          <TouchableOpacity style={styles.btnSignIn} onPress={this.login}>
            <Text style={[styles.btn,styles.btnSignInText]}>SIGN IN</Text>
          </TouchableOpacity>
          <Text style={[styles.text,styles.signInText]}>
          </Text>
          <View
            style={styles.socialLoginRow}>
            <Image
              style={styles.socialLoginButton}
              capInsets= {{top: 1, left: 1, bottom: 1, right: 1}}
              source={require('image!twitter_loginbutton')}
            />
            <TouchableHighlight
              underlayColor="transparent"
              activeOpacity={0.7}
              onPress={this.fblogin}>
              <Image
                style={styles.socialLoginButton}
                capInsets= {{top: 1, left: 1, bottom: 1, right: 1}}
                source={require('image!fb_loginbutton')}
              />
            </TouchableHighlight>
          </View>
          <View
            style={[styles.footer]}
            >
            <TouchableHighlight
              style={[styles.forgotPasswordTouchable]}
              underlayColor="transparent"
              activeOpacity={0.7}>
              <Text style={styles.textLink}>
                Forgot Password?
              </Text>
            </TouchableHighlight>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.text}>
                No Account?
              </Text>
              <TouchableHighlight
                style={[styles.signUpTouchable]}
                underlayColor="transparent"
                activeOpacity={0.7}>
                <Text style={styles.textLink}>
                  Sign Up
                </Text>
              </TouchableHighlight>
            </View>
          </View>
      </View>
    );
  },
});

module.exports = LoginScreen;