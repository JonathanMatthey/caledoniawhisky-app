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

var BASE_URL = 'http://localhost:3000/';
var API_URL = BASE_URL + 'api/whiskies/';
var PAGE_SIZE = 25;
var PARAMS = '?page_limit=' + PAGE_SIZE;
var REQUEST_URL = API_URL + PARAMS;

var ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
  sectionHeaderHasChanged: (h1, h2) => h1 !== h2,
});

class ScotchPageComponent extends React.Component {

  _fetchData(whiskyId){
    fetch(API_URL + whiskyId)
      .then((response) => response.json())
      .catch((error) => {
        console.log('ScotchPageComponent: fetch error');
        this.setState({
          reviewsDataSource: ds.cloneWithRows({}),
          whisky: {},
        });
      })
      .then((responseData) => {
        console.log('fetch: responseData',responseData);
        responseData.reviews;
        this.setState({
          reviewsDataSource: ds.cloneWithRows(responseData.reviews),
          whisky: responseData.whisky,
        });
      })
      .done();
  }

  submitReview(){
    console.log('submit review');
  }

  getInitialState() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      whisky: {},
      reviewsDataSource: ds.cloneWithRows({}),
    };
  }


  _renderSectionHeader(data, section) {
    return (
      <View>
      </View>
    );
  }

  constructor(props) {
    super(props);
    console.log(props.scotchId);
    this._fetchData(props.scotchId);
    this.state = {
      reviewsDataSource: ds.cloneWithRows({}),
      whisky: {},
    };
  }


  render() {
    // var wrapperProps = {};
    // var randomRating = Math.floor((Math.random() * 5) + 1);
    return (
      <ScrollView>
        <View style={styles.heroWrapper}>
          <Image
            source={{uri: "http://localhost:3000/img/whisky_resized/" + this.props.scotch.images.thumbnail_filename}}
            style={styles.mainImage}
            resizeMode={Image.resizeMode.contain}
          />
        </View>
        <View style={styles.details}>
          <View style={styles.detailsRow}>
            <View style={styles.detailsRowLeft}>
              <Text style={styles.region}>{this.props.scotch.region.toUpperCase()}</Text>
              <Text style={styles.title}>{this.props.scotch.title}</Text>
              <Text style={styles.character}>{this.props.scotch.character}</Text>
            </View>
            <View style={styles.detailsRowRight}>
              <Text style={styles.whiskyRating}>{this.props.scotch.rating}</Text>
            </View>
          </View>
          <TouchableHighlight
            style={[styles.btn, styles.btnWriteNote]}
            underlayColor="#eee"
            activeOpacity={0.7}>
            <Text style={styles.btnWriteNoteText}>+ ADD TO WISHLIST</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[styles.btn, styles.btnWriteNote]}
            underlayColor="#eee"
            activeOpacity={0.7}>
            <Text style={styles.btnWriteNoteText}>+ WRITE NOTE</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.sectionHeader}>
          <Text style={styles.separator}>________</Text>
          <Text style={styles.sectionHeaderText}>REVIEWS</Text>
        </View>
        <ListView
          style={styles.reviewsList}
          dataSource={this.state.reviewsDataSource}
          renderRow={this._renderReviewRow.bind(this)}
        />
      </ScrollView>
    );
  }

  _renderReviewRow(review,i) {
    return (
      <View style={styles.review}>
        <View style={styles.reviewUserRow}>
          <View style={styles.reviewLeft}>
            <Image
              source={{uri: "http://im4249.noticiadahora.net/img/users/default.png"}}
              style={styles.reviewUserAvatar}
              resizeMode={Image.resizeMode.contain}
            />
            <Text style={styles.reviewUser}>
              {review.user_id.name.toUpperCase()}
            </Text>
          </View>
          <View style={styles.reviewRating}>
            <Text style={styles.reviewRatingText}>
              {review.rating}
            </Text>
          </View>
        </View>
        <Text style={styles.reviewBody}>
          {review.body}
        </Text>
      </View>
    );
  }
};
        // <Text style={styles.description}>{this.props.scotch.description}</Text>

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
  heroWrapper:{
    backgroundColor:"#eee",
    paddingBottom: 20,
  },
  mainImage:{
    marginTop:50,
    height:240,
  },
  details:{
    borderTopWidth: 1,
    borderTopColor: "#C18951",
    flex: 1,
    padding:20,
    paddingTop:15,
    backgroundColor: "rgba(255,255,255,0.75)",
  },
  detailsRow:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailsRowRight:{
    height:56,
    width:56,
    borderRadius:28,
    borderColor:"#C18951",
    borderWidth:2,
    alignItems: 'center',
    marginTop:20,
    justifyContent: 'center',
    marginRight:5,
  },
  whiskyRating:{
    color: "#C18951",
    textAlign:"center",
    fontSize: 14,
    fontWeight:"600",
    fontFamily: "Avenir Next",
  },
  region:{
    fontSize: 11,
    fontFamily: "Avenir Next",
    color: "#C18951",
    marginBottom: 5,
    fontWeight: "bold",
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 2,
  },
  title: {
    fontSize: 26,
    fontFamily: "Bodoni 72",
    fontWeight: '300',
    marginTop:0,
    marginBottom:0,
    textAlign:"left",
    paddingHorizontal: 10,
    paddingTop: 0,
    paddingBottom: 8,
  },
  character: {
    fontSize: 16,
    color: '#333',
    textAlign: "left",
    fontFamily: "Bodoni 72",
    marginBottom: 3,
    lineHeight: 18,
    paddingHorizontal: 10,
    paddingTop: 0,
    paddingBottom: 20,
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
    paddingTop: 15,
    paddingBottom: 15,
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
  },
  reviewsList:{
    padding:20,
  },
  review:{
    paddingBottom:20,
    marginBottom:20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  reviewUserRow:{
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reviewLeft:{
    flexDirection: 'row',
  },
  reviewUserAvatar:{
    borderRadius:20,
    height:40,
    width:40,
    alignSelf: 'center',
    marginRight: 15,
  },
  reviewUser:{
    fontFamily: "Avenir Next",
    fontWeight: "600",
    lineHeight:30,
  },
  reviewRating:{
    backgroundColor: "#C18951",
    borderRadius:6,
    width:40,
    paddingBottom:4,
    paddingTop:6,
    height:25,
    marginTop:10,
    justifyContent: 'flex-end',
  },
  reviewRatingText:{
    backgroundColor:"transparent",
    color:"white",
    textAlign:"center",
    fontSize: 12,
    fontWeight: "600",
    fontFamily: "Avenir Next",
  },
  reviewBody:{
    fontFamily: "Bodoni 72",
    fontSize:16,
    marginTop:20,
  },
  sectionHeader:{
    paddingTop:5,
    paddingBottom:10,
    marginLeft:20,
    marginRight:20,
  },
  sectionHeaderText:{
    fontSize: 12,
    color:"#aaa",
    textAlign:"center",
    fontFamily: "Avenir Next",
    fontWeight: "600",
  },
  separator:{
    borderTopWidth:1,
    borderTopColor: "#aaa",
    color:"#aaa",
    textAlign:"center",
    marginBottom:10,
    justifyContent: 'center',
  },
});

module.exports = ScotchPageComponent;
