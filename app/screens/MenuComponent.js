'use strict';

var React = require('react-native');
var {
  PixelRatio,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Image,
} = React;

var cssVar = require('cssVar');

class NavButton extends React.Component {
  render() {
    return (
      <TouchableHighlight
        style={styles.button}
        underlayColor="#B5B5B5"
        onPress={this.props.onPress}>
        <Text style={styles.buttonText}>{this.props.text}</Text>
      </TouchableHighlight>
    );
  }
}

var MenuComponent = React.createClass({

  render: function() {
    return (
      <View style={styles.scene}>
        <View style={styles.sceneContainer}>
          <NavButton
            onPress={() => {
              this.props.navigator.replacePrevious({
                id: 'HOME',
                title: '',
              })
              this.props.navigator.pop();
            }}
            text="HOME"
          />
          <NavButton
            onPress={() => {
              this.props.navigator.replacePrevious({
                id: 'BROWSE',
                title: 'BROWSE',
              });
              this.props.navigator.pop();
            }}
            text="BROWSE"
          />
          <NavButton
            onPress={() => {
              this.props.navigator.replacePrevious({
                id: 'PROFILE',
                title: 'PROFILE',
              });
              this.props.navigator.pop();
            }}
            text="MY COLLECTION"
          />
          <NavButton
            onPress={() => {
              this.props.navigator.replacePrevious({
                id: 'SETTINGS',
                title: 'SETTINGS',
              })
              this.props.navigator.pop();
            }}
            text="SETTINGS"
          />
        </View>
      </View>
    );
  },

});

var styles = StyleSheet.create({
  scene:{
    backgroundColor:"#26353A",
    position: 'absolute',
    top:0,
    left:0,
    right:0,
    bottom:0,
  },
  sceneContainer:{
    backgroundColor:"#26353A",
    flexDirection: 'column',
    position: 'absolute',
    top:100,
    left:0,
    right:0,
    bottom:60,
    borderTopWidth: 1 / PixelRatio.get(),
    borderTopColor: "rgba(255,255,255,0.3)",
  },
  button: {
    backgroundColor:"#26353A",
    flex:1,
    padding: 15,
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: "rgba(255,255,255,0.3)",
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 13,
    color:"white",
    fontFamily: "Avenir Next",
    letterSpacing: 1.2,
    fontWeight: "bold",
  },
});

module.exports = MenuComponent;
