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

var MYCOLLECTION = [
  {distiller: 'Bowmore', title: '12 year old', year: 12, region: "Islay", description: "Hogshead wench long boat no prey, no pay pressgang trysail piracy capstan heave to barkadeer pillage rigged.", images: {thumbnail: 'https://img.thewhiskyexchange.com/270/bowob.12yov10.jpg'}},
  {distiller: 'Bowmore', title: '15 year old lamrig', year: 18, region: "Islay", description: "Hogshead wench long boat no prey, no pay pressgang trysail piracy capstan heave to barkadeer pillage rigged.", images: {thumbnail: 'https://img.thewhiskyexchange.com/270/mini_sm_bow7.jpg'}},
  {distiller: 'Bowmore', title: '15 year old lamrig', year: 18, region: "Islay", description: "Hogshead wench long boat no prey, no pay pressgang trysail piracy capstan heave to barkadeer pillage rigged.", images: {thumbnail: 'https://img.thewhiskyexchange.com/270/mini_sm_bow7.jpg'}},
  {distiller: 'Bowmore', title: '12 year old', year: 12, region: "Islay", description: "Hogshead wench long boat no prey, no pay pressgang trysail piracy capstan heave to barkadeer pillage rigged.", images: {thumbnail: 'https://img.thewhiskyexchange.com/270/bowob.12yov10.jpg'}},
  {distiller: 'Bowmore', title: '15 year old lamrig', year: 18, region: "Islay", description: "Hogshead wench long boat no prey, no pay pressgang trysail piracy capstan heave to barkadeer pillage rigged.", images: {thumbnail: 'https://img.thewhiskyexchange.com/270/mini_sm_bow7.jpg'}},
];

var NOTES = [
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

class ProfileComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: ds.cloneWithRowsAndSections({
        profileHeader: [{}],
        mycollection: MYCOLLECTION,
        notes: NOTES,
      }),
    };
  }

  render() {
    return (
      <View style={styles.listContainer}>
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
    if (section === "profileHeader"){
      return (
        <View
          style={styles.profileHeader}
        >
          <Image
            source={{uri: "http://saveourwoods.co.uk/wp-content/uploads/2011/01/Save-Our-Woods-4.jpg"}}
            style={styles.bgImage}
          />
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
              >
              </Text>
              <Text
                style={styles.location}
              >
                New York, USA
              </Text>
            </View>
          </View>
        </View>
      );
    }
    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderTitle}>
          {section}
        </Text>
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

    return (
      <View key={i}>
        <TouchableHighlight onPress={() => this._onPressRow(scotch)}>
          <View style={styles.row}>
            <Image
              source={{uri: scotch.images.thumbnail}}
              style={styles.thumbnail}
            />
            <View style={styles.rowDetails}>
              <Text style={styles.rowTitleText}>
                {scotch.distiller}
              </Text>
              <Text style={styles.rowDetailText}>
                {scotch.title}
              </Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
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
    fontSize: 17,
    fontWeight: '500',
  },
  rowDetailText: {
    fontSize: 15,
    color: '#888888',
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
    height:180,
    backgroundColor:"white",
  },
  bgImage:{
    position:"absolute",
    top:0,
    left:0,
    right:0,
    bottom:10,
  },
  details:{
    position:"absolute",
    left:0,
    right:0,
    bottom:0,
    backgroundColor:"transparent",
    flexDirection: 'row',
  },
  detailsText:{
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  avatar:{
    borderRadius:40,
    height:80,
    width:80,
    marginLeft:25,
    marginRight:10,
    borderWidth:2,
    borderColor: "#ffffff",
  },
  fullname:{
    color: "#ffffff",
    fontSize:21,
    fontWeight: "bold",
  },
  location:{
    color: "rgba(255,255,255,0.7)",
    fontSize:13,
    lineHeight:13,
    paddingBottom:3
  },


});

module.exports = ProfileComponent;
