/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {Actions} from 'react-native-router-flux';

import {Fab} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  Text,
  View,
  ScrollView,
  TextInput,
  Button,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Alert,
  Linking,
  StyleSheet,
  SafeAreaView,
  Appearance,
} from 'react-native';
import {firebase} from '@react-native-firebase/messaging';

import AsyncStorage from '@react-native-community/async-storage';

import getStorage from '../functions/loginfunc';

import api from '../define.json';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signup: false,
      editIP: false,
      ip: 'https://tez.atilimyazilim.com',
      //' + this.state.ip + '
      blockID: 1,
      userID: -1,
      nameSurname: '',
      phoneNo: '',
      numberOfPeople: 1,
      email: '',
      password: '',
      isTenant: false,
      hasCar: false,
      isManager: false,
    };
  }

  componentDidMount() {
    // getStorage('ip').then(ip => {
    //   this.setState({ip: ip});
    // });
  }

  async signUp() {
    console.log('Name', this.state.nameSurname);
    console.log('PhoneNumber', this.state.phoneNo);
    console.log('Email', this.state.email);
    console.log('Password', this.state.password);

    if (
      this.state.email &&
      this.state.password &&
      this.state.nameSurname &&
      this.state.phoneNo != ''
    ) {
      try {
        let data = await fetch(api.baseUrl + '/api/User', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
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

        if (data.userID > 0) {
          // alert('Alert');
          // await AsyncStorage.setItem('userID', data.user.id.toString());
          await AsyncStorage.setItem(
            'nameSurname',
            data.nameSurname.toString(),
          );
          await AsyncStorage.setItem('isManager', data.isManager.toString());
          await AsyncStorage.setItem('phoneNo', data.phoneNo.toString());
          await AsyncStorage.setItem('email', data.email.toString());
          await AsyncStorage.setItem('password', data.password.toString());
          await AsyncStorage.setItem(
            'numberOfPeople',
            data.numberOfPeople.toString(),
          );
          await AsyncStorage.setItem('hasCar', data.hasCar.toString());
          await AsyncStorage.setItem('isTenant', data.isTenant.toString());
          await AsyncStorage.setItem('isManager', data.isManager.toString());
          await AsyncStorage.setItem('blockID', data.blockID.toString());
          // await AsyncStorage.setItem('surName', data.user.surname.toString());
          // await AsyncStorage.setItem('password', data.user.password.toString());
          // await AsyncStorage.setItem('eMail', data.user.email.toString());
          // await AsyncStorage.setItem(
          //   'phoneNumber',
          //   data.user.phoneNumber.toString(),
          // );
          setTimeout(() => {
            Actions.drawer({type: 'reset'});
          }, 500);
        }
      } catch {
        Alert.alert('ATTENTION', 'Enter valid info, please.');
      }
    } else {
      Alert.alert('ATTENTION', 'Fill in the blanks, please.');
    }
  }

  async loginButton() {
    console.log('Email', this.state.email);
    console.log('Password', this.state.password);

    // let toka = await firebase.messaging().getToken();

    try {
      let data = await fetch(this.state.ip + '/api/User/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
        }),
      }).then(data => data.json());
      console.log('data', data);
      if (data.userID > 0) {
        // alert('Alert');
        // await AsyncStorage.setItem('userID', data.user.id.toString());
        await AsyncStorage.setItem('nameSurname', data.nameSurname.toString());
        await AsyncStorage.setItem('isManager', data.isManager.toString());
        await AsyncStorage.setItem('phoneNo', data.phoneNo.toString());
        await AsyncStorage.setItem('email', data.email.toString());
        await AsyncStorage.setItem('password', data.password.toString());
        await AsyncStorage.setItem(
          'numberOfPeople',
          data.numberOfPeople.toString(),
        );
        await AsyncStorage.setItem('hasCar', data.hasCar.toString());
        await AsyncStorage.setItem('isTenant', data.isTenant.toString());
        await AsyncStorage.setItem('isManager', data.isManager.toString());
        await AsyncStorage.setItem('blockID', data.blockID.toString());

        setTimeout(() => {
          Actions.drawer({type: 'reset'});
        }, 500);
      } else {
        Alert.alert(
          'ATTENTION',
          'Email or password is wrong! Try again, please.',
        );
      }
    } catch {
      Alert.alert(
        'ATTENTION',
        'Email or password is wrong! Try again, please.',
      );
    }
  }

  render() {
    // const toggle = this.state.switchValue;
    // console.log('toggle', toggle);
    const mode = Appearance.getColorScheme();
    console.log('mode', mode);

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    return (
      <SafeAreaView style={{flex: 1, height: windowHeight}}>
        <ScrollView
          style={{
            backgroundColor: 'white',
            flex: 1,
            height: windowHeight,
          }}>
          <View>
            <ImageBackground
              style={{
                width: '100%',
                height: 200,
                marginTop: 20,
              }}
              source={require('../images/logo2.png')}></ImageBackground>
            <View
              style={{
                width: '100%',
                // height: 90,
                opacity: 0.6,
                paddingBottom: 20,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  // paddingTop: 30,
                  fontWeight: 'bold',
                  fontSize: 30,
                }}>
                Property Manager
              </Text>
            </View>
            {!this.state.editIP ? (
              <View>
                {this.state.signup ? (
                  <View
                    style={{
                      height: 50,
                      marginHorizontal: 30,
                      justifyContent: 'center',
                      borderRadius: 6,
                      borderWidth: 1,
                      borderColor: '#333',
                      marginTop: 10,
                    }}>
                    <TextInput
                      value={this.state.nameSurname}
                      onChangeText={val => this.setState({nameSurname: val})}
                      style={{
                        padding: 10,
                        fontSize: 15,
                        color: mode === 'light' ? 'black' : 'white',
                      }}
                      placeholder="Name Surname..."
                      placeholderTextColor={
                        mode === 'light' ? 'black' : 'white'
                      }
                    />
                  </View>
                ) : null}

                {this.state.signup ? (
                  <View
                    style={{
                      height: 50,
                      marginHorizontal: 30,
                      justifyContent: 'center',
                      borderRadius: 6,
                      borderWidth: 1,
                      borderColor: '#333',
                      marginTop: 10,
                    }}>
                    <TextInput
                      value={this.state.phoneNo}
                      onChangeText={val => this.setState({phoneNo: val})}
                      style={{
                        padding: 10,
                        fontSize: 15,
                        color: mode === 'light' ? 'black' : 'white',
                      }}
                      keyboardType="numeric"
                      placeholder="Phone number..."
                      placeholderTextColor={
                        mode === 'light' ? 'black' : 'white'
                      }
                    />
                  </View>
                ) : null}
                <View
                  style={{
                    height: 50,
                    marginHorizontal: 30,
                    justifyContent: 'center',
                    borderRadius: 6,
                    borderWidth: 1,
                    borderColor: '#333',
                    marginTop: 10,
                  }}>
                  <TextInput
                    value={this.state.email.toString()}
                    onChangeText={val => this.setState({email: val})}
                    style={{
                      padding: 10,
                      fontSize: 15,
                      color: mode === 'light' ? 'black' : 'white',
                    }}
                    placeholder="E-mail..."
                    placeholderTextColor={mode === 'light' ? 'black' : 'white'}
                  />
                </View>
                <View
                  style={{
                    height: 50,
                    marginHorizontal: 30,
                    justifyContent: 'center',
                    borderRadius: 6,
                    borderWidth: 1,
                    borderColor: '#333',
                    marginTop: 10,
                  }}>
                  <TextInput
                    value={this.state.password.toString()}
                    onChangeText={val => this.setState({password: val})}
                    style={{
                      padding: 10,
                      fontSize: 15,
                      color: mode === 'light' ? 'black' : 'white',
                    }}
                    secureTextEntry={true}
                    placeholder="Password..."
                    placeholderTextColor={mode === 'light' ? 'black' : 'white'}
                  />
                </View>

                <View
                  style={{
                    marginTop: 20,
                    marginHorizontal: 30,
                    borderRadius: 6,
                    borderWidth: 1,
                    borderColor: 'gray',
                  }}>
                  {this.state.signup ? (
                    <Button
                      onPress={() => this.signUp()}
                      title="Sign up"
                      color="gray"
                    />
                  ) : (
                    <Button
                      onPress={() => this.loginButton()}
                      title="Login"
                      color="gray"
                    />
                  )}
                </View>
                {/* <View style={{paddingBottom: 50}}>
                  {!this.state.signup ? (
                    <TouchableOpacity
                      style={{
                        marginTop: 20,
                        marginHorizontal: 30,
                      }}
                      onPress={() =>
                        this.setState({signup: true, email: '', password: ''})
                      }>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontStyle: 'italic',
                          opacity: 0.9,
                          fontSize: 15,
                          textDecorationLine: 'underline',
                        }}>
                        or Sign up
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={{
                        marginTop: 20,
                        marginHorizontal: 30,
                      }}
                      onPress={() => this.setState({signup: false})}>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontStyle: 'italic',
                          opacity: 0.9,
                          fontSize: 15,
                          textDecorationLine: 'underline',
                        }}>
                        back to Login
                      </Text>
                    </TouchableOpacity>
                  )}
                </View> */}

                {/* <TouchableOpacity
                  style={{
                    width: 100,
                    alignSelf: 'flex-end',
                  }}
                  onPress={() => this.setState({editIP: true})}>
                  <View style={{paddingBottom: 30, flexDirection: 'row'}}>
                    <View style={{marginRight: 5, justifyContent: 'center'}}>
                      <Icon size={15} name="settings-outline"></Icon>
                    </View>
                    <View>
                      <Text
                        style={{
                          textAlign: 'center',
                          fontStyle: 'italic',
                          opacity: 0.9,
                          fontSize: 15,
                        }}>
                        Edit IP
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity> */}
              </View>
            ) : (
              <View>
                <View
                  style={{
                    height: 40,
                    marginHorizontal: 30,

                    justifyContent: 'center',
                    borderRadius: 6,
                    borderWidth: 1,
                    borderColor: '#333',
                  }}>
                  <TextInput
                    // value={this.state.ip}
                    onChangeText={async val => {
                      await this.setState({ip: val});
                      await AsyncStorage.setItem('ip', val);
                    }}
                    placeholder="IP..."
                    style={{margin: 3, padding: 3}}
                  />
                </View>
                <View
                  style={{
                    marginTop: 20,
                    marginHorizontal: 30,
                    borderRadius: 6,
                    borderWidth: 1,
                    borderColor: 'rgb(255, 129, 38)',
                  }}>
                  <Button
                    onPress={() => this.setState({editIP: false})}
                    title="IP"
                    color="rgb(255, 129, 38)"
                  />
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default Login;
