'use strict';

var React = require('react-native');
var StyleSheet= React.StyleSheet;

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backgroundOverlay: {
    opacity: 0.5,
    backgroundColor: '#ffffff',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: '#111111',
  },
  buttonText: {
    fontSize: 20,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    color: '#ffffff',
    margin: 10,
    opacity: 0.8,
  },
  aboutButtonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#efefef',
    opacity: 0.8,
  },
  contentContainer: {
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    alignSelf: 'center',
  },
  name: {
    fontSize: 20,
    color: '#000000',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    marginTop: 15,
    alignSelf: 'center',
  },
  aboutTitle: {
    fontSize: 20,
    marginBottom: 10,
  },


  // LOGIN CONTAINER... START
  loginContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    position: 'relative',
    backgroundColor: 'transparent',
  },
  loginBGImage:{
    position: 'absolute',
    top:0,
    left:0,
    right:0,
    bottom:0,
  },
  title:{
    marginTop: 30,
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "bold",
  },
  caledoniaLogo:{
    width: 200,
    height: 65,
    marginTop: 50,
    marginBottom: 50,
  },
  inputField:{
    height: 46,
    borderWidth: 0.5,
    borderColor: '#0f0f0f',
    borderRadius: 3,
    padding: 4,
    fontSize: 15,
    marginLeft:30,
    marginRight:30,
    backgroundColor: "rgba(0,0,0,0.3)",
    marginTop: 10,
    marginBottom: 10,
    color: "rgba(255,255,255,0.9)",
    paddingLeft: 15,
  },
  inputUsername:{

  },
  inputPassword:{

  },
  signinError:{
    color: "#ff0000",
    marginTop:15,
    fontWeight:"bold",
    height:40,
    backgroundColor:"rgba(0,0,0,0.4)",
    borderBottomWidth:5,
    borderBottomColor:"#ff0000",
  },
  signInText:{
    backgroundColor:"transparent",
    marginTop:25,
    marginBottom:25,
  },
  socialLoginRow:{
    flexDirection: 'row',
    flexWrap:"wrap",
    marginTop:10,
    flex:1,
  },
  socialLoginButton:{
    width:145,
    height:38,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 3,
  },
  btn:{
    lineHeight: 30,
    borderWidth: 2,
    fontSize:15,
    borderRadius: 20,
    overflow: 'hidden',
    marginLeft:20,
    fontWeight: "bold",
    marginRight:20,
    paddingTop: 1,
    paddingBottom: 8,
    width: 310,
    alignItems: 'center',
    textAlign: "center",
    justifyContent: 'center',
  },
  btnSignIn:{
    marginTop: 30,
    marginBottom: 5,
    backgroundColor: "rgba(0,0,0,1)",
  },
  btnSignInText:{
    color: "#ffffff",
    borderColor: "rgba(255,255,255,0.6)",
    marginTop: 30,
    marginBottom: 5,
  },
  footer:{
    right: 0,
    position: "absolute",
    bottom: 0,
    left: 0,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tab1Container:{
    flex: 1,
  },
  forgotPasswordTouchable:{
    backgroundColor: "transparent",
  },
  signUpTouchable:{
    marginLeft: 5,
  },
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    color: 'white',
    margin: 50,
  },
  text:{
    color:"#d9dbd0",
    backgroundColor: "transparent",
    fontSize:13,
  },
  textLink: {
    color:"#b7e402",
    fontSize:13,
  },
  // LOGIN CONTAINER... END

});
