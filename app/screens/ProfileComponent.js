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

// TODO - maybe go back to mainscreen router ? instead of this guy ?
var ScotchPageComponent = require('./ScotchPageComponent');

var collection = [
  {distiller: 'Bowmore', title: '12 year old', year: 12, region: "Islay", description: "Hogshead wench long boat no prey, no pay pressgang trysail piracy capstan heave to barkadeer pillage rigged.", images: {thumbnail: 'https://img.thewhiskyexchange.com/270/bowob.12yov10.jpg'}},
  {distiller: 'Bowmore', title: '15 year old lamrig', year: 18, region: "Islay", description: "Hogshead wench long boat no prey, no pay pressgang trysail piracy capstan heave to barkadeer pillage rigged.", images: {thumbnail: 'https://img.thewhiskyexchange.com/270/mini_sm_bow7.jpg'}},
  {distiller: 'Bowmore', title: '15 year old lamrig', year: 18, region: "Islay", description: "Hogshead wench long boat no prey, no pay pressgang trysail piracy capstan heave to barkadeer pillage rigged.", images: {thumbnail: 'https://img.thewhiskyexchange.com/270/mini_sm_bow7.jpg'}},
  {distiller: 'Bowmore', title: '12 year old', year: 12, region: "Islay", description: "Hogshead wench long boat no prey, no pay pressgang trysail piracy capstan heave to barkadeer pillage rigged.", images: {thumbnail: 'https://img.thewhiskyexchange.com/270/bowob.12yov10.jpg'}},
  {distiller: 'Bowmore', title: '15 year old lamrig', year: 18, region: "Islay", description: "Hogshead wench long boat no prey, no pay pressgang trysail piracy capstan heave to barkadeer pillage rigged.", images: {thumbnail: 'https://img.thewhiskyexchange.com/270/mini_sm_bow7.jpg'}},
  {distiller: 'Bowmore', title: '12 year old', year: 12, region: "Islay", description: "Hogshead wench long boat no prey, no pay pressgang trysail piracy capstan heave to barkadeer pillage rigged.", images: {thumbnail: 'https://img.thewhiskyexchange.com/270/bowob.12yov10.jpg'}},
  {distiller: 'Bowmore', title: '15 year old lamrig', year: 18, region: "Islay", description: "Hogshead wench long boat no prey, no pay pressgang trysail piracy capstan heave to barkadeer pillage rigged.", images: {thumbnail: 'https://img.thewhiskyexchange.com/270/mini_sm_bow7.jpg'}},
  {distiller: 'Bowmore', title: '15 year old lamrig', year: 18, region: "Islay", description: "Hogshead wench long boat no prey, no pay pressgang trysail piracy capstan heave to barkadeer pillage rigged.", images: {thumbnail: 'https://img.thewhiskyexchange.com/270/mini_sm_bow7.jpg'}},
  {distiller: 'Bowmore', title: '12 year old', year: 12, region: "Islay", description: "Hogshead wench long boat no prey, no pay pressgang trysail piracy capstan heave to barkadeer pillage rigged.", images: {thumbnail: 'https://img.thewhiskyexchange.com/270/bowob.12yov10.jpg'}},
  {distiller: 'Bowmore', title: '15 year old lamrig', year: 18, region: "Islay", description: "Hogshead wench long boat no prey, no pay pressgang trysail piracy capstan heave to barkadeer pillage rigged.", images: {thumbnail: 'https://img.thewhiskyexchange.com/270/mini_sm_bow7.jpg'}},
];

var reviews = [
  {distiller: 'Jura', title: '12 year old', year: 12, region: "Islay", description: "Hogshead wench long boat no prey, no pay pressgang trysail piracy capstan heave to barkadeer pillage rigged.", images: {thumbnail: 'https://img.thewhiskyexchange.com/270/bowob.12yov10.jpg'}},
  {distiller: 'McCunty', title: '18 year old', year: 18, region: "Islay", description: "Hogshead wench long boat no prey, no pay pressgang trysail piracy capstan heave to barkadeer pillage rigged.", images: {thumbnail: 'https://img.thewhiskyexchange.com/270/bowob.non28.jpg'}},
];

var ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
  sectionHeaderHasChanged: (h1, h2) => h1 !== h2,
});

function makeRenderable(example: any): ReactClass<any, any, any> {
  return example.examples ?
    createExamplePage(null, example) :
    example;
}

class ProfileHeader extends React.Component {
  render() {
    var btnCollectionColor = "#C18951", btnReviewsColor = "#aaa";
    if(that.state.showSection === "reviews"){
      btnCollectionColor = "#aaa", btnReviewsColor = "#C18951";
    }
    return (
        <View
          style={styles.profileHeader}
        >
          <View
            style={styles.details}
          >
            <Image
              style={styles.avatar}
              source={{uri: "http://instinctmagazine.com/sites/instinctmagazine.com/files/images/blog_posts/Nigel%20Campbell/2014/11/16/colin%20farrell.jpeg"}}
            />
            <View
              style={styles.detailsText}
            >
              <Text
                style={styles.fullname}
              >Colin Farrell</Text>
              <Text
                style={styles.location}
              >
                New York, USA
              </Text>
            </View>
          </View>
          <View style={styles.filterRow}>
            <TouchableHighlight
              style={[styles.filterButton,styles.leftFilterButton]}
              onPress={() => that.setState({showSection: 'collection'}) }
              underlayColor="#fff"
              >
              <Text style={[styles.filterButtonText,styles.leftFilterButtonText,{color:btnCollectionColor}]}>COLLECTION</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.filterButton}
              onPress={() => that.setState({showSection: 'reviews'}) }
              underlayColor="#fff"
              >
              <Text style={[styles.filterButtonText,{color:btnReviewsColor}]}>REVIEWS</Text>
            </TouchableHighlight>
          </View>
        </View>
    );
  }
}


var that = {};

class ProfileComponent extends React.Component {

  constructor(props) {
    that = this;
    super(props);
    this.state = {
      collectionDataSource: ds.cloneWithRowsAndSections({
        collection: collection
      }),
      reviewsDataSource: ds.cloneWithRowsAndSections({
        reviews: reviews
      }),
      showSection: 'collection'
    };
  }

  render() {
    if(this.state.showSection === "reviews"){
      return (
        <View style={styles.listContainer}>
          <ProfileHeader />
          <ListView
            style={styles.list}
            dataSource={this.state.reviewsDataSource}
            renderRow={this._renderRow.bind(this)}
            renderSectionHeader={this._renderSectionHeader}
            automaticallyAdjustContentInsets={false}
          />
        </View>
      );
    }
    return (
      <View style={styles.listContainer}>
        <ProfileHeader />
        <ListView
          style={styles.list}
          dataSource={this.state.collectionDataSource}
          renderRow={this._renderRow.bind(this)}
          renderSectionHeader={this._renderSectionHeader}
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
    if(Object.keys(scotch).length === 0){
      return (
        <View style={{backgroundColor:"white"}}>
        </View>
      )
    }
    if(this.state.showSection === i)
      return (
        <View key={i}>
          <TouchableHighlight onPress={() => this._onPressRow(scotch)}>
            <View style={styles.row}>
              <View style={[styles.rowDetails, {flex:4}]}>
                <Text style={styles.rowTitleText}>
                  {scotch.distiller.toUpperCase() + " " + scotch.title.toUpperCase()}
                </Text>
                <Text style={styles.rowDetailText}>
                  Notes Go Here
                </Text>
              </View>
              <View style={[styles.rowDetails, {flex:1}]}>
                <Text style={styles.score}>
                  9.2
                </Text>
              </View>
            </View>
          </TouchableHighlight>
        </View>
      );
    return(
      <View></View>
    )
  }

  _onPressRow(scotch) {
    this.props.navigator.push({
      title: scotch.distiller,
      component: ScotchPageComponent,
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
    paddingTop:65,
  },
  list: {
    backgroundColor: '#eeeeee',
  },
  sectionHeader: {
    padding: 5,
    position: "relative",
    overflow: "hidden",
    backgroundColor: '#ffffff',
  },
  sectionHeaderTitle: {
    fontWeight: '500',
    fontSize: 16,
    color: "#111111",
    marginLeft:20,
    marginTop:10,
  },
  group: {
    backgroundColor: 'white',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 15,
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
    fontSize: 15,
    fontWeight: '600',
    fontFamily: "Avenir Next",
    paddingBottom: 3,
  },
  rowDetailText: {
    fontSize: 16,
    fontFamily: "Bodoni 72",
    color: '#333',
    lineHeight: 20,
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
  profileHeader:{
    backgroundColor:"white",
  },
  details:{
    backgroundColor:"transparent",
    flexDirection: 'column',
  },
  detailsText:{
    flexDirection: 'column',
    justifyContent: 'center',
  },
  avatar:{
    borderRadius:40,
    height:80,
    width:80,
    borderWidth:2,
    borderColor: "#ffffff",
    alignSelf: 'center',
  },
  fullname:{
    color: "#333",
    fontSize:21,
    fontWeight: "bold",
    textAlign:'center',
  },
  location:{
    color: "rgba(255,255,255,0.7)",
    fontSize:13,
    lineHeight:13,
    paddingBottom:3,
    textAlign:'center',
  },
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
  score: {
    color:"#C18951",
    textAlign:"right",
    fontWeight: "bold",
    marginRight: 15,
  }


});

module.exports = ProfileComponent;
