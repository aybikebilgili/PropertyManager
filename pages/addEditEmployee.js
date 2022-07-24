import {
  List,
  ListItem,
  Left,
  Body,
  Item,
  Input,
  Picker,
  Drawer,
  Button,
} from 'native-base';
import React, {Component} from 'react';

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
  Appearance,
  Text,
} from 'react-native';
import moment from 'moment';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';

import AsyncStorage from '@react-native-community/async-storage';

import api from '../define.json';

export default class addEditEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employeeName: '',
      age: 25,
      phoneNo: '',
      position: '',
    };
  }

  componentDidMount() {}

  componentWillMount() {
    this.getData();
  }

  async addEdit(item) {
    if (this.props.tip == 'add') {
      let data = await fetch(api.baseUrl + '/api/Employee', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          age: this.state.age,
          employeeName: this.state.employeeName,
          phoneNo: this.state.phoneNo,
          position: this.state.position,
        }),
      }).then(data => data.json());
      console.log('data', data);
    } else {
      let data = await fetch(api.baseUrl + '/api/Employee/' + item.employeeID, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          employeeID: item.employeeID,
          employeeName: this.state.employeeName,
          age: this.state.age,
          phoneNo: this.state.phoneNo,
          position: this.state.position,
        }),
      }).then(data => data.json());
      console.log('data', data);
    }
    setTimeout(() => {
      Actions.refresh({refresh: true});
    }, 0);
    Actions.pop();
    // console.log('BAŞARILI DÖNEN body', body);
    return;

    //     console.log('HATA DÖNEN body', body);
    //     Alert.alert('Hata!', res.result);
  }

  async getData() {
    console.log('propssss', this.props.tip);

    // düzenleme için gönderilen veriler

    if (this.props.tip !== 'update') return;
    console.log('props', this.props.kullaniciBilgiler);
    console.log('iddddd', this.props.kullaniciBilgiler.employeeID);

    this.setState({
      employeeName: this.props.kullaniciBilgiler.employeeName,
      age: this.props.kullaniciBilgiler.age.toString(),
      phoneNo: this.props.kullaniciBilgiler.phoneNo,
      position: this.props.kullaniciBilgiler.position,
    });
  }

  render() {
    const mode = Appearance.getColorScheme();
    console.log('mode', mode);
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    return (
      <View style={styles.container}>
        <View style={styles.head}>
          <Text style={styles.title}>
            {this.props.tip == 'update' ? 'Update' : 'Add'} Employee
          </Text>
        </View>
        <ScrollView keyboardShouldPersistTaps="always">
          <Item
            regular
            style={{
              borderRadius: 5,
              marginTop: 10,
              color: mode === 'light' ? 'black' : 'white',
            }}>
            <Input
              placeholder="Name Surname"
              placeholderTextColor={mode === 'light' ? 'black' : 'white'}
              value={this.state.employeeName}
              onChangeText={val => this.setState({employeeName: val})}
            />
          </Item>
          <Item
            regular
            style={{
              borderRadius: 5,
              marginTop: 10,
              color: mode === 'light' ? 'black' : 'white',
            }}>
            <Input
              placeholder="Age"
              placeholderTextColor={mode === 'light' ? 'black' : 'white'}
              value={this.state.age}
              keyboardType="numeric"
              onChangeText={val => this.setState({age: val})}
            />
          </Item>
          <Item
            regular
            style={{
              borderRadius: 5,
              marginTop: 10,
              color: mode === 'light' ? 'black' : 'white',
            }}>
            <Input
              placeholder="Phone No"
              placeholderTextColor={mode === 'light' ? 'black' : 'white'}
              value={this.state.phoneNo}
              keyboardType="numeric"
              onChangeText={val => this.setState({phoneNo: val})}
            />
          </Item>
          <Item
            regular
            style={{
              borderRadius: 5,
              marginTop: 10,
              color: mode === 'light' ? 'black' : 'white',
            }}>
            <Input
              placeholder="Position"
              placeholderTextColor={mode === 'light' ? 'black' : 'white'}
              value={this.state.position}
              onChangeText={val => this.setState({position: val})}
            />
          </Item>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginTop: 10,
              marginBottom: 10,
            }}>
            <Button
              onPress={() => Actions.pop()}
              style={{
                backgroundColor: '#f53',
                borderRadius: 20,
                marginRight: 10,
                paddingHorizontal: 30,
                height: 40,
              }}>
              <Text style={{color: 'white'}}>Cancel</Text>
            </Button>
            <Button
              onPress={() => this.addEdit(this.props.kullaniciBilgiler)}
              style={{
                backgroundColor: '#5CB85C',
                paddingHorizontal: 30,
                borderRadius: 20,
                height: 40,
              }}>
              <Text style={{color: 'white'}}>Save</Text>
            </Button>
          </View>
        </ScrollView>
      </View>
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
  head: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    borderBottomColor: 'gray',
    borderBottomWidth: 2,
    paddingBottom: 10,
    paddingTop: 10,
  },
  title: {
    fontSize: 20,
    color: '#333',
    marginLeft: 10,
    // marginTop: 7,
  },
});
