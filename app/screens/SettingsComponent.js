'use strict';

var React = require('react-native');

var {
  ScrollView,
  StyleSheet,
  ListView,
  Text,
  TextInput,
  View,
  Image,
  TouchableHighlight,
} = React;

var ScotchPageScreen = React.createClass({
  render: function() {
    return (
      <View>
        <Text style={{paddingTop:100}}>SETTINGS</Text>
      </View>
    );
  },
});

var styles = StyleSheet.create({
});

module.exports = ScotchPageScreen;
