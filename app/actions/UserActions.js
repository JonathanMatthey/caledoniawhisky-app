var FacebookLoginManager = require('NativeModules').FacebookLoginManager;
var dispatcher = require('../AppDispatcher');
var { dispatch, handleResponse } = require('flux-util').apiHelpersFor(dispatcher);
var UserStore = require('../stores/UserStore');
var UserConstants = require('../constants/UserConstants');
var FacebookApi = require('../apis/FacebookApi');
var CaledoniaWhiskyApi = require('../apis/CaledoniaWhiskyApi');
var AlertIOS = require('react-native').AlertIOS;

module.exports = {

  newFacebookSession() {
    FacebookLoginManager.newSession((error, info) => {
      if (error) {
        console.log("error")
        console.log(error)
        console.log("info")
        console.log(info)
        AlertIOS.alert('Unable to sign in');
      } else {
        FacebookApi.getUserInfo(info.userId, info.token);
      }
    });
  },

  /**
   * @param  {string} text
   */
  createUserSession: function(userId,password) {
    CaledoniaWhiskyApi.signin(userId,password);
  },

  /**
   */
  deleteUserSession: function() {
    // CaledoniaWhiskyApi.signout();
    dispatch(UserConstants.USERSESSION_DELETE, {}, {})
  },

}
