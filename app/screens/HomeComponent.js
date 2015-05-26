'use strict';

var React = require('react-native');
var {
  View,
  StyleSheet,
  Image,
  ListView,
  Text,
  TouchableHighlight,
} = React;

var styles = require('./Styles');
var UserActions = require('../actions/UserActions');

var collectors = [
  {name: 'Colin Farrell',avatarUrl:"http://instinctmagazine.com/sites/instinctmagazine.com/files/images/blog_posts/Nigel%20Campbell/2014/11/16/colin%20farrell.jpeg"},
  {name: 'Liam Neeson',avatarUrl:"http://instinctmagazine.com/sites/instinctmagazine.com/files/images/blog_posts/Nigel%20Campbell/2014/11/16/colin%20farrell.jpeg"},
];

var events = [
  {title: 'Jura Complimentary Tasting', location: '321 Hewes St', time: "Friday 19th August 8pm"},
  {title: 'Balvenie Complimentary Tasting', location: '321 Hewes St', time: "Tuesday 19th May 7pm"},
  {title: 'Jura Complimentary Tasting', location: '321 Hewes St', time: "Friday 19th August 8pm"},
  {title: 'Balvenie Complimentary Tasting', location: '321 Hewes St', time: "Tuesday 19th May 7pm"},
];

var ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
  sectionHeaderHasChanged: (h1, h2) => h1 !== h2,
});

var BASE_URL = 'http://localhost:3000/';
var API_URL = BASE_URL + 'api/home';
var PARAMS = '';
var REQUEST_URL = API_URL + PARAMS;

var homeData = {};

class HomeComponent extends React.Component {

  _fetchData(){
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .catch((error) => {
        this.setState({
          dataSource: ds.cloneWithRowsAndSections({}),
          isLoading: false,
        });
      })
      .then((responseData) => {
        homeData = responseData;
        this.setState({
          dataSource: ds.cloneWithRowsAndSections(homeData),
          isLoading: false,
        });
      })
      .done();
  }

  constructor(props) {
    super(props);
    this._fetchData();
    this.state = {
      dataSource: ds.cloneWithRowsAndSections(homeData),
    };
  }

  signout(event){
    UserActions.deleteUserSession();
  }

  render() {
    return (
      <View style={styles.scene}>
        <ListView
          style={styles.list}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
          renderSectionHeader={this._renderSectionHeader}
          automaticallyAdjustContentInsets={false}
        />
      </View>
    );
  }

  _renderSectionHeader(data, section) {
    var sectionTitle = "";

    if (section ==="collectors"){
      sectionTitle = "TOP COLLECTORS";
    } else if (section ==="events"){
      sectionTitle = "EVENTS THIS MONTH";
    } else if (section ==="latestWhisky"){
      return (
        <View style={styles.heroContainer}>
          <Image
            style={styles.heroScotch}
            resizeMode={Image.resizeMode.contain}
            source={{uri : BASE_URL + "/img/whisky/" + data.images.thumbnail_filename}}
          >
          </Image>
          <View style={styles.heroDetails}>
            <Text style={styles.heroRegion}>JUST IN</Text>
            <Text style={styles.heroTitle}>Aberfeldy 12y</Text>
          </View>
        </View>
      );
    }
    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.separator}>________</Text>
        <Text style={styles.sectionHeaderText}>{sectionTitle}</Text>
      </View>
    );
  }

  _renderRow(rowObj, i) {
    if(i === "collectors") {
      return (
        <View key={i}>
          <TouchableHighlight
            onPress={() => this._onPressCollectorRow(rowObj)}
            underlayColor="#f4f4f4"
          >
            <View style={[styles.row, styles.collectorRow]}>
              <Image
                style={styles.collectorAvatar}
                resizeMode={Image.resizeMode.cover}
                source={{uri : rowObj.avatarUrl}}
              ></Image>
              <Text style={styles.collectorName}>
                {rowObj.name}
              </Text>
              <Text style={styles.collectorCaret}>
                i
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      );
    } else if(i === "events") {
      return(
        <View key={i}>
          <TouchableHighlight
            onPress={() => this._onPressEventRow(rowObj)}
            underlayColor="#f4f4f4"
          >
            <View style={styles.row}>
              <View style={styles.eventDetails}>
                <Text style={styles.eventTitle}>
                  {rowObj.title}
                </Text>
                <Text style={styles.eventDetail}>
                  {rowObj.location}
                </Text>
                <Text style={styles.eventDetail}>
                  {rowObj.time}
                </Text>
              </View>
              <Image
                style={styles.fbLink}
                resizeMode={Image.resizeMode.contain}
                source={{uri : "http://instinctmagazine.com/sites/instinctmagazine.com/files/images/blog_posts/Nigel%20Campbell/2014/11/16/colin%20farrell.jpeg"}}
              ></Image>
            </View>
          </TouchableHighlight>
        </View>
      )
    } else {
      return(
        <View>
        </View>
      )
    }
  }

  _onPressRow(rowObj) {
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
  scene:{
    right: 0,
    position: "absolute",
    bottom: 0,
    left: 0,
    top: 0,
  },
  heroContainer:{
    backgroundColor:"#eee",
  },
  heroScotch:{
    height: 200,
    marginTop: 50,
    marginBottom: 20,
  },
  heroDetails:{
    paddingLeft:30,
    paddingBottom:30,
  },
  heroRegion:{
    fontSize: 10,
    fontFamily: "Avenir Next",
    color: "#C18951",
    marginBottom: 5,
    fontWeight: "bold",
  },
  heroTitle:{
    fontSize: 22,
    letterSpacing: 1.2,
    fontFamily: "Bodoni 72",
  },
  sectionHeader:{
    paddingTop:15,
    paddingBottom:20,
    borderTopWidth:1,
    borderTopColor:"#eee",
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
  row:{
    marginLeft:20,
    paddingVertical:10,
    marginRight:20,
    flexDirection: "row",
    justifyContent:"space-between",
    alignItems: 'center'
  },
  collectorRow:{
    borderTopWidth:1,
    borderTopColor:"#eee",
  },
  collectorName:{
    fontFamily: "Avenir Next",
    flex:11,
    marginLeft:10,
    fontWeight: "600",
  },
  collectorCaret:{
    flex:1,
  },
  collectorAvatar:{
    borderRadius:20,
    height:40,
    width:40,
    borderWidth:2,
    borderColor: "#ffffff",
    alignSelf: 'center',
  },
  eventTitle:{
    fontSize: 15,
    fontFamily: "Avenir Next",
    fontWeight: "600",
    marginBottom: 5,
  },
  eventDetail:{
    fontSize: 15,
    fontFamily: "Bodoni 72",
    marginBottom: 3,
    lineHeight: 18,
  },
  fbLink:{
    height: 20,
    width: 20,
    marginRight:10,
  }
});

module.exports = HomeComponent;
