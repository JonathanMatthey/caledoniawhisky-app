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

var ScotchPageScreen = require('./ScotchPageScreen');

var API_URL = 'http://localhost:3000/api/whiskies';
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
        <View style={styles.searchRow}>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            clearButtonMode="always"
            onChangeText={this._search.bind(this)}
            placeholder="Search..."
            style={styles.searchTextInput}
          />
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

    var imageURI = "";

    switch (section){
      case "highlands":
        imageURI = "https://sterlingsop.files.wordpress.com/2012/03/scottish-highlands-croft.jpeg";
      break;
      case "islands":
        imageURI = "http://www.goscotlandtours.com/images/islay-scotland-tours-2.gif";
      break;
      case "speyside":
        imageURI = "http://i.telegraph.co.uk/multimedia/archive/02177/whisky-speyside_2177668i.jpg";
      break;
      case "lowlands":
        imageURI = "http://www.tourist-destinations.com/wp-content/uploads/2012/03/Scotland-landscape.jpg";
      break;
      case "islay":
        imageURI = "http://bobhamiltonphotography.com/umbraco/ImageGen.ashx?image=/media/12340/a_10427%20new%20dawn%20over%20ardbeg%20distillery.jpg";
      break;
      case "ireland":
        imageURI = "http://www.portrush.org.uk/images_listings/155__L1.jpg";
      break;
      case "japan":
        imageURI = "http://2.bp.blogspot.com/_7Nheqvl9IVc/RjC0EswJfFI/AAAAAAAAA88/TAvcBJSKtRY/s1600/Hakushudistillery.jpg";
      break;
      case "bourbon":
        imageURI = "http://www.blueturtlecrossing.com/images/bourbon-r1.jpg";
      break;
      case "rye":
        imageURI = "http://www.cowboysindians.com/content/articles/2010-04/highwest/highwest-02-lg.jpg";
      break;
      case "blended scotch":
        imageURI = "http://servicesjohnniewalker.com/recipes/images/img_content_blacklabel_1.jpg";
      break;
      case "blended malt":
        imageURI = "http://qosy.co/wp-content/uploads/bfi_thumb/barrels-lzrntni304h8skz8il4nq79dbo8djmscoa412zy12u.jpg";
      break;
      case "other":
        imageURI = "http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2011/12/22/1324564970969/Scotch-whiskies-on-displa-007.jpg";
      break;
      default:
      break;
    }

    return (
      <View style={styles.sectionHeader}>
        <Image
          source={{uri: imageURI}}
          style={styles.headerImage}
        />
        <Text style={styles.sectionHeaderTitle}>
          {section.toUpperCase()}
        </Text>
      </View>
    );
  }

  _renderRow(scotch, i) {
    var randomRating = Math.floor((Math.random() * 5) + 1);
    return (
      <View key={i} style={styles.rowWrapper}>
        <TouchableHighlight onPress={() => this._onPressRow(scotch)}>
          <View style={styles.row}>
            <Image
              source={{uri: "http://localhost:8080/dev/reactnative/caledoniawhisky/img/whisky/" + scotch.images.thumbnail_filename}}
              style={styles.thumbnail}
            />
            <View style={styles.rowDetails}>
              <Text style={styles.rowTitleText}>
                {scotch.title.toUpperCase()}
              </Text>
              <Text style={styles.rowDetailText}>
                {scotch.character}
              </Text>
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
      title: scotch.distiller,
      component: ScotchPageScreen,
      passProps: {
        scotch: scotch
      },
      mainImg: scotch.images.thumbnail,
    });
  }
}

var styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
  list: {
    backgroundColor: '#eeeeee',
  },
  sectionHeader: {
    padding: 5,
    height: 80,
    position: "relative",
    overflow: "hidden",
    borderBottomWidth:1,
    borderTopWidth:1,
  },
  headerImage:{
    position:"absolute",
    top:-20,
    left:-20,
    right:-20,
    bottom:-20,
  },
  group: {
    backgroundColor: 'white',
  },
  sectionHeaderTitle: {
    fontWeight: '500',
    fontSize: 16,
    backgroundColor: "#111111",
    color: "#ffffff",
    bottom:10,
    left:20,
    position: "absolute",
  },
  rowWrapper:{
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 8,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: "#f4f4f4",
  },
  rowDetails :{
    paddingLeft: 10,
    flexDirection: 'column',
  },
  separator: {
    height: 1 / PixelRatio.get(),
    backgroundColor: '#bbbbbb',
    marginLeft: 15,
  },
  rowTitleText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop:0,
    marginBottom:5,
  },
  rowDetailText: {
    fontSize: 12,
    color: '#aaaaaa',
    lineHeight: 14,
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
  thumbnail: {
    width: 53,
    height: 81,
    margin:5
  },
  rating:{
    marginTop:5,
    flexDirection: 'row',

  },
  ratingStar:{
    width:18,
    height:18,
  }
});

module.exports = ScotchListComponent;
