'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TabBarIOS,
  NavigatorIOS,
  TouchableHighlight
} = React;

var TabBarItemIOS = TabBarIOS.Item;
var ScotchListComponent = require('./ScotchListComponent');
var CaledoniaComponent = require('./CaledoniaComponent');
var ProfileComponent = require('./ProfileComponent');
var UserStoreSync = require('../mixins/UserStoreSync');

var MainScreen = React.createClass({
  mixins: [UserStoreSync],

  getInitialState() {
    return {
      result: '...',
      loggedin: false,
      selectedTab: 'caledoniaTab',
      username: '',
      password: '',
      errorMessage: '',
      currentUser: {}
    }
  },

  statics: {
    title: '<TabBarIOS>',
    description: 'Tab-based navigation.'
  },

  _renderContent: function(color: string, pageText: string) {
    return (
      <View style={[styles.tabContent, {backgroundColor: color}]}>
        <Text style={styles.tabText}>{pageText}</Text>
      </View>
    );
  },

  componentDidMount() {
    var self = this;
  },

  render: function() {
    return (
      <TabBarIOS
        selectedTab={this.state.selectedTab}>
        <TabBarItemIOS
          accessibilityLabel="Caledonia"
          name="caledoniaTab"
          icon={_ix_DEPRECATED('swords.png')}
          title="Caledonia"
          badgeValue={ null}
          selected={this.state.selectedTab === 'caledoniaTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'caledoniaTab',
            });
          }}>
          <CaledoniaComponent />
        </TabBarItemIOS>
        <TabBarItemIOS
          name="whiskiesTab"
          icon={_ix_DEPRECATED('dram2.png')}
          accessibilityLabel="Whisky"
          title="Whisky"
          selected={this.state.selectedTab === 'whiskiesTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'whiskiesTab',
            });
          }}
          style={{paddingBottom:50,borderColor:"#ff0000"}}
          >
          <NavigatorIOS
            style={styles.tab1Container}
            initialRoute={{
              title: 'Whisky',
              component: ScotchListComponent,
              passProps: {
              }
            }}
            itemWrapperStyle={styles.itemWrapper}
            tintColor='#008888'
          />
        </TabBarItemIOS>
        <TabBarItemIOS
          accessibilityLabel="Profile"
          name="Profile"
          icon={_ix_DEPRECATED('swords.png')}
          title="MyNotes"
          badgeValue={ null}
          selected={this.state.selectedTab === 'profileTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'profileTab',
            });
          }}>
          <NavigatorIOS
            style={styles.tab1Container}
            initialRoute={{
              title: 'Profile',
              component: ProfileComponent,
              passProps: {
              }
            }}
            itemWrapperStyle={styles.itemWrapper}
            tintColor='#008888'
          />
        </TabBarItemIOS>
      </TabBarIOS>
    );
  },
});

var styles = StyleSheet.create({

  loginContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    position: 'relative',
  },
  loginBGImage:{
    position: 'absolute',
    top:0,
    left:0,
    right:0,
    bottom:0,
  },
  title:{
    marginTop: 30,
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "bold",
    backgroundColor: "transparent",
  },
  caledoniaLogo:{
    width: 200,
    height: 65,
    marginTop: 60,
    marginBottom: 40,
  },
  inputField:{
    height: 46,
    borderWidth: 0.5,
    borderColor: '#0f0f0f',
    borderRadius: 3,
    padding: 4,
    fontSize: 15,
    marginLeft:30,
    marginRight:30,
    backgroundColor: "rgba(0,0,0,0.3)",
    marginTop: 10,
    marginBottom: 10,
    color: "rgba(255,255,255,0.9)",
    paddingLeft: 15,
  },
  inputUsername:{

  },
  inputPassword:{

  },
  signinError:{
    color: "#ff0000",
    backgroundColor:"transparent",
    marginTop:15,
    fontWeight:"bold",
    height:20,
  },
  signInText:{
    backgroundColor:"transparent",
    marginTop:25,
    marginBottom:25,
  },
  socialLoginRow:{
    flexDirection: 'row',
    flexWrap:"wrap",
    marginTop:10,
    flex:1,
  },
  socialLoginButton:{
    width:145,
    height:38,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 3,
  },
  btn:{
    lineHeight: 30,
    borderWidth: 2,
    fontSize:15,
    borderRadius: 20,
    overflow: 'hidden',
    marginLeft:20,
    fontWeight: "bold",
    marginRight:20,
    paddingTop: 5,
    paddingBottom: 3,
    width: 310,
    alignItems: 'center',
    textAlign: "center",
    justifyContent: 'center',
  },
  btnSignIn:{
    color: "#ffffff",
    borderColor: "rgba(255,255,255,0.6)",
    marginTop: 30,
    marginBottom: 5,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  btnSignInText:{
    backgroundColor: "transparent",
  },
  footer:{
    right: 0,
    position: "absolute",
    bottom: 0,
    left: 0,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tab1Container:{
    flex: 1,
  },
  forgotPasswordTouchable:{
    backgroundColor: "transparent",
  },
  signUpTouchable:{
    marginLeft: 5,
  },
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 50,
  },
  text:{
    color:"#d9dbd0",
    backgroundColor: "transparent",
    fontSize:13,
  },
  textLink: {
    color:"#b7e402",
    fontSize:13,
  }
});

// This is needed because the actual image may not exist as a file and
// is used by the native code to load a system image.
// TODO(nicklockwood): How can this fit our require system?
function _ix_DEPRECATED(imageUri) {
  return {
    uri: imageUri,
    isStatic: true,
  };
}

module.exports = MainScreen;