var dispatcher = require('../AppDispatcher');
var { dispatch, handleResponse } = require('flux-util').apiHelpersFor(dispatcher);
var CaledoniaWhiskyApi = require('../apis/CaledoniaWhiskyApi');
var AlertIOS = require('react-native').AlertIOS;

module.exports = {

  /**
   * @param  {string} text
   */
  getWhisky: function(whiskyId) {
    CaledoniaWhiskyApi.getWhisky(whiskyId);
  },

}
