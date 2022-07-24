import {Drawer, Button, H1} from 'native-base';
import React, {Component} from 'react';
import {Text} from 'react-native';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  TextInput,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Alert,
  Linking,
  View,
} from 'react-native';
import moment from 'moment';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';

import AsyncStorage from '@react-native-community/async-storage';
import {firebase} from '@react-native-firebase/messaging';

import getStorage from '../functions/loginfunc';

import define from '../define.json';

export default class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      share: false,
      feminds: [],
      like: false,
      userID: 0,
      posts: [],
      commentbox: false,
      comment: '',
      comArrays: [],
      toka: '',
      users: [],
      tokens: [],
      username: '',
      buKullaniciAdi: '',
      ip: 'localhost:63601',
    };
  }

  async componentWillMount() {
    // const ip = await getStorage('ip');

    // this.setState({ip: ip});

    const userID = await AsyncStorage.getItem('userID');
    const userName = await AsyncStorage.getItem('userName');
    const isManager = await AsyncStorage.getItem('isManager');
    console.log('isManager', isManager);

    this.setState({userID: userID});
    console.log('userID', userID);

    console.log(this.props);
    this.props.navigation.setParams({
      title: userName,
    });
    this.setState({buKullaniciAdi: userName, userName: userName});
  }

  componentDidMount() {
    // firebase.messaging().onMessage(response => {
    //   console.log('notiiii', JSON.stringify(response));
    //   this.getPost();
    // });

    let data = fetch('http://' + define.baseUrl + define.blockList, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      });
  }

  render() {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    return (
      <SafeAreaView style={{flex: 1, height: windowHeight}}>
        <View
          style={{
            flex: 1,
            height: windowHeight,
            backgroundColor: '#f9f9f9',
            paddingHorizontal: 10,
          }}>
          <ScrollView>
            <Button
              style={[styles.box, color1]}
              onPress={() => Actions.Managers()}>
              <View style={styles.boxView}>
                <Text style={styles.boxText}>Managers</Text>
              </View>
            </Button>
            <Button
              icon={<Icon name="people" color={'white'} size={15} />}
              style={[styles.box, color3]}
              onPress={() => Actions.Residents()}>
              <View style={styles.boxView}>
                <Text style={styles.boxText}>Residents</Text>
              </View>
            </Button>
            <Button
              style={[styles.box, color4]}
              onPress={() => Actions.Employees()}>
              <View style={styles.boxView}>
                <Text style={styles.boxText}>Employees</Text>
              </View>
            </Button>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 20,
    paddingRight: 20,
  },
  box: {
    height: 140,
    marginTop: 10,
    borderRadius: 5,
    flexDirection: 'row',
  },
  image: {
    alignSelf: 'center',
    margin: 20,
  },
  boxView: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  boxText: {
    color: 'white',
    alignSelf: 'flex-end',
  },
  boxH1: {
    color: 'white',
    alignSelf: 'flex-end',
    marginTop: 20,
  },
});

var color1 = {backgroundColor: 'rgba(100, 0, 100, 0.6)'};
var color2 = {backgroundColor: '#5CB85C'};
var color3 = {backgroundColor: 'rgba(255, 0, 0, 0.6)'};
var color4 = {backgroundColor: 'rgba(0, 0, 100, 0.6)'};
