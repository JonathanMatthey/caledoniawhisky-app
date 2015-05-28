'use strict';

var React = require('react-native');
var {
  AppRegistry,
  ListView,
  PixelRatio,
  StyleSheet,
  Text,
  Image,
  TextInput,
  TouchableHighlight,
  View,
} = React;

var UserActions = require('../actions/UserActions');

var BASE_URL = 'http://localhost:3000/';
var API_URL = BASE_URL + 'api/whiskies';
var PAGE_SIZE = 25;
var PARAMS = '?page_limit=' + PAGE_SIZE;
var REQUEST_URL = API_URL + PARAMS;

var whiskiesByRegion = {};

function generateWhiskiesByRegion(whiskies){
  var whiskiesData = {};
  for (var i = 0; i < whiskies.length; i++){
    if(whiskies[i]){
      if (whiskiesData.hasOwnProperty(whiskies[i].region)) {
        whiskiesData[whiskies[i].region].push(whiskies[i]);
      } else {
        whiskiesData[whiskies[i].region] = [whiskies[i]];
      }
    }
  }
  return whiskiesData;
}

var ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
  sectionHeaderHasChanged: (h1, h2) => h1 !== h2,
});

function makeRenderable(example: any): ReactClass<any, any, any> {
  return example.examples ?
    createExamplePage(null, example) :
    example;
}

class ScotchListComponent extends React.Component {

  _fetchData(){
    console.log('request_url',REQUEST_URL);
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .catch((error) => {
        console.log('ScotchListComponent: fetch error');
        this.setState({
          dataSource: ds.cloneWithRowsAndSections({}),
          isLoading: false,
        });
      })
      .then((responseData) => {
        // console.log('fetch: responseData',responseData);
        whiskiesByRegion = generateWhiskiesByRegion(responseData);
        this.setState({
          dataSource: ds.cloneWithRowsAndSections(whiskiesByRegion),
          isLoading: false,
        });
      })
      .done();
  }

  constructor(props) {
    super(props);
    this._fetchData();
    this.state = {
      dataSource: ds.cloneWithRowsAndSections(whiskiesByRegion),
    };
  }

  render() {
    return (
      <View style={styles.listContainer}>
        <View style={styles.navRow}>
        </View>
        <ListView
          style={styles.list}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
          renderSectionHeader={this._renderSectionHeader}
          pageSize={100}
          automaticallyAdjustContentInsets={false}
        />
      </View>
    );
  }

  _renderSectionHeader(data, section) {
    return (
      <View>
      </View>
    );
  }

  _renderRow(scotch, i) {
    var randomRating = Math.floor((Math.random() * 5) + 1);
    return (
      <View key={i} style={styles.rowWrapper}>
        <TouchableHighlight
          onPress={() => this._onPressRow(scotch)}
          underlayColor="#A16931"
        >
          <View style={styles.row}>
            <View style={styles.thumbnailWrapper}>
              <Image
                source={{uri: "http://localhost:3000/img/whisky_resized/thumbs/" + scotch.images.thumbnail_filename}}
                resizeMode={Image.resizeMode.contain}
                style={styles.thumbnail}
              />
            </View>
            <Text style={styles.rowRegion}>
              {scotch.region.toUpperCase()}
            </Text>
            <Text style={styles.rowTitleText}>
              {scotch.title}
            </Text>
            <Text style={styles.rowDetailText}>
              {scotch.character}
            </Text>
            <View style={styles.rowReview}>
              <Text style={styles.reviewScore}>{scotch.rating}</Text>
              <Text style={styles.ratings}>{scotch.rating_count} ratings</Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  }

  _search(text) {
    var regex = new RegExp(text, 'i');
    var filter = function(scotch) {
      return regex.test(scotch.distiller) || regex.test(scotch.title);
    }

    var filtered = {};
    for (var region = 0; region < whiskiesByRegion.length; region++){
      filtered[region] = whiskiesByRegion[region].filter(filter);
    }

    this.setState({
      dataSource: ds.cloneWithRowsAndSections(filtered)
    });
  }

  _onPressRow(scotch) {
    this.props.navigator.push({
      id: "SCOTCH",
      scotch: scotch,
      scotchId: scotch["_id"]
    });
  }
}

var styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
  list: {
    backgroundColor: '#C18951',
  },
  group: {
    backgroundColor: 'white',
  },
  rowWrapper:{
  },
  row: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: "#f4f4f4",
    margin: 20,
    borderRadius: 3,
  },
  separator: {
    height: 1 / PixelRatio.get(),
    backgroundColor: '#bbbbbb',
    marginLeft: 15,
  },
  rowRegion:{
    fontSize: 10,
    fontFamily: "Avenir Next",
    color: "#C18951",
    marginBottom: 5,
    fontWeight: "bold",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 5,
  },
  rowTitleText: {
    fontSize: 24,
    fontFamily: "Bodoni 72",
    fontWeight: '300',
    marginTop:0,
    marginBottom:0,
    textAlign:"left",
    paddingHorizontal: 20,
    paddingTop: 0,
    paddingBottom: 5,
  },
  rowDetailText: {
    fontSize: 14,
    color: '#333',
    textAlign: "left",
    fontFamily: "Bodoni 72",
    marginBottom: 3,
    lineHeight: 18,
    paddingHorizontal: 20,
    paddingTop: 0,
    paddingBottom: 10,
  },
  navRow: {
    backgroundColor: '#fff',
    paddingTop: 55,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  searchRow: {
    backgroundColor: '#eeeeee',
    paddingTop: 75,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  searchTextInput: {
    backgroundColor: 'white',
    borderColor: '#cccccc',
    borderRadius: 3,
    borderWidth: 1,
    height: 30,
    paddingLeft: 8,
  },
  thumbnailWrapper:{
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    padding:10,
    borderTopRightRadius: 3,
    borderTopLeftRadius: 3,
  },
  thumbnail: {
    width:300,
    height:200,
  },
  ratingStar:{
    width:18,
    height:18,
  },
  rowReview:{
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 0,
    paddingBottom: 20,
    borderRadius: 3,
  },
  reviewScore:{
    fontSize: 16,
    color: '#C18951',
    fontFamily: "Avenir Next",
    marginRight: 15,
    fontWeight: "600",
  },
  ratings:{
    fontSize: 14,
    lineHeight: 18,
    paddingTop:1,
    color: '#999',
    fontFamily: "Bodoni 72",
    fontWeight: "400",
  }
});

module.exports = ScotchListComponent;
