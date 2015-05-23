// this is where you talk to the server
var dispatcher = require('../AppDispatcher');
var { dispatch, handleResponse } = require('flux-util').apiHelpersFor(dispatcher);
var ApiConstants = require('../constants/ApiConstants');
var UserConstants = require('../constants/UserConstants');

var baseApiUrl = "http://localhost:3000/";

module.exports = {

  signin(userId,password){
    var url = baseApiUrl + 'auth/signin';
    var key = UserConstants.USERSESSION_CREATE;
    var params = {userId: userId, password: password};

    dispatch(key, ApiConstants.PENDING, params)

    fetch(url,{
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: '{"email": "' + userId + '", "password": "' + password + '"}'
    }).then(handleResponse(key, params));
  },

  getWhisky(whiskyId){
    var url = baseApiUrl + 'api/whiskies/' + whiskyId;
    var key = ApiConstants.RECEIVE_WHISKY;
    var params = {};

    dispatch(key, ApiConstants.PENDING, params)

    fetch(url,{
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(handleResponse(key, params));
  }

}
