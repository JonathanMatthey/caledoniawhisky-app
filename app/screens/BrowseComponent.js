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
var UserActions = require('../actions/UserActions');

class RegionButton extends React.Component {
  render() {
    return (
      <TouchableHighlight
        style={styles.regionButton}
        underlayColor="#B5B5B5"
        onPress={this.props.onPress}>
        <View style={styles.regionButtonView}>
          <Image
            style={styles.regionButtonBG}
            source={{uri : "http://image.slidesharecdn.com/amazinglybeautifulscotland-090826121528-phpapp01/95/amazingly-beautiful-scotland-1-728.jpg?cb=1251307036"}}
          />
          <Text style={styles.regionButtonText}>{this.props.text}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

var BrowseComponent = React.createClass({

  render: function() {

    return (
      <ScrollView style={styles.scene}>
        <View style={styles.filterRow}>
          <TouchableHighlight
            style={[styles.filterButton,styles.leftFilterButton]}
            underlayColor="#B5B5B5"
            onPress={() => {
            }}>
            <Text style={[styles.filterButtonText,styles.leftFilterButtonText]}>BY REGION</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.filterButton}
            underlayColor="#B5B5B5"
            onPress={() => {
            }}>
            <Text style={styles.filterButtonText}>BY TYPE</Text>
          </TouchableHighlight>
        </View>
        <RegionButton
          text="HIGHLANDS"
          onPress={() => {
            this.props.navigator.push({ id: 'SCOTCHLIST', title: 'HIGHLANDS' });
          }}
        />
        <RegionButton
          text="SPEYSIDE"
          onPress={() => {
            this.props.navigator.push({ id: 'SCOTCHLIST', title: 'SPEYSIDE' });
          }}
        />
        <RegionButton
          text="ISLANDS"
        />
        <RegionButton
          text="ISLAY"
        />
        <RegionButton
          text="LOWLANDS"
        />
      </ScrollView>
    );
  },

});

var styles = StyleSheet.create({
  filterRow:{
    flexDirection: 'row',
    marginBottom:15,
  },
  filterButton: {
    backgroundColor: 'white',
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomColor: '#CDCDCD',
    flex:1,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  leftFilterButton: {
    borderRightColor: '#ccc',
    borderRightWidth: 1 / PixelRatio.get(),
  },
  leftFilterButtonText: {
    textAlign:'right'
  },
  regionButton: {
    backgroundColor: 'white',
    height:140,
    marginBottom:5,
    padding:0,
  },
  regionButtonView:{
    height: 140,
    margin:0,
    backgroundColor:"transparent",
  },
  regionButtonText: {
    fontSize: 17,
    fontWeight: '500',
    color: "white",
    alignItems: 'center',
    textAlign: "center",
    justifyContent: 'center',
    backgroundColor:"transparent",
    position: 'absolute',
    lineHeight:80,
    top:0,
    left:0,
    right:0,
    bottom:0,
  },
  regionButtonBG:{
    position: 'absolute',
    top:0,
    left:0,
    right:0,
    bottom:0,
  },
  scene: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: '#ffffff',
  },
});

module.exports = BrowseComponent;
