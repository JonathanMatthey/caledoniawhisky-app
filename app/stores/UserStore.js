var createStore = require('flux-util').createStore;
var Immutable = require('immutable');
var dispatcher = require('../AppDispatcher');
var ApiConstants = require('../constants/ApiConstants');
var UserConstants = require('../constants/UserConstants');
var merge = require('merge');

var _user = Immutable.Map();

var store = createStore({
  setState(user) {
    _user = Immutable.fromJS(user || {});
  },

  getState() {
    return _user;
  },

  dispatcherIndex: dispatcher.register(function(payload) {
    action = payload.action;

    if (action.response === ApiConstants.PENDING) {
      return true;
    }

    switch(action.actionType) {

      case UserConstants.FACEBOOK_SIGN_IN:
        _user = Immutable.fromJS(merge(action.response, action.queryParams));
        store.emitChange(action);
        console.log('UserStore - facebook_sign_in event listen: logged in !');
        break;

      case UserConstants.USERSESSION_CREATE:
        _user = Immutable.fromJS(merge(action.response, action.queryParams));
        store.emitChange(action);
        break;

      case UserConstants.USERSESSION_DELETE:
        _user = Immutable.fromJS({});
        store.emitChange(action);
        break;
    }

    return true;
  })
})

module.exports = store;
