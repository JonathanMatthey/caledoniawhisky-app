var createStore = require('flux-util').createStore;
var dispatcher = require('../AppDispatcher');
var ApiConstants = require('../constants/ApiConstants');

var React = require('react-native');
var {
  AsyncStorage,
} = React;

var PREFIX = '@Whisky:';
var USER_KEY = PREFIX + 'current';
var CHANGE_EVENT = 'change';

var _whiskies = [];
var _errors = [];
var _whisky = { title: "", body: "", user: { username: "" } };
var _whiskyReviews = [];

var store = createStore({
  bootstrap(complete) {
  },

  getAllWhiskies: function() {
    return _whiskies;
  },

  getWhisky: function() {
    return {"whisky":_whisky,"reviews":_whiskyReviews};
  },

  dispatcherIndex: dispatcher.register(function(payload) {
    action = payload.action;
    console.log('action');
    console.log(action);

    if (action.response === ApiConstants.PENDING) {
      return true;
    }

    switch(action.actionType) {
      // case UserConstants.FACEBOOK_SIGN_IN:
      //   AsyncStorage.setItem(USER_KEY, JSON.stringify(action.response), (error) => {
      //     if (error) {
      //       console.log('Error setting user in local storage! ' + error.message);
      //     } else {
      //       store.emitChange(action);
      //     }
      //   })
      //   break;
      // case UserConstants.USERSESSION_CREATE:
      //   AsyncStorage.setItem(USER_KEY, JSON.stringify(action.response), (error) => {
      //     if (error) {
      //       console.log('Error setting user in local storage! ' + error.message);
      //     } else {
      //       store.emitChange(action);
      //     }
      //   })
      //   break;
      // case UserConstants.USERSESSION_DELETE:
      //   AsyncStorage.removeItem(USER_KEY, (error) => {
      //     if (error) {
      //       console.log('AsyncStorage error: ' + error.message);
      //     } else {
      //       console.log('Selection removed from disk.');
      //       store.emitChange(action);
      //     }
      //   });
      // break;
      case ApiConstants.LOAD_WHISKY:
        console.log('localstorage - LOAD_WHISKY ...');
        break;
      case ApiConstants.RECEIVE_WHISKY:
        console.log('localstorage - RECEIVE_WHISKY ...');
        console.log(action.response);
        if (action.response) {
          _whisky = action.response.whisky;
          _whiskyReviews = action.response.reviews;
          _errors = [];
        }
        if (action.errors) {
          _errors = action.errors;
        }
        store.emitChange(action);
        break;
      default:
        break;
    }

    return true;
  })
})

module.exports = store;
