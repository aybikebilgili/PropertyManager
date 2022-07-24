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
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-community/async-storage';
import ModalSelector from 'react-native-modal-selector';

import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';

import api from '../define.json';

export default class addEditResident extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blockID: 0,
      nameSurname: '',
      phoneNo: '',
      numberOfPeople: 0,
      email: '',
      password: '',
      isTenant: false,
      hasCar: false,
      isManager: false,
      blockDataTmp: [],
      blockData: [],
    };
  }

  componentDidMount() {}

  componentWillMount() {
    this.getData();
  }
  async addEdit(item) {
    // let users = fetch(api.baseUrl + '/api/Employee', {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    // }).then(response =>
    //   response.json().then(data => {
    //     console.log(data);
    //     this.setState({
    //       userData: data,
    //       userDataTmp: data.length == 0 ? [] : data,
    //       // musteriNo: musteriNo,
    //       // bayiID: bayiId,
    //     });
    //   }),
    // );
    if (
      this.state.nameSurname != '' &&
      this.state.phoneNo != '' &&
      this.state.email != '' &&
      this.state.password != ''
    ) {
      if (this.props.tip == 'add') {
        let body = JSON.stringify({
          blockID: this.state.blockID,
          nameSurname: this.state.nameSurname,
          phoneNo: this.state.phoneNo,
          numberOfPeople: this.state.numberOfPeople,
          email: this.state.email,
          password: this.state.password,
          hasCar: this.state.hasCar,
          isTenant: this.state.isTenant,
          isManager: this.state.isManager,
        });

        let data = await fetch(api.baseUrl + '/api/User', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body,
        }).then(data => data.json());

        console.log('body', body);
        console.log('data', data);
      } else {
        let data = await fetch(api.baseUrl + '/api/User/' + item.userID, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userID: item.userID,
            blockID: this.state.blockID,
            nameSurname: this.state.nameSurname,
            phoneNo: this.state.phoneNo,
            numberOfPeople: this.state.numberOfPeople,
            email: this.state.email,
            password: this.state.password,
            hasCar: this.state.hasCar,
            isTenant: this.state.isTenant,
            isManager: this.state.isManager,
          }),
        }).then(data => data.json());
        console.log('data', data);
      }
      setTimeout(() => {
        Actions.refresh({refresh: true});
      }, 0);
      Actions.pop();
      // console.log('BAŞARILI DÖNEN body', body);
    } else {
      Alert.alert('Attention!', 'Enter the blanks, please.');

      console.log('Errorrr');
    }
    return;
  }

  async getData() {
    console.log('propssss', this.props.tip);

    let blocks = await fetch(api.baseUrl + '/api/Block', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(response =>
      response.json().then(data => {
        console.log('blocks', data);
        this.setState({
          blockData: data,
          blockDataTmp: data.length == 0 ? [] : data,
          // musteriNo: musteriNo,
          // bayiID: bayiId,
        });
      }),
    );

    console.log('blockData', this.state.blockData);

    const blocklar = this.state.blockData.map(block => {
      return {
        key: block.blockID,
        label: block.blockName,
      };
    });

    console.log('blocklar', blocklar);
    this.setState({
      blockData: blocklar,
    });

    console.log('blockData', this.state.blockData);

    // düzenleme için gönderilen veriler
    if (this.props.tip !== 'update') return;
    console.log('propssss', this.props.residentItem);
    console.log('iddddd', this.props.residentItem.userID);

    this.setState({
      blockID: this.props.residentItem.blockID,
      nameSurname: this.props.residentItem.nameSurname,
      phoneNo: this.props.residentItem.phoneNo,
      numberOfPeople: this.props.residentItem.numberOfPeople.toString(),
      email: this.props.residentItem.email,
      password: this.props.residentItem.password,
      hasCar: this.props.residentItem.hasCar,
      isTenant: this.props.residentItem.isTenant,
      isManager: this.props.residentItem.isManager,
    });
  }

  render() {
    var radio_props = [
      {label: '1', value: 0},
      {label: '2', value: 1},
      {label: '3', value: 2},
      {label: '4', value: 3},
      {label: '5', value: 4},
      {label: '6+ ', value: 5},
    ];

    const mode = Appearance.getColorScheme();
    console.log('mode', mode);
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    // blockID: 1
    // email: "ayse@gmail.com"
    // hasCar: true
    // isManager: false
    // isTenant: true
    // nameSurname: "Ayşe DEMİR"
    // numberOfPeople: 2
    // password: "12345"
    // phoneNo: "05555555555"
    return (
      <View style={styles.container}>
        <View style={styles.head}>
          <Text style={styles.title}>
            {this.props.tip == 'update' ? 'Update' : 'Add'} Resident
          </Text>
        </View>
        <ScrollView keyboardShouldPersistTaps="always">
          {/* <Item regular style={{borderRadius: 5, marginTop: 10}}>
            <Input
              placeholder="Block"
              value={this.state.blockID}
              onChangeText={val => this.setState({blockID: val})}
            />
          </Item> */}
          <Item
            regular
            style={{
              borderRadius: 5,
              marginTop: 10,
              color: mode === 'light' ? '#555' : 'white',
            }}>
            <View style={{}}>
              <Text
                style={{
                  justifyContent: 'center',
                  margin: 10,
                  fontSize: 17,
                  color: mode === 'light' ? '#555' : 'white',
                }}>
                Block:
              </Text>
              <RadioForm
                style={{marginBottom: 10}}
                formHorizontal={false}
                animation={true}>
                {this.state.blockData.map((obj, i) => (
                  <RadioButton
                    labelHorizontal={true}
                    key={i}
                    style={{paddingBottom: 5}}>
                    <RadioButtonInput
                      obj={obj}
                      index={i}
                      onPress={async (value, index) => {
                        await this.setState({blockID: index});
                        console.log('value', value);
                        console.log('index', index);
                        console.log('blockID', this.state.blockID);

                        this.setState({value3Index: index});
                      }}
                      isSelected={this.state.blockID === i}
                      borderWidth={1}
                      buttonInnerColor={'#333'}
                      buttonOuterColor={
                        this.state.value3Index === i ? '#333' : '#333'
                      }
                      buttonSize={10}
                      buttonOuterSize={20}
                      buttonStyle={{}}
                      buttonWrapStyle={{marginLeft: 10}}
                    />
                    <RadioButtonLabel
                      obj={obj}
                      onPress={(value, index) => {
                        this.setState({value3: value});
                        this.setState({value3Index: index});
                      }}
                      index={i}
                      labelHorizontal={true}
                      labelStyle={{
                        fontSize: 16,
                        color: mode === 'light' ? '#555' : 'white',
                      }}
                      labelWrapStyle={{}}
                    />
                  </RadioButton>
                ))}
              </RadioForm>
            </View>
          </Item>
          <Item
            regular
            style={{
              borderRadius: 5,
              marginTop: 10,
              color: mode === 'light' ? '#555' : 'white',
            }}>
            <Input
              placeholder="Name Surname..."
              placeholderTextColor={mode === 'light' ? '#555' : 'white'}
              value={this.state.nameSurname}
              onChangeText={val => this.setState({nameSurname: val})}
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
              placeholder="Phone No..."
              placeholderTextColor={mode === 'light' ? '#555' : 'white'}
              value={this.state.phoneNo}
              keyboardType="phone-pad"
              onChangeText={val => this.setState({phoneNo: val})}
            />
          </Item>
          <Item
            regular
            style={{
              borderRadius: 5,
              marginTop: 10,
              color: mode === 'light' ? '#555' : 'white',
            }}>
            <Input
              placeholder="E-mail..."
              placeholderTextColor={mode === 'light' ? '#555' : 'white'}
              keyboardType="email-address"
              value={this.state.email}
              onChangeText={val => this.setState({email: val})}
            />
          </Item>
          <Item
            regular
            style={{
              borderRadius: 5,
              marginTop: 10,
              color: mode === 'light' ? '#555' : 'white',
            }}>
            <Input
              placeholder="Password..."
              placeholderTextColor={mode === 'light' ? '#555' : 'white'}
              secureTextEntry={true}
              value={this.state.password}
              onChangeText={val => this.setState({password: val})}
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
              placeholder="Number of people..."
              placeholderTextColor={mode === 'light' ? '#555' : 'white'}
              keyboardType={'numeric'}
              value={this.state.numberOfPeople}
              onChangeText={val => this.setState({numberOfPeople: val})}
            />
          </Item>
          <Item
            regular
            style={{
              height: 50,
              borderRadius: 5,
              marginTop: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  flex: 0.9,
                  justifyContent: 'center',
                  alignSelf: 'center',
                  marginLeft: 10,
                  fontSize: 17,
                  color: mode === 'light' ? '#555' : 'white',
                }}>
                Has Car?{' '}
              </Text>
              <CheckBox
                style={{flex: 0.1}}
                disabled={false}
                value={this.state.hasCar}
                onValueChange={val => this.setState({hasCar: val})}
                tintColors={{true: 'green', false: '#555'}}
              />
            </View>
          </Item>
          <Item
            regular
            style={{
              height: 50,
              borderRadius: 5,
              marginTop: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  flex: 0.9,
                  justifyContent: 'center',
                  alignSelf: 'center',
                  marginLeft: 10,
                  color: mode === 'light' ? '#555' : 'white',
                  fontSize: 17,
                }}>
                Is Tenant?{' '}
              </Text>
              <CheckBox
                style={{flex: 0.1}}
                disabled={false}
                value={this.state.isTenant}
                onValueChange={val => this.setState({isTenant: val})}
                tintColors={{true: 'green', false: '#555'}}
              />
            </View>
          </Item>
          <Item
            regular
            style={{
              height: 50,
              borderRadius: 5,
              marginTop: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  flex: 0.9,
                  justifyContent: 'center',
                  alignSelf: 'center',
                  marginLeft: 10,
                  fontSize: 17,
                  color: mode === 'light' ? '#555' : 'white',
                }}>
                Is Manager?{' '}
              </Text>
              <CheckBox
                style={{
                  flex: 0.1,
                  // color: 'red',
                  // backgroundColor: 'red',
                  borderColor: 'green',
                }}
                tintColors={{true: 'green', false: '#555'}}
                disabled={false}
                value={this.state.isManager}
                onValueChange={val => this.setState({isManager: val})}
              />
            </View>
          </Item>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginTop: 10,
              marginBottom: 30,
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
              onPress={() => this.addEdit(this.props.residentItem)}
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
