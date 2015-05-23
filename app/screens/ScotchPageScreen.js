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
    console.log('WhiskyStore.getWhisky()');
    console.log(WhiskyStore.getWhisky());
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
        />
        <View style={styles.details}>
          <Text style={styles.region}>{this.props.scotch.region.toUpperCase()}</Text>
          <Text style={styles.title}>{this.props.scotch.title.toUpperCase()}</Text>
          <View
            style={styles.rating}
            >
            <Image
              style={styles.ratingStar}
              capInsets= {{top: 1, left: 1, bottom: 1, right: 1}}
              source={{ uri: 'http://localhost:8080/dev/reactnative/caledoniawhisky/img/icons/icon-star-' + (randomRating>=1 ?'gold':'grey') + '.png'}}
            />
            <Image
              style={styles.ratingStar}
              capInsets= {{top: 1, left: 1, bottom: 1, right: 1}}
              source={{ uri: 'http://localhost:8080/dev/reactnative/caledoniawhisky/img/icons/icon-star-' + (randomRating>=2 ?'gold':'grey') + '.png'}}
            />
            <Image
              style={styles.ratingStar}
              capInsets= {{top: 1, left: 1, bottom: 1, right: 1}}
              source={{ uri: 'http://localhost:8080/dev/reactnative/caledoniawhisky/img/icons/icon-star-' + (randomRating>=3 ?'gold':'grey') + '.png'}}
            />
            <Image
              style={styles.ratingStar}
              capInsets= {{top: 1, left: 1, bottom: 1, right: 1}}
              source={{ uri: 'http://localhost:8080/dev/reactnative/caledoniawhisky/img/icons/icon-star-' + (randomRating>=4 ?'gold':'grey') + '.png'}}
            />
            <Image
              style={styles.ratingStar}
              capInsets= {{top: 1, left: 1, bottom: 1, right: 1}}
              source={{ uri: 'http://localhost:8080/dev/reactnative/caledoniawhisky/img/icons/icon-star-' + (randomRating>=5 ?'gold':'grey') + '.png'}}
            />
          </View>

          <Text style={styles.description}>{this.props.scotch.description}</Text>

          <View>
            <View>
              <Text style={styles.textInputLabel}>MY REVIEW</Text>
            </View>
            <TextInput
              autoCapitalize="sentences"
              style={styles.reviewTextInput}
            />
          </View>

          <TouchableHighlight
            style={[styles.btn, styles.btnWriteNote]}
            underlayColor="transparent"
            activeOpacity={0.7}>
            <Text style={styles.btnWriteNoteText}>SUBMIT</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    );
  },
});

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
    position:"absolute",
    top:20,
    left:130,
    right:-10,
    height:320,
  },
  details:{
    flex: 1,
    padding:20,
    paddingTop:15,
    backgroundColor: "rgba(255,255,255,0.75)",
    marginTop:280,
  },
  region:{
    color: "#9ca8b0",
    fontSize: 14,
    marginBottom:2,
  },
  title:{
    color:"#2d3941",
    fontSize: 26,
    fontWeight: "bold",
  },
  description:{
    color:"#9ca8b0",
    fontSize: 16,
    marginTop: 10,
    marginBottom:30,
    lineHeight: 24,
  },
  btn:{
    borderWidth: 2,
    borderRadius: 20,
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
    borderColor:"#FF9A00",
    backgroundColor: "#FF9A00",
  },
  btnWriteNoteText:{
    color:"#ffffff",
    fontSize:16,
    fontWeight: "bold",
    backgroundColor: "#FF9A00",
  },
  rating:{
    marginTop:5,
    flexDirection: 'row',

  },
  ratingStar:{
    width:20,
    height:20,
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
