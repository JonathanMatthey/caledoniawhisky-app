'use strict';

var React = require('react-native');
var WhiskyActions = require('../actions/WhiskyActions');
var WhiskyStore = require('../stores/WhiskyStore');

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

  submitReview : function(){
    console.log('submit review');
  },

  getWhisky: function (whiskyId){
    console.log('getWhisky ' + whiskyId);
    WhiskyActions.getWhisky(whiskyId)
  },

  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      reviewsDataSource: ds.cloneWithRows(this._genReviewRows({})),
    };
  },

  _renderReviewRow: function(rowData: string, sectionID: number, rowID: number) {
    console.log(rowData,sectionId,rowID)
    return (
      <View>
        <Text >
          {rowData + ' - '}
        </Text>
      </View>
    );
  },

  _genReviewRows: function(pressData: {[key: number]: boolean}): Array<string> {
    var dataBlob = [];
    for (var ii = 0; ii < 100; ii++) {
      var pressedText = pressData[ii] ? ' (pressed)' : '';
      dataBlob.push('Row ' + ii + pressedText);
    }
    return dataBlob;
  },

  _pressRow: function(rowID: number) {
    this._pressData[rowID] = !this._pressData[rowID];
  },

  componentDidMount() {
    var self = this;
    self.getWhisky(this.props.scotch._id);
    WhiskyStore.addChangeListener(this.updateWhiskyFromStore);
  },

  componentWillUnmount() {
    WhiskyStore.removeChangeListener(this.updateWhiskyFromStore);
  },

  updateWhiskyFromStore: function(){
    console.log('reviewsDataSource',this)
    this.setState({
      reviewsDataSource: this.state.reviewsDataSource.cloneWithRows(this._genReviewRows(this._pressData))
    });
  },

  render: function() {
    var wrapperProps = {};
    var randomRating = Math.floor((Math.random() * 5) + 1);
    return (
      <ScrollView style={styles.container}>
        <Image
          source={{uri: "http://localhost:8080/dev/reactnative/caledoniawhisky/img/whisky/" + this.props.scotch.images.thumbnail_filename}}
          style={styles.mainImage}
          resizeMode={Image.resizeMode.contain}
        />
        <View style={styles.details}>
          <Text style={styles.region}>{this.props.scotch.region.toUpperCase()}</Text>
          <Text style={styles.title}>{this.props.scotch.title}</Text>
          <Text style={styles.character}>{this.props.scotch.character}</Text>
          <Text style={styles.description}>{this.props.scotch.description}</Text>

          <TouchableHighlight
            style={[styles.btn, styles.btnWriteNote]}
            underlayColor="transparent"
            activeOpacity={0.7}>
            <Text style={styles.btnWriteNoteText}>+ ADD TO WISHLIST</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[styles.btn, styles.btnWriteNote]}
            underlayColor="transparent"
            activeOpacity={0.7}>
            <Text style={styles.btnWriteNoteText}>+ WRITE NOTE</Text>
          </TouchableHighlight>
        </View>
        <ListView
          style={styles.reviewsList}
          dataSource={this.state.reviewsDataSource}
          renderRow={this._renderReviewRow}
        />
      </ScrollView>
    );
  },
});

          // <View>
          //   <View>
          //     <Text style={styles.textInputLabel}>MY REVIEW</Text>
          //   </View>
          //   <TextInput
          //     autoCapitalize="sentences"
          //     style={styles.reviewTextInput}
          //   />
          // </View>

var styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    flexDirection: 'column',
  },
  spacer: {
    height: 270,
  },
  wrapper: {
    flex: 1,
  },
  mainImage:{
    marginTop:50,
    height:240,
  },
  details:{
    marginTop: 22,
    borderTopWidth: 1,
    borderTopColor: "#C18951",
    flex: 1,
    padding:20,
    paddingTop:15,
    backgroundColor: "rgba(255,255,255,0.75)",
  },
  region:{
    fontSize: 10,
    fontFamily: "Avenir Next",
    color: "#C18951",
    marginBottom: 5,
    fontWeight: "bold",
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 5,
  },
  title: {
    fontSize: 24,
    fontFamily: "Bodoni 72",
    fontWeight: '300',
    marginTop:0,
    marginBottom:0,
    textAlign:"left",
    paddingHorizontal: 10,
    paddingTop: 0,
    paddingBottom: 5,
  },
  character: {
    fontSize: 14,
    color: '#333',
    textAlign: "left",
    fontFamily: "Bodoni 72",
    marginBottom: 3,
    lineHeight: 18,
    paddingHorizontal: 10,
    paddingTop: 0,
    paddingBottom: 10,
  },
  description:{
    color:"#9ca8b0",
    fontSize: 16,
    marginTop: 10,
    marginBottom:30,
    lineHeight: 24,
  },
  btn:{
    borderWidth: 1,
    overflow: 'hidden',
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position:"relative",
    width:330,
  },
  btnWriteNote:{
    marginLeft:0,
    marginRight:0,
    marginTop:10,
    borderColor:"#ccc",
  },
  btnWriteNoteText:{
    color:"#333",
    fontSize:12,
    fontFamily: "Avenir Next",
    fontWeight: "600",
  },
  textInputLabel:{

  },
  reviewTextInput:{
    height: 26,
    borderWidth: 0.5,
    borderColor: '#cccccc',
    padding: 4,
    flex: 1,
    fontSize: 13,
    marginTop: 5,
    marginBottom: 10,
  }
});

module.exports = ScotchPageScreen;
