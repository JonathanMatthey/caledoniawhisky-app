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

class SettingsComponent extends React.createClass{
  render(){
    return (
      <View>
        <Text style={{paddingTop:100}}>SETTINGS</Text>
      </View>
    );
  }
};

var styles = StyleSheet.create({
});

module.exports = SettingsComponent;
