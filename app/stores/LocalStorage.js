var createStore = require('flux-util').createStore;
var dispatcher = require('../AppDispatcher');
var ApiConstants = require('../constants/ApiConstants');
var UserConstants = require('../constants/UserConstants');
var UserStore = require('../stores/UserStore');

var React = require('react-native');
var {
  AsyncStorage,
  Text,
  View
} = React;

var PREFIX = '@ReactNativeLogin:';
var USER_KEY = PREFIX + 'user';

var store = createStore({
  bootstrap(complete) {
    AsyncStorage.getItem(USER_KEY, (error, user) => {
      if (error) {
        console.log('Error getting user from local storage! ' + error.message);
        complete();
      } else {
        UserStore.setState(JSON.parse(user));
        complete();
      }
    })
  },

  dispatcherIndex: dispatcher.register(function(payload) {
    action = payload.action;

    if (action.response === ApiConstants.PENDING) {
      return true;
    }

    switch(action.actionType) {
      case UserConstants.FACEBOOK_SIGN_IN:
        AsyncStorage.setItem(USER_KEY, JSON.stringify(action.response), (error) => {
          if (error) {
            console.log('Error setting user in local storage! ' + error.message);
          } else {
            store.emitChange(action);
          }
        })
        break;
      case UserConstants.USERSESSION_CREATE:
        AsyncStorage.setItem(USER_KEY, JSON.stringify(action.response), (error) => {
          if (error) {
            console.log('Error setting user in local storage! ' + error.message);
          } else {
            store.emitChange(action);
          }
        })
        break;
      case UserConstants.USERSESSION_DELETE:
        AsyncStorage.removeItem(USER_KEY, (error) => {
          if (error) {
            console.log('AsyncStorage error: ' + error.message);
          } else {
            console.log('Selection removed from disk.');
            store.emitChange(action);
          }
        });
      break;
    }

    return true;
  })
})

module.exports = store;
